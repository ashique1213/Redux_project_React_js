from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate
from .models import CustomUser 
from .serializer import UserSignupSerializer
from rest_framework_simplejwt.tokens import RefreshToken
import re
from datetime import timedelta


def get_access_token_for_user(user):
    refresh = RefreshToken.for_user(user)
    refresh.access_token.set_exp(lifetime=timedelta(minutes=30))  
    return str(refresh.access_token)

# def get_access_token_for_user(user):
#     refresh = RefreshToken.for_user(user)
#     return str(refresh.access_token)


@api_view(['POST'])
def UserSignupView(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')
    password2 = request.data.get('password2')

    # Validation
    if not username or not email or not password or not password2:
        return Response({"error": "All fields are required"}, status=status.HTTP_400_BAD_REQUEST)

    if password != password2:
        return Response({"error": "Passwords do not match"}, status=status.HTTP_400_BAD_REQUEST)

    if CustomUser.objects.filter(username=username).exists():
        return Response({"error": "Username already taken"}, status=status.HTTP_400_BAD_REQUEST)

    if CustomUser.objects.filter(email=email).exists():
        return Response({"error": "Email already taken"}, status=status.HTTP_400_BAD_REQUEST)

    email_regex = r'^[\w\.-]+@[\w\.-]+\.\w+$'
    if not re.match(email_regex, email):
        return Response({"error": "Invalid email format"}, status=status.HTTP_400_BAD_REQUEST)

    
    user = CustomUser.objects.create_user(
        username=username,
        email=email.lower(),
        password=password,
    )

    tokens = get_access_token_for_user(user)
    user_data = UserSignupSerializer(user).data

    return Response({
        "message": "User created successfully",
        "token": tokens,
        "user": user_data
    }, status=status.HTTP_201_CREATED)


@api_view(['POST'])
def UserLoginView(request):
    email = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
        return Response({"error": "Both fields are required"}, status=status.HTTP_400_BAD_REQUEST)

    email_regex = r'^[\w\.-]+@[\w\.-]+\.\w+$'
    if not re.match(email_regex, email):
        return Response({"error": "Invalid email format"}, status=status.HTTP_400_BAD_REQUEST)
    
    email = email.lower()
    try:
        user = CustomUser.objects.get(email=email)  
        print(user)
    except CustomUser.DoesNotExist:
        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

    user = authenticate(username=user.username, password=password)
    if user is None:
        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

    tokens = get_access_token_for_user(user)
    user_data = UserSignupSerializer(user).data

    return Response({
        "message": "Login successful",
        "token": tokens,
        "user": user_data,
        "is_admin": user.is_staff
    }, status=status.HTTP_200_OK)