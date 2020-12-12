from accidents.models import Accident , AccidentReg , NewAccident
from rest_framework import serializers
import datetime

year = datetime.date.today().year

class NewAccidentSerializer(serializers.ModelSerializer):
    class Meta : 
        model=NewAccident
        fields = ('id' , 'governorate' , 'n_dead' , 'n_injured' )


class AccidentRegSerializer(serializers.ModelSerializer):
    
    class Meta():
        model = AccidentReg
        fields = ('id','governorate' , 'accidents' , 'dead','injured' ,'latitude', 'longitude','last_update','acc' )

        

class AccidentSerializer (serializers.ModelSerializer):
    details = AccidentRegSerializer(many=True)
    class Meta():
        model = Accident
        fields = ('id','year','t_accidents','t_deaths','t_injured', 'last_update' ,'details')

   
    





    



       




