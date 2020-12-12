

from .models import Carfour , Tricolor 
from .serializers import TricolorSerializer , CarfourSerializer 

from rest_framework import generics



class CarfourListView(generics.ListCreateAPIView):

    queryset = Carfour.objects.all()
    serializer_class= CarfourSerializer

class CarfourView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CarfourSerializer
    queryset = Carfour.objects.all()
    

class TricolorListView(generics.ListCreateAPIView):
    queryset = Tricolor.objects.all()
    serializer_class = TricolorSerializer

class TricolorView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TricolorSerializer
    queryset= Tricolor.objects.all()
    
