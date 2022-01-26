"""core URL Configuration
  Inclusão dos url's routers dos app reader, user e drf_yasg para geração de  documentação
  Swagger/OpenAPI 2.0
"""
from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title="VMS",
        default_version="v1",
        description="VMS API",
        contact=openapi.Contact(email="dev@vms.com"),
        license=openapi.License(name="copyleft"),
    ),
    public=False,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('api/admin/', admin.site.urls),
    re_path(
        r"^api/docs/$",
        schema_view.with_ui("swagger", cache_timeout=0),
        name="schema-swagger-ui",
    ),
    path('api/user/', include('user.urls')),
    path('api/reader/', include('reader.urls')),

]
