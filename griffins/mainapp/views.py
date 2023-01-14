from django.shortcuts import render
from rest_framework import viewsets
from .serializers import *
from .models import *
from rest_framework.permissions import IsAuthenticated


class HashViewSet(viewsets.ModelViewSet):
    queryset = HashAddress.objects.all()
    serializer_class= HashSerializer


class BufferViewSet(viewsets.ModelViewSet):
    queryset = BufferModel.objects.all()
    serializer_class = BufferSerializer
 
