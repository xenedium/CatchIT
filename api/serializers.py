from rest_framework import serializers
from .models import User, Category, Article
import hashlib


class UserSerializer(serializers.ModelSerializer):
    firstname = serializers.CharField(max_length=50, required=True)
    lastname = serializers.CharField(max_length=50, required=True)
    email = serializers.EmailField(max_length=254, required=True)
    phone_number = serializers.CharField(max_length=15, required=True)
    password = serializers.CharField(max_length=64, required=True)


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
                        password=hashlib.sha256(validated_data['password'].encode('utf-8')).hexdigest()
                    )
        except Exception as e:
            raise serializers.ValidationError({"status": 500, "message": "Internal server error", "error": str(e)})

    
    def update(self, instance, validated_data):
        if 'password' in validated_data:
            instance.password = hashlib.sha256(validated_data['password'].encode('utf-8')).hexdigest()
        instance.firstname = validated_data['firstname']
        instance.lastname = validated_data['lastname']
        instance.email = validated_data['email']
        instance.phone_number = validated_data['phone_number']
        instance.save()
        return instance

    class Meta:
        model = User
        exclude = ('is_admin', 'is_superuser', 'is_banned', 'created_at')
        write_only_fields = ('password',)


class CategorySerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=50, required=True)
    created_by = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), required=True)

    def create(self, validated_data):
        if Category.objects.filter(name=validated_data['name']).exists():
            raise serializers.ValidationError({"status": 400, "message": "Category with this name already exists"})
        try:
            return Category.objects.create(**validated_data)
        except Exception as e:
            raise serializers.ValidationError({"status": 500, "message": "Internal server error"})
    
    class Meta:
        model = Category
        exclude = ('created_at',)


class ArticleSerializer(serializers.ModelSerializer):
    title = serializers.CharField(max_length=50, required=True)
    description = serializers.CharField(max_length=500, required=True)
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all(), required=True)
    seller = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), required=True)
    condition = serializers.ChoiceField(choices=['New', 'Used'], required=True)
    price = serializers.DecimalField(max_digits=10, decimal_places=2, required=True)
    quantity = serializers.IntegerField(required=True)
    is_sold = serializers.BooleanField(default=False)

    def create(self, validated_data):
        try:
            return Article.objects.create(**validated_data)
        except Exception as e:
            raise serializers.ValidationError({"status": 500, "message": "Internal server error", "error": str(e)})
    
    class Meta:
        model = Article
        exclude = ('created_at', 'updated_at')