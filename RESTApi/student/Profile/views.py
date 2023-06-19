from django.shortcuts import render
from django.http import HttpResponse
from django.http.response import Http404
from rest_framework.views import APIView
from .models import Profile
from rest_framework import status, filters
from .serializers import ProfileSerializer
from rest_framework.response import Response
from rest_framework.generics import ListAPIView
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
class ProfileList(APIView):

    def get(self,request):
        data = Profile.objects.all()
        serializer = ProfileSerializer(data, many=True)
        return Response(serializer.data)

    def post(self, request):
        data = request.data
        serializer = ProfileSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            response = Response()
            response.data = {
            'message': 'Profile Created Successfully',
            'data': serializer.data
            }
            return response
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)


class ProfileDetail(APIView):
    def get_object(self, pk):
        try:
            return Profile.objects.get(pk=pk)
        except Profile.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        data = self.get_object(pk)
        serializer = ProfileSerializer(data)
        return Response(serializer.data)

    def put(self, request, pk, format = None):
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

    def patch(self, request, pk, format = None):

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

    def delete(self, request, pk):
        data = Profile.objects.get(pk=pk)
        data.delete()

        return Response({
            'message': 'Profile Deleted Successfully'
        })
class ShowStudent(ListAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ('csem', 'email')
    search_fields = ['email']