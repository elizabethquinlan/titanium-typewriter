
from django.urls import path
from .views import AddWc, WcAPIView, WcView, ProjectList

urlpatterns = [
    # The list of all wordcounts will be at apis/v1/.
    path('', WcAPIView.as_view()),
    # The option to add a new wordcount will be at apis/v1/new/
    path('new/', AddWc.as_view()),
    # get, put, and delete and accessing via primary key (e.g. apis/v1/200)
    path('<int:pk>/', WcView.as_view()),

    # # The list of everything? at apis/v1/projects/
    # path('everything/', CombinedView.as_view()),

    #  handles the view for retrieving and creating Project instances.
    path('projects/', ProjectList.as_view()),
]