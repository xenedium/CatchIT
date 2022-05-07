from django.urls import include, path, re_path

from .views import (
    UserLoginAPI,
    CategoryViewSet,
    ArticleViewSet,
    UserViewSet
)

from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'articles', ArticleViewSet, basename='articles')       # Get articles by category, id, name, city, user_id & create new articles
router.register(r'categories', CategoryViewSet, basename='categories')  # Get all categories or by id & create new category (admin only)
router.register(r'users', UserViewSet, basename='users')                # Get user data & register user



urlpatterns = [
    path('auth-login', UserLoginAPI.as_view(), name='users'),           # Login existing user
    path('', include(router.urls)),
]