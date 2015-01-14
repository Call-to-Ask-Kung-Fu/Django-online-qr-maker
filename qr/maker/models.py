from django.db import models
import datetime
import qrcode
from PIL import Image, ImageOps
from cStringIO import StringIO
import os
from django.contrib.auth.models import User
from django.db.models.signals import pre_delete
from django.dispatch.dispatcher import receiver
from django.utils.translation import ugettext_lazy as _

now = datetime.datetime.now()
date = (now.year, now.month, now.day)
ICON_PATH = 'qr/icon/%s/%s/%s' % date
QR_PATH = 'qr/png/%s/%s/%s' % date
from django.core.files.uploadedfile import SimpleUploadedFile

def make_qr(self):
    FILE_EXTENSION = 'png'
    temp_handle = StringIO()

    infile = self.input
    qr = qrcode.QRCode(
        version=2,
        error_correction=qrcode.constants.ERROR_CORRECT_M,
        box_size=10,
        border=1
        )
    qr.add_data(infile)
    qr.make(fit=True)
    img = qr.make_image()

    if not self.icon:
        img.save(temp_handle, FILE_EXTENSION)
    else:
        icon = Image.open(StringIO(self.icon.read()))
        icon = icon.convert("RGBA")
        img_w, img_h = img.size
        factor = 4
        size_w = int(img_w / factor)
        size_h = int(img_h / factor)

        icon_w, icon_h = icon.size

        if icon_w > size_w:
            icon_w = size_w
        if icon_h > size_h:
            icon_h = size_h
        icon = icon.resize((icon_w, icon_h), Image.ANTIALIAS)
        w = int((img_w - icon_w) / 2)
        h = int((img_h - icon_h) / 2)
        img = img.convert("RGBA")
        img.paste(icon, (w, h), icon)
        img.save(temp_handle, FILE_EXTENSION)
    temp_handle.seek(0)
    suf = SimpleUploadedFile(QR_PATH[-1], temp_handle.read(), content_type=FILE_EXTENSION)

    self.qrmaked.save('qr.%s' % (FILE_EXTENSION), suf, save=False)

class QR(models.Model):
    owner = models.ForeignKey(User)
    date = models.DateTimeField(auto_now=True)
    input = models.TextField(_('Input Words'), max_length=2000)
    icon = models.ImageField(_('Icon'), upload_to=ICON_PATH, null=True, blank=True)
    qrmaked = models.ImageField(upload_to=QR_PATH, blank=True)
    shown = models.BooleanField(_('Show To Others'), default=True)

    def save(self):
        make_qr(self)
        self.icon.delete(False)
        super(QR, self).save()


@receiver(pre_delete, sender=QR)
def thumb_delete(sender, instance, **kwargs):
    instance.qrmaked.delete(False)
