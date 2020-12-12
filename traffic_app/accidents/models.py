from django.db import models
import datetime
from django.utils import timezone 



from django.dispatch import receiver , Signal


year = datetime.date.today().year



new_accident = Signal(providing_args="data")

class NewAccident(models.Model):
    governorate = models.CharField(max_length=25)
    n_dead = models.FloatField()
    n_injured = models.FloatField()
    
    def __str__(self):
        return 'new accident in ' + self.governorate
    
    def save(self , *args , **kwargs):
        super(NewAccident, self).save(*args, **kwargs)
        #UserProfile.objects.get_or_create(user_id=u.id)
        new_accident.send(sender= self , data={'n_dead' : self.n_dead,
                                                'n_injured': self.n_injured ,
                                                'governorate': self.governorate})


class Accident (models.Model):
    year = models.IntegerField(default=0)
    t_accidents = models.FloatField()
    t_deaths = models.FloatField()
    t_injured = models.FloatField()
    last_update= models.DateTimeField(auto_now=True)
    

    def __str__(self):
        return str(self.year)


class AccidentReg (models.Model):
    governorate = models.CharField(max_length=20)
    accidents = models.FloatField()
    dead = models.FloatField()
    injured = models.FloatField()
    latitude = models.FloatField()
    longitude = models.FloatField() 
    last_update= models.DateTimeField(auto_now=True)
    acc = models.ForeignKey(Accident , related_name='details', on_delete = models.CASCADE)

    def __str__(self):
        return self.governorate + '|' + str(self.acc.year)





@receiver(new_accident , sender = NewAccident)
def update_values(sender , **kwargs):
        t_ndeaths = 0
        t_ninjured = 0
        t_naccidents = 0
        data=kwargs['data']
        
        t_ndeaths += data['n_dead']
        t_ninjured += data['n_injured']
        obj = Accident.objects.filter(year=year)
        old_acc = obj[0].t_accidents
        t_naccidents = old_acc + 1
        t_ndeaths += obj[0].t_deaths
        t_ninjured += obj[0].t_injured

        data1 = {'year' : datetime.date.today().year ,
            't_accidents' :t_naccidents,
            't_deaths': t_ndeaths,
            't_injured' : t_ninjured }
          
        obj.update(**data1)

@receiver(new_accident , sender = NewAccident)
def update_reg(sender , **kwargs):
        t_ndeaths = 0
        t_ninjured = 0
        t_naccidents = 0
        data=kwargs['data']

        governorate = data['governorate']
        t_ndeaths += data['n_dead']
        t_ninjured += data['n_injured']
        if AccidentReg.objects.filter(governorate=governorate):
            obj = AccidentReg.objects.filter(governorate=governorate)
            old_acc = obj[0].accidents
            t_naccidents = old_acc + 1
            t_ndeaths += obj[0].dead
            t_ninjured += obj[0].injured
            
            obj.update(accidents=t_naccidents , dead = t_ndeaths, injured= t_ninjured )



new_accident.connect(update_values)
new_accident.connect(update_reg)




'''
*** copier une instance ***
obj = Foo.objects.get(pk=<some_existing_pk>)
obj.pk = None
obj.save()
'''







    











