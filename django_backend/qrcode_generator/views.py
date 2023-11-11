from rest_framework import viewsets, status
from rest_framework.response import Response
from django.conf import settings
from .models import QRCode
from .serializers import QRCodeSerializer
import qrcode
from io import BytesIO
from django.core.files import File
import hashlib

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import aspose.words as aw
import requests
import json
import os

class QRCodeViewSet(viewsets.ModelViewSet):
    queryset = QRCode.objects.all()
    serializer_class = QRCodeSerializer

    def create(self, request):
        link = request.data.get('link')

        # Generate the Qqcode image
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_L,
            box_size=10,
            border=4,
        )
        qr.add_data(link)
        qr.make(fit=True)

        img = qr.make_image(fill_color="black", back_color="white")

        # Create a hashed filename for the Qqcode image
        filename = hashlib.md5(link.encode()).hexdigest() + '.png'

        # Save the Qqcode image as a BytesIO object
        image_io = BytesIO()
        img.save(image_io, format='PNG')
        image_io.seek(0)

        # Create a file object from the BytesIO object
        qr_code_image = File(image_io, name=filename)

        qr_code = QRCode(link=link, qr_code_image=qr_code_image)
        qr_code.save()

        qr_code_image_url = settings.MEDIA_URL + qr_code.qr_code_image.name

        serializer = QRCodeSerializer(qr_code)

        # Update the image URL in the serializer's data
        serializer.data['qr_code_image'] = qr_code_image_url

        return Response(serializer.data, status=status.HTTP_201_CREATED)


# Convert image PNG to SVG :
@csrf_exempt
def convert_image_to_svg(request):
    if request.method == 'POST':
        try:
            # Try to get data as JSON
            data = json.loads(request.body.decode('utf-8'))
            image_url = data.get('image_url', '')
        except json.JSONDecodeError:
            # If JSON decoding fails, try to get data as form data
            image_url = request.POST.get('image_url', '')

        if image_url:
            doc = aw.Document()
            builder = aw.DocumentBuilder(doc)

            # Fetch the image from the URL
            response = requests.get(image_url, stream=True)
            response.raise_for_status()

            # Insert the image into the document
            shape = builder.insert_image(response.content)

            # Define the path to the converted images folder
            converted_imgs_folder = os.path.join(settings.MEDIA_ROOT, 'converted_imgs')

            # Create the folder if it doesn't exist
            if not os.path.exists(converted_imgs_folder):
                os.makedirs(converted_imgs_folder)

            # Generate a unique name for the SVG file based on the image URL
            image_name = os.path.basename(image_url)
            svg_name = os.path.splitext(image_name)[0] + '.svg'
            svg_path = os.path.join(converted_imgs_folder, svg_name)

            # Save the image as SVG in the converted images folder
            save_options = aw.saving.ImageSaveOptions(aw.SaveFormat.SVG)
            shape.get_shape_renderer().save(svg_path, save_options)

            # Save only the SVG filename in the QRCode model
            qr_code_filename = os.path.basename(svg_path)
            qr_code = QRCode(qr_code_image_svg=qr_code_filename)
            qr_code.save()

            return JsonResponse({'success': True, 'message': 'Image converted to SVG successfully', 'svg_name': svg_name})
        else:
            return JsonResponse({'success': False, 'message': 'Image URL not provided'})
    else:
        return JsonResponse({'success': False, 'message': 'Invalid request method'})


# Convert image PNG to JPG :
@csrf_exempt
def convert_image_to_jpg(request):
    if request.method == 'POST':
        try:
            # Try to get data as JSON
            data = json.loads(request.body.decode('utf-8'))
            image_url = data.get('image_url', '')
        except json.JSONDecodeError:
            # If JSON decoding fails, try to get data as form data
            image_url = request.POST.get('image_url', '')

        if image_url:
            doc = aw.Document()
            builder = aw.DocumentBuilder(doc)

            # Fetch the image from the URL
            response = requests.get(image_url, stream=True)
            response.raise_for_status()

            # Insert the image into the document
            shape = builder.insert_image(response.content)

            # Define the path to the converted images folder
            converted_imgs_folder = os.path.join(settings.MEDIA_ROOT, 'converted_imgs')

            # Create the folder if it doesn't exist
            if not os.path.exists(converted_imgs_folder):
                os.makedirs(converted_imgs_folder)

            # Generate a unique name for the JPEG file based on the image URL
            image_name = os.path.basename(image_url)
            jpg_name = os.path.splitext(image_name)[0] + '.jpg'
            jpg_path = os.path.join(converted_imgs_folder, jpg_name)

            # Save the image as JPEG in the converted images folder
            save_options = aw.saving.ImageSaveOptions(aw.SaveFormat.JPEG)
            shape.get_shape_renderer().save(jpg_path, save_options)

            # Save only the JPEG filename in the QRCode model
            qr_code_filename = os.path.basename(jpg_path)
            qr_code = QRCode(qr_code_image_jpg=qr_code_filename)
            qr_code.save()

            return JsonResponse({'success': True, 'message': 'Image converted to JPEG successfully', 'jpg_name': jpg_name})
        else:
            return JsonResponse({'success': False, 'message': 'Image URL not provided'})
    else:
        return JsonResponse({'success': False, 'message': 'Invalid request method'})
