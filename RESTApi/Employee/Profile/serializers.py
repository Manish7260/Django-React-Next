from datetime import timedelta
from django.utils import timezone
from rest_framework import status, serializers
from .models import CustomUser, PasswordResetToken
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.serializers import ModelSerializer, Serializer, ValidationError
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password

# Serializer for Register a user
class UserSerializer(ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('email','firstname','lastname','doj','salary','phone','address','is_senior','is_junior')

class RegisterSerializer(ModelSerializer):
    email = serializers.EmailField(required=True, validators=[UniqueValidator(queryset=CustomUser.objects.all())])
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True, validators=[validate_password])

    class Meta:
        model = CustomUser
        fields = ('email','password','password2','firstname','lastname','doj','salary','is_senior','is_junior','phone','address')

    # validate password and confirm password are match or not
    def validate(self, attr):
        if attr['password']!=attr['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attr

    # create user from validated data with serializer
    def create(self, validated_data):
        user = CustomUser.objects.create(
            email = validated_data['email'],
            firstname = validated_data['firstname'],
            lastname = validated_data['lastname'],
            doj = validated_data['doj'],
            salary = validated_data['salary'],
            is_senior = validated_data['is_senior'],
            is_junior = validated_data['is_junior'],
            phone = validated_data['phone'],
            address = validated_data['address']
        )

        user.set_password(validated_data['password'])
        user.save()

        return user

# Change password serializer
class ChangePasswordSerializer(Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)
    model = CustomUser

class GenerateTokenSerailizer(Serializer):
    email = serializers.EmailField()
    
    def get_user(self, email):
        try:
            user = CustomUser.objects.get(email=email)
            return user
        except ObjectDoesNotExist:
            raise ValidationError("User Not found")

    def validate(self, attrs):
        email = attrs.get('email')
        user = self.get_user(email)
        attrs["user"] = user
        return attrs

class VerifyTokenSerializer(Serializer):
    token = serializers.CharField(max_length=200)
    password = serializers.CharField(max_length=20, write_only=True)
    confirm_password = serializers.CharField(max_length=20, write_only=True)

    def _is_valid_token(self, token):
        try:
            user = PasswordResetToken.objects.get(token = token)
            confirmation_expire = user.created_at + timedelta(minutes=1)

            if timezone.now() > confirmation_expire:
                raise ValidationError("Password Reset Confirmation Code has Expired")
            return user
        except ObjectDoesNotExist:
            raise ValidationError("Invalid")

    def validate(self, attrs):
        token = attrs.get('token')
        user = self._is_valid_token(token=token)
        if attrs['password']!=attrs['confirm_password']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})

        attrs['user'] = user
        return attrs

class UpdateProfileSerializer(ModelSerializer):

    class Meta:
        model = CustomUser
        fields = ('email', 'firstname', 'lastname', 'doj', 'phone','is_senior','is_junior','address','salary')

        """
        comments here 
        class update profile serailizer model serialiser 
        class meta 
        model custom user 
        fields = email , firstname, lastname, doj, phnone , is_senior, is_junior, address, salary
        
        """