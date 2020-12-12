from django.db import models

# Create your models here.
def upload_path(instance , filename):
    return '/'.join(['images',str(instance.title), filename])


class Article(models.Model):
	title = models.CharField(max_length=120)
	content= models.TextField()
	image = models.ImageField(blank=True, null=True , upload_to=upload_path) 
	last_update = models.DateTimeField(auto_now=True)

	def __str__(self):
		return self.title

	class Meta():
		verbose_name = 'Publication'
		verbose_name_plural = 'Publications'

