from .models import  Carfour , Tricolor
from rest_framework import serializers







class TricolorSerializer(serializers.ModelSerializer):
    
    class Meta():
        model = Tricolor
        fields = ('id','direction' , 'red_seconds' , 'green_seconds','yellow_seconds' ,'last_update','tricolors' )

        

class CarfourSerializer (serializers.ModelSerializer):
    tricolors = TricolorSerializer(many=True)
    class Meta():
        model = Carfour
        fields = ('id','name','mode','last_update','tricolors')


