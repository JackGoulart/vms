import jwt
import datetime
from django.conf import settings
from django.contrib.auth import get_user_model
from rest_framework.authentication import BaseAuthentication
from rest_framework import exceptions


def generate_access_token(user):
    """
     Funcão para geração de token JWT utilizando algoritimo HS256
     com validade de 9 horas
    :param user:
    :return: Token
    """
    payload = {
        'user-id': user.id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=8),
        'iat': datetime.datetime.utcnow()
    }
    return jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')


class JWTAuthentication(BaseAuthentication):
    """
     Classe para criacao da autenticacao customizada
    """
    def authenticate(self, request):
        """
         Método tem a funcao de captura o token do cookie que vem na requisicao http
         faz faz o decode do JWT e verifica a integridade do usuario
        :param request:
        :return:
        """
        token = request.COOKIES.get('jwt')
        if not token:
            return None
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms='HS256')
        except jwt.ExpiredSignatureError:
            raise exceptions.AuthenticationFailed({"message":"sua sessão expirou faça o login novamente."})

        user = get_user_model().objects.filter(id=payload['user-id']).first()

        if user is None:
            raise exceptions.AuthenticationFailed({"message":"Usuario não encontrado"})

        return user, None
