from rest_framework import viewsets, exceptions
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .serializers import UserSerializer
from .models import User
from .authentication import generate_access_token


class RegisterViewSet(viewsets.ViewSet):
    """
      Endpoint destinado para registrar usuários
    """
    allowed_methods = ['post']
    permission_classes = [AllowAny]

    def create(self, request):
        """
         Action que corresponde ao metodo post.
         Verifica se o payload está completo, se não retorna quais campos estão faltando.
         Faz as validações se já existe algum usurário na base com o email fornecido e verifica
          se as senhas passadas conferem.
        :param request:
        :return: json payload com status
        """
        fields = ['password', 'passwordConfirm', 'name', 'email']

        if len(list(request.data.keys())) != len(fields):
            raise exceptions.ParseError({"message": [{e: "não pode ser nulo"}
                                                       for e in list(
                    set(fields).difference(set(k for k, v in request.data.items())))]})
        if User.objects.filter(email=request.data["email"]).first():
            raise exceptions.ParseError({"message": "um usuário com esse email já existe"})

        if len(request.data['password']) < 8 or len(request.data['passwordConfirm']) < 8:
            raise exceptions.ParseError({"message":"A senha deve conter no minimo 8 caracteres"})

        if request.data['password'] != request.data['passwordConfirm']:
            raise exceptions.ParseError({"message": "As senhas nao conferem"})
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class LoginViewSet(viewsets.ViewSet):
    """
     Endpoint destinado ao login
    """
    allowed_methods = ['post']
    permission_classes = [AllowAny]

    def create(self, request):
        """
          Action que corresponde ao metodo post.
          Valida e retorna o payload com as informações do usuario e token JWT apenas para extracao do tempo da sessão.
          **Na resposta o token JWT é setado no cookie http-only por motivos de seguraca, ao qual foi
          feito uma autenticao customizada que utiliza cookie.
        """

        email = request.data.get('email')
        password = request.data.get('password')
        user = User.objects.filter(email=email).first()
        if user is None:
            raise exceptions.AuthenticationFailed({"message": "usuário nao encontrado"})
        if not user.check_password(password):
            raise exceptions.AuthenticationFailed({"message": "senha não confere"})
        if not user.is_active:
            raise exceptions.AuthenticationFailed({"message": "conta do usuário não ativa contactar administrador"})
        response = Response()
        token = generate_access_token(user)
        response.set_cookie(key='jwt', domain=None, value=token, httponly=True)
        response.data = {
            'jwt': token,
            'user': {"name": user.name, "email": user.email, "role": "USER" if not user.is_staff else "ADMIN"}
        }
        return response


class LogoutViewSet(viewsets.ViewSet):
    """
     Endpoint destinado ao logout
    """
    allowed_methods = ['post']
    permission_classes = [AllowAny]

    def create(self, request):
        """
         Action que corresponde ao metodo post.
         **Visto que o JWT é setado no cookie http-only e não podendo ser manipulado no cliente o
         backend deve retornar a resposta para deletar o cookie.
        :param request:
        :return:
        """
        response = Response()
        response.delete_cookie(key='jwt')
        response.data = {
            'message': 'logout com sucesso'
        }
        return response
