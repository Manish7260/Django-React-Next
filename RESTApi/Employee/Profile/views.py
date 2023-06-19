from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth import authenticate, login, logout
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import GenericAPIView, CreateAPIView,UpdateAPIView, ListAPIView
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import UserSerializer, RegisterSerializer, ChangePasswordSerializer, GenerateTokenSerailizer, VerifyTokenSerializer, UpdateProfileSerializer
from .models import CustomUser, PasswordResetToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from .permissions import JuniorOnly, SeniorOnly
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from django_filters import FilterSet, DateTimeFilter

# Create your views here.
class RegiterUser(CreateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

class LoginUser(APIView):
    permission_classes = [AllowAny,]

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        user = authenticate(email=email, password=password)

        if user is not None:
            response = {
                "message" : "Login Successfully",
            }
            login(request, user)
            return Response(data=response, status=status.HTTP_200_OK)
        else:
            return Response(data = {"message" : "Invalid User Id or Password"})

    def get(self, request):
        content = {
            "email" : str(request.user),
            "auth" : str(request.auth)
        }

        return Response(data=content, status=status.HTTP_200_OK)

class ChangePassword(UpdateAPIView):
    # permission_classes = (IsAuthenticated,)
    serializer_class = ChangePasswordSerializer
    model = CustomUser
    def get_object(self, queryset = None):
        return self.request.user


    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data, )

        if serializer.is_valid():
            old_password = serializer.data.get("old_password")
            check_password = self.object.check_password(old_password)
            if not check_password:
                return Response(data = {"message : Wrong Password"}, status=status.HTTP_400_BAD_REQUEST)
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()

            response = {
                'status': 'success',
                'code': status.HTTP_200_OK,
                'message': 'Password updated successfully',
                'data': []
            }
            return Response(response)
        return Response(serializer.error, status = status.HTTP_400_BAD_REQUEST)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def User_logout(request):
    request.user.auth_token.delete()
    logout(request)
    return Response('User Logged out successfully')

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
            token_obj = PasswordResetToken.objects.filter(user=user).values("token")
            token_obj = token_obj[0]
            token = token_obj.get('token')
            return Response({"detail": "Password Reset Token Generated"}, status=status.HTTP_200_OK)

class ResetPasswordUsingToken(CreateAPIView):
    serializer_class = VerifyTokenSerializer
    permission_classes = [AllowAny, ]

    def create(self, request, *args, **kwargs):
        # print(request.data)
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
    
class UserProfileUpdateView(UpdateAPIView):
    queryset = CustomUser.objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = UpdateProfileSerializer
    model = CustomUser
    def get_object(self):
        return self.request.user

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial = True)

        if serializer.is_valid():
            serializer.save()
            return Response("message : Profile Updated Successfully")
        else:
            return Response("message : Profile Not updated", status = status.HTTP_400_BAD_REQUEST)

class ShowUser(ListAPIView):
    queryset = CustomUser.objects.all()
    permission_classes = [SeniorOnly]
    serializer_class = UserSerializer
    name = 'user-list'
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]

    filterset_fields = {
        'email' : ['exact'],
        'doj' : ['date__gte', 'date__lte'],
    }

    search_fields = ['email','phone']
    ordering_fields = ['lastname']

class ShowJunior(APIView):
    permission_classes = [JuniorOnly]
    def get(self, request):
        user_objs = CustomUser.objects.filter(is_junior=True)
        serializer = UserSerializer(user_objs, many=True)
        return Response(serializer.data)