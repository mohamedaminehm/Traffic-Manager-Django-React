from django.urls import path 
from . import stream 
from . import test_api
#from .socket import celery_view
urlpatterns = [
	path('detect/',stream.livef1),
	path('detect2/',stream.livef2),
	
	path('count_list',test_api.TrafficView.as_view()),
	path('last_saved',test_api.LastSavedView.as_view()),
	path('per_30',test_api.MoyPer10ScdView.as_view()),
	#path('celerytask/',celery_view),
]