from writingapp.models import DailyWc, Project
from .serializers import DailyWcSerializer, ProjectSerializer
from rest_framework import generics



# path('', WcAPIView.as_view()),
class WcAPIView(generics.ListAPIView):
    serializer_class = DailyWcSerializer
    def get_queryset(self):
        print(f"This is the WcAPIView path at '' {self.request.user}") # Just the user's name
        return DailyWc.objects.filter(user=self.request.user) # django is aware of what user is logged in and so will only retrieve data for that user.


# path('new/', AddWc.as_view()),
class AddWc(generics.CreateAPIView):
    serializer_class = DailyWcSerializer


# path('<int:pk>/', WcView.as_view()),
class WcView(generics.RetrieveUpdateDestroyAPIView):
    queryset = DailyWc.objects.all()
    serializer_class = DailyWcSerializer


# path('projects/', ProjectList.as_view()),
class ProjectList(generics.CreateAPIView):
    serializer_class = ProjectSerializer