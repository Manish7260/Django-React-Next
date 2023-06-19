from datetime import timedelta
from django.utils import timezone
from rest_framework import serializers
from .models import CustomUser, VerifyUserToken, PasswordResetToken
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.serializers import ModelSerializer, Serializer, ValidationError
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password


class RegisterSerializer(ModelSerializer):
    email = serializers.EmailField(required=True, validators=[UniqueValidator(queryset=CustomUser.objects.all())])
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True, validators=[validate_password])

    class Meta:
        model = CustomUser
        fields = ('email', 'password', 'password2', 'first_name', 'last_name', 'gender')

    def validate(self, attr):
        if attr['password'] != attr['password2']:
            raise ValidationError({"password": "Password fields didn't match."})
        return attr

    def create(self, validated_data):
        user = CustomUser.objects.create(
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            gender=validated_data['gender'],
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
    otp = serializers.CharField(max_length=200)

    def _is_valid_otp(self, otp):
        try:
            user = PasswordResetToken.objects.get(otp=otp)
            confirmation_expire = user.created_at + timedelta(minutes=1)

            if timezone.now() > confirmation_expire:
                raise ValidationError("Password Reset Confirmation Code has Expired")
            return user
        except ObjectDoesNotExist:
            raise ValidationError("Invalid")

    def validate(self, attrs):
        otp = attrs.get('otp')
        user = self._is_valid_otp(otp=otp)
        attrs['user'] = user
        return attrs


class ForgetPasswordSerializer(Serializer):
    otp = serializers.CharField(max_length=200)
    password = serializers.CharField(max_length=20, write_only=True)
    confirm_password = serializers.CharField(max_length=20, write_only=True)

    def _is_valid_otp(self, otp):
        try:
            user = PasswordResetToken.objects.get(otp=otp)
            confirmation_expire = user.created_at + timedelta(minutes=1)

            if timezone.now() > confirmation_expire:
                raise ValidationError("Password Reset Confirmation Code has Expired")
            return user
        except ObjectDoesNotExist:
            raise ValidationError("Invalid")

    def validate(self, attrs):
        otp = attrs.get('otp')
        user = self._is_valid_otp(otp=otp)
        if attrs['password'] != attrs['confirm_password']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})

        attrs['user'] = user
        return attrs
