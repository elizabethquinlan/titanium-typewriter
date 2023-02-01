from django.shortcuts import render
from django.http import HttpResponse

from .models import User, DailyWc


# Create your views here.
def index(request):
    # user = User.objects.get(id=user_id)
    user = User.objects.get(username=request.user) # returns user object
    # word_count = DailyWc.objects.get(user=user) # returns related model data
    # retireve the model Wordcount.objects.get(username=request.user)
    # request.user returns string of username
    if user:
        print(user.id)
        # print(word_count)
        return render(request, 'userview.html', {'user':user.id})
        #display login form (What does it return if no user?)
    else: #idsplay user's information
        return render(request, 'home.html')