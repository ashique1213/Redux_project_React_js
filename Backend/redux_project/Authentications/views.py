from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth import authenticate
from .models import CustomUser 
from .serializer import UserSignupSerializer
from rest_framework_simplejwt.tokens import RefreshToken
import re
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.shortcuts import get_object_or_404



def get_access_token_for_user(user):
    refresh = RefreshToken.for_user(user)
    return str(refresh.access_token)


@api_view(['POST'])
def UserSignupView(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')
    password2 = request.data.get('password2')

    if not username or not email or not password or not password2:
        return Response({"error": "All fields are required"}, status=status.HTTP_400_BAD_REQUEST)

    if password != password2:
        return Response({"error": "Passwords do not match"}, status=status.HTTP_400_BAD_REQUEST)

    if CustomUser.objects.filter(username__iexact=username).exists():
        return Response({"error": "Username already taken"}, status=status.HTTP_400_BAD_REQUEST)

    if CustomUser.objects.filter(email__iexact=email).exists():
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
        return Response({"error": "Both email and password are required."}, status=status.HTTP_400_BAD_REQUEST)

    email_regex = r'^[\w\.-]+@[\w\.-]+\.\w+$'
    if not re.match(email_regex, email):
        return Response({"error": "Invalid email format. Please enter a valid email address."}, status=status.HTTP_400_BAD_REQUEST)
    
    email = email.lower()
    try:
        user = CustomUser.objects.get(email=email)  
    except CustomUser.DoesNotExist:
        return Response({"error": "No account found with this email address."}, status=status.HTTP_401_UNAUTHORIZED)

    user = authenticate(username=user.username, password=password)
    if user is None:
        return Response({"error": "Incorrect password. Please try again."}, status=status.HTTP_401_UNAUTHORIZED)

    tokens = get_access_token_for_user(user)
    user_data = UserSignupSerializer(user).data

    return Response({
        "message": "Login successful",
        "token": tokens,
        "user": user_data,
        "is_admin": user.is_staff
    }, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def UserProfile(request, user_id):
    try:
        user = CustomUser.objects.get(id=user_id)
        return Response({
            "username": user.username,
            "email": user.email,
            "profile_image": user.profile_image.url if user.profile_image else None
        })
    except CustomUser.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)



@api_view(['POST'])
@permission_classes([IsAuthenticated])  
def UpdateProfile(request, user_id):
    user = get_object_or_404(CustomUser, id=user_id)

    if request.user != user:
        return Response({"error": "You can only update your own profile"}, status=403)

    if "profile_image" in request.FILES:
        user.profile_image = request.FILES["profile_image"]
        user.save()
        return Response({"profile_image": user.profile_image.url}, status=200)

    return Response({"error": "No image provided"}, status=400)

