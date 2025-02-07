from django.urls import path
from .views import UserListView,AdminAddUserView,AdminDeleteUserView,AdminEditUserView

urlpatterns = [
    path('users/', UserListView, name='users'),  
    path('add-user/', AdminAddUserView, name='admin_add_user'),
    path('delete/<int:user_id>/', AdminDeleteUserView, name='delete_user'),
    path('update/<int:user_id>/', AdminEditUserView, name='edit_user'),
]
