from django.shortcuts import render
from .serializers import RegisterSerializer, ChangePasswordSerializer, GenerateTokenSerailizer, VerifyTokenSerializer, \
    ForgetPasswordSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView, UpdateAPIView, GenericAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import authenticate, login, logout
from rest_framework.response import Response
from .models import CustomUser, PasswordResetToken
from rest_framework import status
from django.conf import settings
from django.core.mail import send_mail


# Create your views here.
class RegisterUser(CreateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def User_logout(request):
    logout(request)
    return Response('User Logged out successfully')


class ChangePassword(UpdateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = ChangePasswordSerializer
    model = CustomUser

    def get_object(self, queryset=None):
        return self.request.user

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data, )

        if serializer.is_valid():
            old_password = serializer.data.get("old_password")
            check_password = self.object.check_password(old_password)
            if not check_password:
                return Response(data={"message : Wrong Password"}, status=status.HTTP_400_BAD_REQUEST)
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()

            response = {
                'status': 'success',
                'code': status.HTTP_200_OK,
                'message': 'Password updated successfully',
                'data': []
            }
            return Response(response)
        return Response(serializer.error, status=status.HTTP_400_BAD_REQUEST)


class SendResetPasswordToken(GenericAPIView):
    serializer_class = GenerateTokenSerailizer
    permission_classes = [AllowAny, ]

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data.get('user', None)

        try:
            user.pass_reset_confirmation.delete()
        except Exception as e:
            pass

        if user:
            PasswordResetToken.objects.generated(user=user)
            token_obj = PasswordResetToken.objects.filter(user=user).values("otp")
            token_obj = token_obj[0]
            token = token_obj.get('otp')
            email = user.email
            subject = 'Welcome to logistics'
            message = f"Otp for forget password : {token}"
            email_from = settings.EMAIL_HOST_USER
            mail = [email, ]
            send_mail(subject, message, email_from, mail)
            return Response({"detail": "Password Reset OTP Generated"}, status=status.HTTP_200_OK)


class VerifyToken(CreateAPIView):
    serializer_class = VerifyTokenSerializer
    permission_classes = [AllowAny, ]

    def create(self, request, *args, **kwargs):
        # print(request.data)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        t_user = serializer.validated_data.get('user')
        user = CustomUser.objects.get(email=t_user)

        if user:
            return Response(True, status=status.HTTP_200_OK)
        else:
            return Response(False, status.HTTP_400_BAD_REQUEST)


class ResetPasswordUsingToken(CreateAPIView):
    serializer_class = ForgetPasswordSerializer
    permission_classes = [AllowAny, ]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        t_user = serializer.validated_data.get('user')
        user = CustomUser.objects.get(email=t_user)

        if user:
            password = serializer.validated_data['password']
            user.set_password(password)
            user.save()
            t_user.delete()
        return Response({"detail": "Password reset successfully"}, status=status.HTTP_201_CREATED)
