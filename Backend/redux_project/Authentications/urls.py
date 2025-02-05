from django.urls import path
from .views import UserSignupView,UserLoginView

urlpatterns = [
    path('signup/', UserSignupView, name='user_signup'),
    path('login/', UserLoginView, name='user_login'),
]
