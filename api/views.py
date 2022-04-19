from rest_framework import viewsets

from rest_framework.views import APIView
from rest_framework.response import Response

from .serializers import UserSerializer, PostSerializer
from .models import User, Post

from random import randint

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class RandomNumbersGenerator(APIView):
    def get(self, request, format=None):
        resp = { "status": 200, "message": "OK", "data": [randint(0, 1000) for i in range(10)] }
        return Response(resp)