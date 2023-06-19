from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth import get_user_model

User = get_user_model()


class CustomJWTAuthentication(JSONWebTokenAuthentication):
    def get_validated_token(self, raw_token):
        try:
            token = super().get_validated_token(raw_token)
        except AuthenticationFailed as e:
            # re-raise AuthenticationFailed if it's not related to token validation
            if not e.detail.startswith('Token'):
                raise e

            # check if the user's account is verified
            user_id = self.get_user_id(token)
            user = User.objects.get(id=user_id)
            if not user.is_verified:
                raise AuthenticationFailed('Account not verified')

            # If the user's account is verified, return the token
            return token
