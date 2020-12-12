from rest_framework import views , parsers , response , status

from articles.models import Article
from .serializers import ArticleSerializer



class ArticleView(views.APIView):
	parser_classes = (parsers.MultiPartParser , parsers.FormParser)

	def get(self , request , *args , **kwargs):

		posts = Article.objects.all()
		serializer = ArticleSerializer(posts , many=True)
		return response.Response(serializer.data)

	def post(self , request , *args , **kwargs):
		posts_serializer = ArticleSerializer(data=request.data)

		if posts_serializer.is_valid():
			posts_serializer.save()
			return response.Response(posts_serializer.data , status=status.HTTP_201_CREATED)
		else : 
			print('error' , posts_serializer.errors)
			return response.Response(posts_serializer.errors , status=status.HTTP_400_BAD_REQUEST)

