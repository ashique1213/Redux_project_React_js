from django.urls import path
from .views import UserSignupView, UserLoginView,UserProfile,UpdateProfile
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('signup/', UserSignupView, name='user_signup'),
    path('login/', UserLoginView, name='user_login'),
    path('profile/<int:user_id>/', UserProfile, name='user_profile'),
    path('update/<int:user_id>/', UpdateProfile, name='update_profile'),



]
