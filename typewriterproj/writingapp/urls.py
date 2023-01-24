from django.urls import path
from django.contrib import admin

from . import views
from .views import index

app_name = 'writingapp'
urlpatterns = [
    # path('', views.index, name='index'),
    path('', index),
]