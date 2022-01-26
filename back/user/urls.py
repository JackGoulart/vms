"""
  Urls referente ao app user
"""
from django.urls import path, include
from user.views import RegisterViewSet, LoginViewSet, LogoutViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'register', RegisterViewSet, basename='register')
router.register(r'login', LoginViewSet, basename='login')
router.register(r'logout', LogoutViewSet, basename='logout')

urlpatterns = router.urls

urlpatterns = [
    path("", include(urlpatterns)),
]