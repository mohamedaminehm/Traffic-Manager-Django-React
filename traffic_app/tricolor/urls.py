
from django.urls import path
from .views import  CarfourListView, CarfourView, TricolorListView , TricolorView

urlpatterns = [
    
    path('api_carf/carfour',CarfourListView.as_view()),
    path('api_carf/carfour/<pk>',CarfourView.as_view()),
    path('api_carf/tricolor',TricolorListView.as_view()),
    path('api_carf/tricolor/<pk>',TricolorView.as_view())
]