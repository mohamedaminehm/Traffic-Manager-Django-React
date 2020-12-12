from leads.models import Lead 
from rest_framework import viewsets , permissions
from .serializers import LeadSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import renderers

# lead Viewset
#cette classe permet tous les methode api

class LeadViewSet(viewsets.ModelViewSet):
		queryset = Lead.objects.all()
		permission_classes = [
			#permissions.AllowAny
			permissions.IsAuthenticated,
			
		]

		serializer_class = LeadSerializer
		def get_queryset(self):
			return self.request.user.leads.all() #only the leads of that user
	
		def perform_create(self , serializer):
			serializer.save(owner=self.request.user)

		




'''
	def get_queryset(self):
		return self.request.user.leads.all() #only the leads of that user
	
	def perform_create(self , serializer):
		serializer.save(owner=self.request.user)
'''
'''
@action(detail=True, renderer_classes=[renderers.StaticHTMLRenderer])
		def highlight (self , request , *args , **kwargs):
			lead = self.get_object()
			return Response(lead.highlighted)

		def perform_create(self , serializer):
			serializer.save(owner=self.request.user)
'''

