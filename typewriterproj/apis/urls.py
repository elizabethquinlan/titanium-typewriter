
from django.urls import path
from .views import AddWc, createUpdate, WcAPIView, WcView
from apis import views

urlpatterns = [
    # The list of all wordcounts will be at apis/v1/.
    path('', WcAPIView.as_view()),
    # The option to add a new wordcount will be at apis/v1/new/
    path('new/', AddWc.as_view()),
    # get, put, and delete and accessing via primary key (e.g. apis/v1/200)
    path('<int:pk>/', WcView.as_view()),
    path('today/', createUpdate.as_view())
]