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


# path('newproject/', AddProject.as_view()),
class AddProject(generics.CreateAPIView):
    serializer_class = ProjectSerializer


# path('projects/', ProjectsView.as_view())
class ProjectsView(generics.ListAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer