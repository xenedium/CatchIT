from random import choices
from django.db import models

# Create your models here.

class User(models.Model):
    firstname = models.CharField(max_length=50, null=False, editable=True)
    lastname = models.CharField(max_length=50, null=False, editable=True)
    email = models.EmailField(max_length=254, null=False, unique=True, editable=False)
    phone_number = models.CharField(max_length=15, null=False, unique=True, editable=False)
    city = models.CharField(max_length=50, null=True, editable=True)
    password = models.CharField(max_length=64, null=False, editable=True)
    created_at = models.DateTimeField(auto_now_add=True, null=False, editable=False)
    is_admin = models.BooleanField(default=False, null=False)
    is_superuser = models.BooleanField(default=False, null=False)
    is_banned = models.BooleanField(default=False, null=False)

    def __str__(self):
        return self.firstname


class Category(models.Model):
    name = models.CharField(max_length=50, unique=True, editable=False)
    created_at = models.DateTimeField(auto_now_add=True, null=False, editable=False)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, null=False, editable=False)

    def __str__(self):
        return self.name


class Article(models.Model):
    title = models.CharField(max_length=50, null=False, editable=True)
    description = models.TextField(null=False, editable=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=False, editable=False)
    seller = models.ForeignKey(User, on_delete=models.CASCADE, null=False, editable=False)
    condition = models.CharField(choices=(('New', 'New'), ('Used', 'Used')), default='New', max_length=10, null=False, editable=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, null=False, editable=True)
    created_at = models.DateTimeField(auto_now_add=True, null=False, editable=False)
    updated_at = models.DateTimeField(auto_now=True, null=False, editable=True)
    quantity = models.IntegerField(default=1, null=False, editable=True)
    is_sold = models.BooleanField(default=False, null=False, editable=True)
    city = models.CharField(max_length=50, null=True, editable=True)

    def __str__(self):
        return self.title
