from writingapp.models import DailyWc
from .serializers import DailyWcSerializer
from django.http import Http404
from rest_framework import status
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view


class WcAPIView(generics.ListAPIView):
    serializer_class = DailyWcSerializer
    def get_queryset(self):
        return DailyWc.objects.filter(user=self.request.user) # django is aware of what user is logged in and so will only retrieve data for that user.


class AddWc(generics.CreateAPIView):
    serializer_class = DailyWcSerializer


class WcView(generics.RetrieveUpdateDestroyAPIView):
    queryset = DailyWc.objects.all()
    serializer_class = DailyWcSerializer

