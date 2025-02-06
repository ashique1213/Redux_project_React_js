from django.urls import path
from .views import UserSignupView, UserLoginView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('signup/', UserSignupView, name='user_signup'),
    path('login/', UserLoginView, name='user_login'),
]
