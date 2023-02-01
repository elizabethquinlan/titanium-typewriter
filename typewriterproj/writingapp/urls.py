from django.urls import path
from django.contrib import admin

from . import views

app_name = 'writingapp'
urlpatterns = [
    path('', views.index, name='index'),
    # path('<int:user_id>/', views.index, name='user_posts'),
]