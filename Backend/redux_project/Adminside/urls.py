from django.urls import path
from .views import UserListView,AdminAddUserView

urlpatterns = [
    path('users/', UserListView, name='users'),  
    path('add-user/', AdminAddUserView, name='admin_add_user'),
]
