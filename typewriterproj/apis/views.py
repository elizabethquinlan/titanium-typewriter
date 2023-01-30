from rest_framework import generics
from writingapp.models import DailyWc
from .serializers import DailyWcSerializer
from rest_framework.views import APIView
from rest_framework.response import Response


# Create your views here.
class WcAPIView(generics.ListAPIView):
    queryset = DailyWc.objects.all()
    serializer_class = DailyWcSerializer


class AddWc(generics.CreateAPIView):
    serializer_class = DailyWcSerializer


class WcView(generics.RetrieveUpdateDestroyAPIView):
    queryset = DailyWc.objects.all()
    serializer_class = DailyWcSerializer


class createUpdate(APIView):
# get today in the same format that the model is using
    def get(self, request, format=None):
        """
        Return a list of all users.
        """
        usernames = [project.project_name for project in DailyWc.objects.all()]
        return Response({"message": "Hello, world!"})