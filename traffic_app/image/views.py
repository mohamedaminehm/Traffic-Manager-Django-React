from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser , FormParser
from rest_framework.response import Response
from rest_framework import status

#from django.http import HttpResponse
from .serializers import RoundaboutSerializer
from .models import Roundabout


class RoundaboutView(APIView) :
    #queryset = Roundabout.objects.all()
    #serializer_class = RoundaboutSerializer

    #we dealing with request witch comes in as dataFrame => parser_classe
    parser_classes = ( MultiPartParser , FormParser)
    

    def post(self, request , *args, **kwargs):
        rounds_serializer = RoundaboutSerializer(data=request.data)
        if rounds_serializer.is_valid():
            rounds_serializer.save()
            return Response(rounds_serializer.data , status = status.HTTP_201_CREATED)

        else :
            print('error' , rounds_serializer.errors)
            return Response(rounds_serializer.errors , status = status.HTTP_400_BAD_REQUEST)

    
    def get(self , request , *args , **kwargs):
        roundabouts = Roundabout.objects.all()
        serializer_class = RoundaboutSerializer(roundabouts , many=True)
        return Response(serializer_class.data)
        