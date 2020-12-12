from django.urls import path

from .views import ArticleView


urlpatterns = [
	
	path('posts/',ArticleView.as_view(), name='posts_list'),
	
]