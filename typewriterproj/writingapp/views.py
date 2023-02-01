from django.shortcuts import render
from django.http import HttpResponse

from .models import User, DailyWc


# Create your views here.
def index(request):
    return render(request, 'home.html')