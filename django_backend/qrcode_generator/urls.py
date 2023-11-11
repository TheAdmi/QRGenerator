from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import QRCodeViewSet, convert_image_to_svg, convert_image_to_jpg

router = DefaultRouter()
router.register(r'qrcodes', QRCodeViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('convert_image_to_svg/', convert_image_to_svg, name='convert_image_to_svg'),
    path('convert_image_to_jpg/', convert_image_to_jpg, name='convert_image_to_jpg'),
]
