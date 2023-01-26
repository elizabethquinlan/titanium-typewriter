from rest_framework import generics
from writingapp.models import DailyWc
from .serializers import DailyWcSerializer

# Create your views here.
class WcAPIView(generics.ListAPIView):
    queryset = DailyWc.objects.all()
    serializer_class = DailyWcSerializer


class AddWc(generics.CreateAPIView):
    serializer_class = DailyWcSerializer


class WcView(generics.RetrieveUpdateDestroyAPIView):
    queryset = DailyWc.objects.all()
    serializer_class = DailyWcSerializer