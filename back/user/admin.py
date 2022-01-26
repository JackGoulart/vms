from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User


class UserAdmin(UserAdmin):
    """
     Registro do model User no admin com pequenas customizacoes
    """
    list_display = ("email",)
    ordering = ("email",)

    fieldsets = (
        (None, {'fields': ('email', 'password', 'name', 'is_staff', 'is_active')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password', 'name', 'is_superuser', 'is_staff', 'is_active')}
         ),
    )

    filter_horizontal = ()


admin.site.register(User, UserAdmin)
