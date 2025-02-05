from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from .serializer import UserSignupSerializer


@api_view(['POST'])
def UserSignupView(request):
    if request.method == 'POST':
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')

        if not username or not email or not password:
            return Response({"error": "All fields are required"}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=username).exists():
            return Response({"error": "Username already taken"}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(email=email).exists():
            return Response({"error": "Email already taken"}, status=status.HTTP_400_BAD_REQUEST)

        # Create the user
        user = User.objects.create_user(username=username, email=email, password=password)

        user_data = UserSignupSerializer(user).data
        token, created = Token.objects.get_or_create(user=user)

        return Response({"message": "User created successfully", "token": token.key,  "user": user_data}, status=status.HTTP_201_CREATED)


@api_view(['POST'])
def UserLoginView(request):
    email = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
        return Response({"error": "Both fields are required"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = User.objects.get(email=email)  
    except User.DoesNotExist:
        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

    user = authenticate(username=user.username, password=password)
    user_data = UserSignupSerializer(user).data

    if user is not None:
        token, created = Token.objects.get_or_create(user=user)
        return Response({"message": "Login successful", "token": token.key,"user":user_data}, status=status.HTTP_200_OK)
    else:
        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

