from django.db import models

class QRCode(models.Model):
    link = models.CharField(max_length=255)
    qr_code_image = models.ImageField(upload_to='qrcodes/', blank=True, null=True)
    qr_code_image_svg = models.ImageField(upload_to='qrcodes/svg/', blank=True, null=True)
    qr_code_image_jpg = models.ImageField(upload_to='qrcodes/jpg/', blank=True, null=True)
