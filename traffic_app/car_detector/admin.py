from django.contrib import admin

# Register your models here.
from .models import Traffic , LastSaved ,MoyPer40Scd
admin.site.register(Traffic)
admin.site.register(LastSaved)
admin.site.register(MoyPer40Scd)
