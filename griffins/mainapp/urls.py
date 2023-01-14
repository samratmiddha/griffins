
from django.urls import path, include
from mainapp.views import HashViewSet,BufferViewSet
from rest_framework import routers


router = routers.SimpleRouter()
router.register(r'hash', HashViewSet)
router.register(r'buffer',BufferViewSet)

urlpatterns = [
    path('', include(router.urls)),
]