from django.contrib import admin
from .models import Accident , AccidentReg , NewAccident

admin.site.register(NewAccident )
admin.site.register(Accident )
admin.site.register(AccidentReg)

# Register your models here.
