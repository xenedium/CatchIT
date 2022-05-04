from rest_framework.views import APIView
from rest_framework.response import Response

from rest_framework import viewsets
from .serializers import UserSerializer, CategorySerializer, ArticleSerializer
from .models import User, Category, Article
from jwt import encode
from config.settings import SECRET_KEY

import hashlib, datetime


class UserViewAPI(APIView):                 # Get public user info
    def get(self, request):
        if request.GET.get('id'):
            try:
                user = User.objects.get(id=request.GET.get('id')[0])
            except:
                return Response({"status": 404, "message": "User not found"}, status=404)
            serializer = UserSerializer(user, many=False)
            return Response({
                "id": serializer.data['id'],
                "firstname": serializer.data['firstname'],
                "email": serializer.data['email'],
                "phone_number": serializer.data['phone_number'],
            })
        else:
            return Response({"status": 400, "message": "Bad request"}, status=400)


class UserMeAPI(APIView):                   # Get current and private user info
    def get(self, request):
        if request.jwt_user:
            users = User.objects.get(id=request.jwt_user['id'])
            serializer = UserSerializer(users, many=False)
            return Response({
                "id": serializer.data['id'],
                "firstname": serializer.data['firstname'],
                "lastname": serializer.data['lastname'],
                "email": serializer.data['email'],
                "phone_number": serializer.data['phone_number'],
            })
        else:
            return Response({"status": 401, "message": "Unauthorized"}, status=401)


class UserLoginAPI(APIView):                # Login user
    def post(self, request):
        email, password = request.data['email'], request.data['password']
        if User.objects.filter(email=email).exists():
            user = User.objects.get(email=email)
            if user.password == hashlib.sha256(password.encode('utf-8')).hexdigest():
                return Response({"status": 200, "message": "Successfully logged in", 
                    "token": encode(
                        {
                            "id": user.id,
                            "firstname": user.firstname,
                            "lastname": user.lastname,
                            "email": user.email,
                            "phone_number": user.phone_number,
                            "exp": datetime.datetime.now() + datetime.timedelta(seconds=3600)
                        }
                        , SECRET_KEY, algorithm='HS256')}, status=200)
            else:
                return Response({"status": 401, "message": "Invalid email or password"}, status=401)
        else:
            return Response({"status": 401, "message": "Invalid email or password"}, status=401)


class UserRegisterAPI(APIView):             # Register user
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": 200, "message": "User registered successfully"}, status=200)
        else:
            return Response({"status": 400, "message": "Bad request"}, status=400)


class UserEditAPI(APIView):                 # Edit user info
    def put(self, request):
        if request.jwt_user:
            user = User.objects.get(id=request.jwt_user['id'])
            serializer = UserSerializer(user, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({"status": 200, "message": "User updated successfully"}, status=200)
            else:
                return Response({"status": 400, "message": "Bad request"}, status=400)
        else:
            return Response({"status": 401, "message": "Unauthorized"}, status=401)


class CategoryViewAPI(APIView):
    def get(self, request):
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        if request.jwt_user is None:                                              # Not signed in
            return Response({"status": 401, "message": "Unauthorized"}, status=401)

        serializer = CategorySerializer(data={'name': request.data['name'], 'created_by': request.jwt_user['id']})
        if serializer.is_valid():
            serializer.save()
            return Response({"status": 200, "message": "Category created successfully"}, status=200)
        else:
            return Response({"status": 400, "message": "Bad request"}, status=400)

class ArticleViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer

    def get_queryset(self):
        if self.request.GET.get('category_id'):
            return Article.objects.filter(category_id=self.request.GET.get('category_id'))
        else:
            return Article.objects.all()

    