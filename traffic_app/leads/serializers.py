from rest_framework import serializers
from leads.models import Lead


#lead serializer
class LeadSerializer(serializers.ModelSerializer):
	class Meta:
		model = Lead 
		fields = '__all__'  #(name , email)
