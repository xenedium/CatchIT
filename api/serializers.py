from rest_framework import serializers
from .models import User, Category, Article
import hashlib

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

class UserSerializer(serializers.ModelSerializer):
    firstname = serializers.CharField(max_length=50, required=True)
    lastname = serializers.CharField(max_length=50, required=True)
    email = serializers.EmailField(max_length=254, required=True)
    phone_number = serializers.CharField(max_length=15, required=True)
    password = serializers.CharField(max_length=64, required=True)
    city = serializers.ChoiceField(choices=city_choices, required=True)

    def create(self, validated_data):
        if User.objects.filter(email=validated_data['email']).exists():
            raise serializers.ValidationError({"status": 400, "message": "User with this email already exists"})
        if User.objects.filter(phone_number=validated_data['phone_number']).exists():
            raise serializers.ValidationError({"status": 400, "message": "User with this phone number already exists"})
        
        try:
            return User.objects.create(
                        firstname=validated_data['firstname'], 
                        lastname=validated_data['lastname'], 
                        email=validated_data['email'], 
                        phone_number=validated_data['phone_number'], 
                        password=hashlib.sha256(validated_data['password'].encode('utf-8')).hexdigest(),
                        city=validated_data['city']
                    )
        except Exception as e:
            raise serializers.ValidationError({"status": 500, "message": "Internal server error"})

    def update(self, instance, validated_data):
        if 'password' in validated_data:
            instance.password = hashlib.sha256(validated_data['password'].encode('utf-8')).hexdigest()
        instance.firstname = validated_data['firstname']
        instance.lastname = validated_data['lastname']
        instance.email = validated_data['email']
        instance.phone_number = validated_data['phone_number']
        instance.city = validated_data['city']
        instance.save()
        return instance

    class Meta:
        model = User
        exclude = ('is_admin', 'is_superuser', 'is_banned', 'created_at')
        write_only_fields = ('password',)


class CategorySerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=50, required=True)
    created_by = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), required=True, write_only=True)

    def create(self, validated_data):
        if Category.objects.filter(name=validated_data['name']).exists():
            raise serializers.ValidationError({"status": 400, "message": "Category with this name already exists"})

        if validated_data['created_by'].is_admin:
            try:
                return Category.objects.create(
                    name=validated_data['name'],
                    created_by=validated_data['created_by']
                )
            except Exception as e:
                raise serializers.ValidationError({"status": 500, "message": "Internal server error"}, code=500)

        raise serializers.ValidationError({"status": 403, "message": "Forbidden"}, code=403)


    class Meta:
        model = Category
        exclude = ('created_at', )


class ArticleSerializer(serializers.ModelSerializer):
    title = serializers.CharField(max_length=50, required=True)
    description = serializers.CharField(max_length=500, required=True)
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all(), required=True)
    seller = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), required=True)
    condition = serializers.ChoiceField(choices=['New', 'Used'], required=True)
    price = serializers.DecimalField(max_digits=10, decimal_places=2, required=True)
    quantity = serializers.IntegerField(required=True)
    is_sold = serializers.BooleanField(default=False, read_only=True)
    city = serializers.ChoiceField(required=True, choices=city_choices)

    def create(self, validated_data):
        try:
            return Article.objects.create(**validated_data)
        except Exception as e:
            raise serializers.ValidationError({"status": 500, "message": "Internal server error"})
    
    class Meta:
        model = Article
        exclude = ('created_at', 'updated_at')