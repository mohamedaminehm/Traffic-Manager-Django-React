from django.urls import path

from .views import  NewAccidentListView, NewAccidentView, AccidentListView , AccidentView , AccidentRegListView , AccidentRegView

urlpatterns = [
    path('api_acc/newaccident',NewAccidentListView.as_view()),
    path('api_acc/newaccident/<pk>',NewAccidentView.as_view()),
    path('api_acc/accident',AccidentListView.as_view()),
    path('api_acc/accident/<pk>',AccidentView.as_view()),
    path('api_acc/accidentreg',AccidentRegListView.as_view()),
    path('api_acc/accidentreg/<governorate>',AccidentRegView.as_view())
]