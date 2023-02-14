from django.shortcuts import render
from django.http import HttpResponse

from .models import User, DailyWc


# Create your views here.
def index(request):
    return render(request, 'home.html')

def view_wcs(request, user_id):
    user = User.objects.get(id=user_id)
    return render(request, 'stats.html', {'user':user})