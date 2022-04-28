from django.urls import re_path

from .views import RandomNumbersGenerator


urlpatterns = [
    re_path(r'random/?', RandomNumbersGenerator.as_view(), name='random'),
]