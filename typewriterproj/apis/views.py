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


# class createUpdate(APIView):
#     def post(self, request, format=None):
#         print("This runs.")
#         serializer = DailyWcSerializer
#         # <property object at 0x103002020>
#         print(serializer.data)
#         if serializer.is_valid():
#             serializer.save()
#             print("Status RIGHT HERE!!")
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        # usernames = [project.project_name for project in DailyWc.objects.all()]
        # words = "Here is a variable."
        # return Response(words)


class WcAPIView(generics.ListAPIView):
    queryset = DailyWc.objects.all()
    serializer_class = DailyWcSerializer


class AddWc(generics.CreateAPIView):
    serializer_class = DailyWcSerializer


class WcView(generics.RetrieveUpdateDestroyAPIView):
    queryset = DailyWc.objects.all()
    serializer_class = DailyWcSerializer

