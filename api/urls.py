from django.db import router
from django.urls import include, path
from rest_framework import routers

from .views import UserViewSet, PostViewSet, RandomNumbersGenerator

router = routers.DefaultRouter()

router.register(r'users', UserViewSet)
router.register(r'posts', PostViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('random/', RandomNumbersGenerator.as_view(), name='random'),
]