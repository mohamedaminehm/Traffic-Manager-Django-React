

from __future__ import unicode_literals
from django.shortcuts import render
from .models import Accident , AccidentReg , NewAccident
from .serializers import AccidentSerializer , AccidentRegSerializer , NewAccidentSerializer

from django_filters.rest_framework import DjangoFilterBackend

from rest_framework import generics
from rest_framework.filters import OrderingFilter
from rest_framework.response import Response

from django.views import View

class NewAccidentListView(generics.ListCreateAPIView):

    queryset = NewAccident.objects.all()
    serializer_class= NewAccidentSerializer

class NewAccidentView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = NewAccidentSerializer
    queryset = NewAccident.objects.all()


class AccidentListView(generics.ListCreateAPIView):

    queryset = Accident.objects.all()
    serializer_class= AccidentSerializer

class AccidentView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = AccidentSerializer
    queryset = Accident.objects.all()
    

class AccidentRegListView(generics.ListCreateAPIView):
    queryset = AccidentReg.objects.all()
    serializer_class = AccidentRegSerializer

class AccidentRegView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = AccidentRegSerializer
    queryset= AccidentReg.objects.all()
    lookup_field = 'governorate'




