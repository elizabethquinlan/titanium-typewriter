from writingapp.models import DailyWc
from .serializers import DailyWcSerializer
from django.http import Http404
from rest_framework import status
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view


# Create your views here.
@api_view(['POST']) # Takes arguments @api_view(http_method_names=['GET'])
def createUpdate(request):
    if request.method == 'POST':
    # If a post has already been made today, then 
        print("The request method was a post! Right here!")
    return Response({"message": "Hello, world!"})




class WcAPIView(generics.ListAPIView):
    queryset = DailyWc.objects.all()
    serializer_class = DailyWcSerializer


class AddWc(generics.CreateAPIView):
    serializer_class = DailyWcSerializer


class WcView(generics.RetrieveUpdateDestroyAPIView):
    queryset = DailyWc.objects.all()
    serializer_class = DailyWcSerializer

