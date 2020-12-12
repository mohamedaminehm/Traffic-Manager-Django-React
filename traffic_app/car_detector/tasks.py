
from __future__ import absolute_import, unicode_literals
from celery import shared_task
from time import sleep 
from datetime import timedelta
from datetime import datetime
from .models import Traffic , LastSaved , MoyPer40Scd
from django.db.models import Avg

from celery.task.schedules import crontab
from celery.decorators import periodic_task



@shared_task
def cal_create():
    
        
        sleep(20)
        
        print('debut de la tache de calcule à : {} '.format(datetime.now()))
        
    
        if LastSaved.objects.filter(voie='MedAmine-PC1'):
            obj = LastSaved.objects.filter(voie='MedAmine-PC1')

            debit = obj.count()
            debit = debit / 40
            avg_voiture = obj.aggregate(Avg('nbr_voiture'))
            avg_personne = obj.aggregate(Avg('nbr_personne'))
            moy_voiture = avg_voiture['nbr_voiture__avg']
            moy_personne = avg_personne['nbr_personne__avg']
            
            MoyPer40Scd.objects.create(
                voie = 'MedAmine-PC1',
                moy_voiture = moy_voiture,
                moy_personne = moy_personne,
                debit = debit 
            )
            

        if LastSaved.objects.filter(voie='MedAmine-PC2'):
            obj = LastSaved.objects.filter(voie='MedAmine-PC2')

            debit = obj.count()
            debit = debit / 40
            avg_voiture = obj.aggregate(Avg('nbr_voiture'))
            avg_personne = obj.aggregate(Avg('nbr_personne'))
            moy_voiture = avg_voiture['nbr_voiture__avg']
            moy_personne = avg_personne['nbr_personne__avg']

            MoyPer40Scd.objects.create(
                voie = 'MedAmine-PC2',
                moy_voiture = moy_voiture,
                moy_personne = moy_personne,
                debit = debit
            )
        LastSaved.objects.all().delete()
        
       
#self.retry(countdown=3 ** self.request.retries)

try : 
    while True:
        try :
            sleep(20)
            cal_create()
        except :
            print('un petit pblm')
            continue 
except KeyboardInterrupt :
    print('interrupted')




    
    