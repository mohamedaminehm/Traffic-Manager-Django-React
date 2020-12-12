from django.db import models
from django.dispatch import receiver , Signal



new_moy = Signal(providing_args="data")

class Traffic (models.Model):

    voie = models.CharField(max_length=20)
    nbr_voiture = models.IntegerField(default=0)
    nbr_personne = models.IntegerField(default=0)

    def __str__(self):
        return self.voie

    def save(self , *args , **kwargs):
        super(Traffic , self).save(*args, **kwargs)
        
        #UserProfile.objects.get_or_create(user_id=u.id)
        new_moy.send(sender= self , data={'voie' : self.voie,
                                                'nbr_voiture': self.nbr_voiture ,
                                                'nbr_personne': self.nbr_personne})


class LastSaved(models.Model):
    voie = models.CharField(max_length=20)
    nbr_voiture = models.IntegerField(default=0)
    nbr_personne = models.IntegerField(default=0)





class MoyPer40Scd(models.Model):
    voie = models.CharField(max_length=20)
    moy_voiture = models.FloatField()
    moy_personne = models.FloatField()
    debit = models.FloatField()
    last_update= models.DateTimeField(auto_now=True)





'''class MoyPerMnt(models.Model):
    last_update = models.DateTimeField(auto_now=True)
    moy_voiture = models.FloatField()
    moy_personne = models.FloatField()


class MoyPerHr (models.Model):
    last_update = models.DateTimeField(auto_now=True)
    moy_voiture = models.FloatField()
    moy_personne = models.FloatField()'''




@receiver(new_moy , sender=Traffic )
def saved_last(sender , **kwargs):
    data=kwargs['data']
    LastSaved.objects.create(voie=data['voie'] , nbr_voiture=data['nbr_voiture'] , nbr_personne= data['nbr_personne'])










new_moy.connect(saved_last)


    

