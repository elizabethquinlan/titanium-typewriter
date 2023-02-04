
from django.urls import path
from .views import AddWc, WcAPIView, WcView, AddProject, ProjectsView

urlpatterns = [
    # The list of all wordcounts will be at apis/v1/.
    path('', WcAPIView.as_view()),
    # The option to add a new wordcount will be at apis/v1/new/
    path('new/', AddWc.as_view()),
    # get, put, and delete and accessing via primary key (e.g. apis/v1/200)
    path('<int:pk>/', WcView.as_view()),
    # Creates a new project
    path('newproject/', AddProject.as_view()),
    # Viewing all projects
    path('projects/', ProjectsView.as_view())
]