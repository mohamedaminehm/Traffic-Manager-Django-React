from django.db import models

from django.dispatch import receiver , Signal

cal_sec = Signal(providing_args="data")



class Carfour (models.Model):
    name = models.CharField(max_length=20)
    mode = models.SmallIntegerField(default=2)
    last_update = models.DateTimeField(auto_now=True)
    

    def __str__(self):
        return self.name


class Tricolor(models.Model):
    direction = models.CharField(max_length=50)
    red_seconds = models.SmallIntegerField(default=40)
    green_seconds = models.SmallIntegerField(default=40)
    yellow_seconds = models.SmallIntegerField(default=5)
    last_update = models.DateTimeField(auto_now=True)
    tricolors = models.ForeignKey(Carfour , related_name='tricolors', on_delete = models.CASCADE)
    def __str__(self):
        return self.direction

