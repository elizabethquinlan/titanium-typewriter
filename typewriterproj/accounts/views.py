from django.contrib.auth.forms import UserCreationForm
from django.urls import reverse_lazy
from django.views import generic


# Create your views here.
class SignUpView(generic.CreateView): # subclassing the generic class-based view CreateView in our SignUp class.
    form_class = UserCreationForm # specify built-in creation form
    success_url = reverse_lazy("login") # redirects user to login page upon successful registration
    template_name = "registration/signup.html"