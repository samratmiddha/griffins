from rest_framework import  serializers

from .models import *

class HashSerializer(serializers.ModelSerializer):
    class Meta:
        model = HashAddress
        fields="__all__"

class BufferSerializer(serializers.ModelSerializer):
    class Meta:
        model = BufferModel
        fields = "__all__"