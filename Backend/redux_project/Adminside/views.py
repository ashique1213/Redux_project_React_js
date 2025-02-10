from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from Authentications.models import CustomUser 
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.decorators import api_view, permission_classes

@api_view(['GET'])
def UserListView(request):
        users = CustomUser.objects.filter(is_staff=False).order_by('-id')
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

    if CustomUser.objects.filter(username__iexact=username).exists():
        return Response({"error": "Username already taken"}, status=status.HTTP_400_BAD_REQUEST)

    if CustomUser.objects.filter(email__iexact=email).exists():
        return Response({"error": "Email already taken"}, status=status.HTTP_400_BAD_REQUEST)

    user = CustomUser.objects.create_user(username=username, email=email, password=password)
    return Response({
        "message": "User created successfully",
        "user": {
            "username": user.username,
            "email": user.email,
        }
    }, status=status.HTTP_201_CREATED)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated, IsAdminUser])
def AdminDeleteUserView(request, user_id):
    print("jo")
    try:
        user = CustomUser.objects.get(id=user_id)
        user.delete()
        return Response({"message": "User deleted successfully"}, status=status.HTTP_200_OK)
    except CustomUser.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated, IsAdminUser])
def AdminEditUserView(request, user_id):
    try:
        user = CustomUser.objects.get(id=user_id)

        if request.method == 'GET':
            return Response({"id": user.id, "username": user.username, "email": user.email})

        if request.method == 'PUT':
            username = request.data.get("username", user.username)
            email = request.data.get("email", user.email)

            if CustomUser.objects.exclude(id=user.id).filter(username=username).exists():
                return Response({"error": "Username already in use"}, status=status.HTTP_400_BAD_REQUEST)
            
            if CustomUser.objects.exclude(id=user.id).filter(email=email).exists():
                return Response({"error": "Email already in use"}, status=status.HTTP_400_BAD_REQUEST)

            user.username = username
            user.email = email
            user.save()
            return Response({"message": "User updated successfully"}, status=status.HTTP_200_OK)

    except CustomUser.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


