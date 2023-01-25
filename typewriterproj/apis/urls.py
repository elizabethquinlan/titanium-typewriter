
from django.urls import path
from .views import WcView, AddWc

urlpatterns = [
    # The list of all wordcounts will be at apis/v1/.
    path('', WcView.as_view()),
    # The option to add a new wordcount will be at apis/v1/new/
    path('new/', AddWc.as_view()),
]