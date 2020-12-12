from django.urls import path, include
from rest_framework import routers
from .api import LeadViewSet
from rest_framework import renderers

lead_list = LeadViewSet.as_view({
    'get': 'list',
    'post': 'create'
})
lead_detail = LeadViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})
lead_highlight = LeadViewSet.as_view({
    'get': 'highlight'
}, renderer_classes=[renderers.StaticHTMLRenderer])



router = routers.DefaultRouter()
router.register('api/leads',LeadViewSet , 'leads')

urlpatterns = [
    path('', include(router.urls)),
]
