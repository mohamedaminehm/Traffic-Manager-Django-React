from django.urls import path, include
from . import views


urlpatterns = [
    path('rounds/', views.RoundaboutView.as_view(), name ='rounds_list')
]

