from .models import Traffic , LastSaved , MoyPer40Scd

from rest_framework import generics
from .serializers import TrafficSerializer , LastSavedSerializer,MoyPer10ScdSerializer


class TrafficView (generics.ListAPIView):
    queryset = Traffic.objects.all()
    serializer_class = TrafficSerializer


class LastSavedView(generics.ListAPIView):
    queryset = LastSaved.objects.all()
    serializer_class = LastSavedSerializer


class MoyPer10ScdView(generics.ListAPIView):
    queryset = MoyPer40Scd.objects.all()
    serializer_class = MoyPer10ScdSerializer
    