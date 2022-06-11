from email.mime import image
from random import choices
from django.db import models

# Create your models here.

city_choices = [
    ('Casablanca', 'Casablanca'),
    ('Rabat', 'Rabat'),
    ('Marrakech', 'Marrakech'),
    ('Fes', 'Fes'),
    ('Tanger', 'Tanger'),
    ('Oujda', 'Oujda'),
    ('Agadir', 'Agadir'),
    ('Tetouan', 'Tetouan'),
    ('Meknes', 'Meknes'),
    ('Safi', 'Safi'),
    ('El Jadida', 'El Jadida'),
    ('Khouribga', 'Khouribga'),
    ('Ouarzazate', 'Ouarzazate'),
    ('Settat', 'Settat'),
    ('Sidi Kacem', 'Sidi Kacem'),
    ('Kenitra', 'Kenitra'),
    ('Taza', 'Taza'),
    ('Tiznit', 'Tiznit'),
    ('Sidi Ifni', 'Sidi Ifni')
]

# Since we are using our own custom authentication, we don't need to inherit from Django's User model
# The custom jwt middleware ( https://github.com/xenedium/CatchIT/blob/master/api/JwtMiddleware.py ) 
# will add the user to the request object if a token is provided in the request's headers

class User(models.Model):
    firstname = models.CharField(max_length=50, null=False, editable=True)
    lastname = models.CharField(max_length=50, null=False, editable=True)
    email = models.EmailField(max_length=254, null=False, unique=True, editable=False)
    phone_number = models.CharField(max_length=15, null=False, unique=True, editable=False)
    city = models.CharField(max_length=50, null=False, editable=True, choices=city_choices)
    password = models.CharField(max_length=64, null=False, editable=True)
    created_at = models.DateTimeField(auto_now_add=True, null=False, editable=False)
    is_admin = models.BooleanField(default=False, null=False)
    is_superuser = models.BooleanField(default=False, null=False)
    is_banned = models.BooleanField(default=False, null=False)
    image = models.ImageField(upload_to='users', null=True, editable=True)

    def __str__(self):
        return self.firstname


class Category(models.Model):
    name = models.CharField(max_length=50, unique=True, editable=False)
    image = models.ImageField(upload_to='categories/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=False, editable=False)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, null=False, editable=False)

    def __str__(self):
        return self.name


class Article(models.Model):
    title = models.CharField(max_length=50, null=False, editable=True)
    image = models.ImageField(upload_to='articles/', null=True, editable=True)
    description = models.TextField(null=False, editable=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=False, editable=False)
    seller = models.ForeignKey(User, on_delete=models.CASCADE, null=False, editable=False)
    condition = models.CharField(choices=(('New', 'New'), ('Used', 'Used')), default='New', max_length=10, null=False, editable=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, null=False, editable=True)
    created_at = models.DateTimeField(auto_now_add=True, null=False, editable=False)
    updated_at = models.DateTimeField(auto_now=True, null=False, editable=True)
    quantity = models.IntegerField(default=1, null=False, editable=True)
    is_sold = models.BooleanField(default=False, null=False, editable=True)
    city = models.CharField(max_length=50, null=False, editable=True, choices=city_choices)

    def __str__(self):
        return self.title
