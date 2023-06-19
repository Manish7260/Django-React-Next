from django.shortcuts import render
from django.http import HttpResponse
from django.http.response import Http404
from rest_framework.decorators import api_view
from .models import Profile
from rest_framework import status
from .serializers import ProfileSerializer
from rest_framework.response import Response

@api_view(['GET'])
def list_profile(request):
    data = Profile.objects.all()
    serializer = ProfileSerializer(data, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def create_profile(request):
    serializer = ProfileSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def detail_profile(request,pk, format=None):

    try:
        data = Profile.objects.get(pk=pk)
        serializer = ProfileSerializer(data)
        return Response(serializer.data)

    except Profile.DoesNotExist:
        raise Http404

@api_view(['PUT'])
def update_profile(request, pk, format = None):

    data = Profile.objects.get(pk=pk)
    serializer = ProfileSerializer(instance=data, data=request.data)

    if serializer.is_valid():
        serializer.save()
        response = Response()

        response.data = {
                'message': 'Profile Updated Successfully',
                'data': serializer.data
            }
        return response

    else:
        return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['PATCH'])
def partial_update_profile(request, pk, format = None):
    data = Profile.objects.get(pk=pk)
    serializer = ProfileSerializer(instance=data, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        response = Response()
        response.data = {
                'message': 'Profile Updated Successfully',
                'data': serializer.data
            }
        return response
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['DELETE'])
def delete_profile(request, pk):
    data = Profile.objects.get(pk=pk)
    data.delete()
    return Response({
            'message': 'Profile Deleted Successfully'
        })