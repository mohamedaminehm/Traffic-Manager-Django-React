
# !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! #
#serializers is a way to convert python en API JSON et vice-versa 
#!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! #

from rest_framework import serializers
from .models import Roundabout

class RoundaboutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Roundabout
        fields = "__all__"    # ('title','image') 