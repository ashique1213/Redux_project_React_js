from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from Authentications.models import CustomUser 
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.decorators import api_view, permission_classes

@api_view(['GET'])
def UserListView(request):
        users = CustomUser.objects.all()
        user_list = [{"id": user.id, "username": user.username, "email": user.email} for user in users]
        return Response({"user_list": user_list}, status=status.HTTP_200_OK)  


@api_view(['POST'])
@permission_classes([IsAuthenticated, IsAdminUser])
def AdminAddUserView(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')
    password2 = request.data.get('password2')

    if not username or not email or not password or not password2:
        return Response({"error": "All fields are required"}, status=status.HTTP_400_BAD_REQUEST)

    if password != password2:
        return Response({"error": "Passwords do not match"}, status=status.HTTP_400_BAD_REQUEST)

    if CustomUser.objects.filter(username=username).exists():
        return Response({"error": "Username already taken"}, status=status.HTTP_400_BAD_REQUEST)

    if CustomUser.objects.filter(email=email).exists():
        return Response({"error": "Email already taken"}, status=status.HTTP_400_BAD_REQUEST)

    user = CustomUser.objects.create_user(username=username, email=email, password=password)
    return Response({
        "message": "User created successfully",
        "user": {
            "username": user.username,
            "email": user.email,
        }
    }, status=status.HTTP_201_CREATED)

