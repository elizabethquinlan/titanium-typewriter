from django.contrib import admin

# Register your models here.
from .models import DailyWc, Project

admin.site.register(DailyWc)
admin.site.register(Project)