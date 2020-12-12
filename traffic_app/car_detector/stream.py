
from datetime import datetime
import numpy as np
import imagezmq
import cv2
import os
from imutils import build_montages
import imutils
from django.http import StreamingHttpResponse , HttpResponseServerError
from django.views.decorators import gzip
from django.http import JsonResponse

from .models import Traffic




prototxt= "{base_path}\model\MobileNetSSD_deploy.prototxt".format(base_path=os.path.abspath(os.path.dirname(__file__)))

model = "{base_path}\model\MobileNetSSD_deploy.caffemodel".format(base_path=os.path.abspath(os.path.dirname(__file__))) 

conf = 0.2 

montageW =200
montageH = 200 


imageHub = imagezmq.ImageHub()
CLASSES = ["background", "aeroplane", "bicycle", "bird", "boat",
	"bottle", "bus", "car", "cat", "chair", "cow", "diningtable",
	"dog", "horse", "motorbike", "person", "pottedplant", "sheep",
	"sofa", "train", "tvmonitor"]

print("[INFO] loading model...")
net = cv2.dnn.readNetFromCaffe(prototxt, model)

CONSIDER = set(["bus", "person", "car"])
objCount = {obj: 0 for obj in CONSIDER}
frameDict = {}

lastActive = {}
lastActiveCheck = datetime.now()

ESTIMATED_NUM_PIS = 4
ACTIVE_CHECK_PERIOD = 10
ACTIVE_CHECK_SECONDS = ESTIMATED_NUM_PIS * ACTIVE_CHECK_PERIOD

print("[INFO] detecting: {}...".format(", ".join(obj for obj in
        CONSIDER)))

def processing():
    try :
        (rpiName, frame) = imageHub.recv_image()
       
        imageHub.send_reply(b'OK')
        if rpiName not in lastActive.keys():
                print("[INFO] receiving data from {}...".format(rpiName))
        lastActive[rpiName] = datetime.now()
        print(rpiName)
        frame = imutils.resize(frame, width=400)
        (h, w) = frame.shape[:2]
        blob = cv2.dnn.blobFromImage(cv2.resize(frame, (300, 300)),
                0.007843, (300, 300), 127.5)
        net.setInput(blob)
        detections = net.forward()
        objCount = {obj: 0 for obj in CONSIDER}
            
        for i in np.arange(0, detections.shape[2]):
                # extract the confidence (i.e., probability) associated with
                # the prediction
                confidence = detections[0, 0, i, 2]
                # filter out weak detections by ensuring the confidence is
                # greater than the minimum confidence
                if confidence > conf:
                    # extract the index of the class label from the
                    # detections
                    idx = int(detections[0, 0, i, 1])
                    # check to see if the predicted class is in the set of
                    # classes that need to be considered
                    if CLASSES[idx] in CONSIDER:
                        # increment the count of the particular object
                        # detected in the frame
                        objCount[CLASSES[idx]] += 1
                        # compute the (x, y)-coordinates of the bounding box
                        # for the object
                        box = detections[0, 0, i, 3:7] * np.array([w, h, w, h])
                        (startX, startY, endX, endY) = box.astype("int")
                        # draw the bounding box around the detected object on
                        # the frame
                        cv2.rectangle(frame, (startX, startY), (endX, endY),
                            (255, 0, 0), 2)

        if  (objCount['car'] < 10 and objCount['person'] < 10 ):
                cv2.putText(frame, rpiName, (10, 25),
                cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 2)
                    # draw the object count on the frame
                label = ", ".join("{}: {}".format(obj, count) for (obj, count) in objCount.items())
                cv2.putText(frame, label, (10, h - 20),
                cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255,0), 2) 
                if not Traffic.objects.filter(voie=rpiName):
                    Traffic.objects.create( voie= rpiName , nbr_voiture=objCount['car'] , nbr_personne=objCount['person'])
                else :
                        data ={'voie': rpiName , 'nbr_voiture' : objCount['car'] , 'nbr_personne' : objCount['person']}
                        obju = Traffic.objects.get(voie=rpiName)
                        obju.nbr_voiture = objCount['car']
                        obju.nbr_personne = objCount['person']
                        obju.save(update_fields = ['nbr_voiture', 'nbr_personne'])
                        print('updated')
            # draw the sending device name on the frame
        
            # update the new frame in the frame dictionary
        frameDict[rpiName] = frame
        print(rpiName)
            # build a montage using images in the frame dictionary
            #montages = build_montages(frameDict.values(), (w, h), (mW, mH))
        #if   frameDict["MedAmine-PC1"] and frameDict["MedAmine-PC2"]:
         #   img_concat = np.concatinate(( frameDict["MedAmine-PC1"], frameDict["MedAmine-PC2"]),axis=0)
        #    ret , jpeg = cv2.imencode('.jpg',img_concat)
        #else :
        ret , jpeg = cv2.imencode('.jpg', frameDict[rpiName])
            
        return (rpiName , jpeg.tostring())
    except Exception as e:
        print(e)


def gen1():
        
    while True :
        print("preparing") 
        try :       
            (rpiName , frame) = processing()
        except :
            continue
        
        if rpiName == "MedAmine-PC1":
                print("sending ...")
                yield(b'--frame\r\n'
                        b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
        else :
                continue
       

def gen2():
        
    while True :
        print("preparing")  
        try :       
            rpiName , frame = processing()
        except:
            continue
        if rpiName == "MedAmine-PC2":
                print("sending ...")
                yield(b'--frame\r\n'
                        b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
        else :
                continue
        

@gzip.gzip_page
def livef1(request):
    data = {"success": False}
    data["error"] = "No URL provided."
    try:
        
        return StreamingHttpResponse(gen1(), content_type="multipart/x-mixed-replace;boundary=frame")
    except HttpResponseServerError:  # This is bad! replace it with proper handling
        return (JsonResponse(data))

@gzip.gzip_page
def livef2(request):
    data = {"success": False}
    data["error"] = "No URL provided."
    try:
        
        return StreamingHttpResponse(gen2(), content_type="multipart/x-mixed-replace;boundary=frame")
    except HttpResponseServerError:  # This is bad! replace it with proper handling
        return (JsonResponse(data))

