from django.db import models

def upload_path(instance , filename):
    return '/'.join(['images',str(instance.title), filename])

class Roundabout(models.Model):
    title = models.CharField(max_length=100 , blank=False)
    content = models.TextField(blank=True)
    image = models.ImageField(blank=True, null=True , upload_to=upload_path)

    def __str__(self):
        return self.title

