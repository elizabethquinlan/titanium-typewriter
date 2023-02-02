from writingapp.models import DailyWc
from .serializers import DailyWcSerializer
from django.http import Http404
from rest_framework import status
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view


# path('', WcAPIView.as_view()),
class WcAPIView(generics.ListAPIView):
    serializer_class = DailyWcSerializer
    def get_queryset(self):
        print(f"THIS IS HAPPENIGN {self.request.user}") # Just the user's name
        return DailyWc.objects.filter(user=self.request.user) # django is aware of what user is logged in and so will only retrieve data for that user.


# path('new/', AddWc.as_view()),
class AddWc(generics.CreateAPIView):
    serializer_class = DailyWcSerializer


# path('<int:pk>/', WcView.as_view()),
class WcView(generics.RetrieveUpdateDestroyAPIView):
    queryset = DailyWc.objects.all()
    serializer_class = DailyWcSerializer

