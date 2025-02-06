from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from Authentications.models import CustomUser 

class UserListView(APIView):
    def get(self, request):
        users = CustomUser.objects.all()
        user_list = [{"id": user.id, "username": user.username, "email": user.email} for user in users]
        return Response({"user_list": user_list}, status=status.HTTP_200_OK)
