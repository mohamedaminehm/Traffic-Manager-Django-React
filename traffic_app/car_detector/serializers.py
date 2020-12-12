from .models import Traffic , LastSaved , MoyPer40Scd
from rest_framework import serializers

class TrafficSerializer(serializers.ModelSerializer):
    class Meta:
            model = Traffic 
            fields = '__all__'  #(name , email)

class LastSavedSerializer(serializers.ModelSerializer):
    class Meta:
            model = LastSaved 
            fields = '__all__'  #(name , email)

class MoyPer10ScdSerializer(serializers.ModelSerializer):
    class Meta:
            model = MoyPer40Scd 
            fields = '__all__'  #(name , email)