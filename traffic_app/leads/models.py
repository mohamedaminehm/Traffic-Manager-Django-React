from django.db import models
from django.contrib.auth.models import User

def upload_path(instance , filename):
    return '/'.join(['demandes',str(instance.name), filename])

class Lead (models.Model):
	name = models.CharField(max_length=100)
	cin = models.IntegerField()
	objet = models.CharField(max_length=500 , blank=True)
	fil = models.FileField(null=True , blank=True , upload_to = upload_path)
	owner = models.ForeignKey(User , related_name="leads" , on_delete=models.CASCADE, null=True)
	created_at = models.DateTimeField(auto_now_add=True)

	def __str__(self):
        	return self.name
	
	class Meta:
			verbose_name = 'Demande'
			verbose_name_plural = 'Demandes'
	
