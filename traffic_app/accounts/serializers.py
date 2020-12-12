from rest_framework import serializers
#django already have user model
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

# user Serializer
class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ('id', 'username', 'email')


#Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ('id', 'username', 'email', 'password')
		extra_kwargs = {'password': {'write_only':True}}

	def create(self , validated_data):
		user = User.objects.create_user(validated_data['username'], 
			   validated_data['email'], validated_data['password'])
		return user
#LOgin Serializer
class LoginSerializer(serializers.Serializer):# we dont use ModelSerializer cause just we will check if user can login
	username = serializers.CharField()
	password = serializers.CharField()

	def validate(self , data):
		user = authenticate(**data)
		if user and user.is_active:
			return user
		raise serializers.ValidationError("Incorrect Credentials")

