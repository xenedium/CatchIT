from django.urls import re_path
from django.urls import include, path

from .views import UserViewAPI, UserMeAPI, UserLoginAPI, UserRegisterAPI, UserEditAPI



urlpatterns = [
    path('users/', UserViewAPI.as_view(), name='users'),
    path('auth-register', UserRegisterAPI.as_view(), name='users'),
    path('auth-login', UserLoginAPI.as_view(), name='users'),
    path('users/me', UserMeAPI.as_view(), name='users'),
    path('users/edit', UserEditAPI.as_view(), name='users'),
]