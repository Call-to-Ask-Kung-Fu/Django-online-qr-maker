from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    user = models.OneToOneField(User)
    gid = models.CharField(max_length=50)
    url = models.URLField(blank=True, null=True)
    image = models.URLField(blank=True, null=True)
    cover = models.URLField(blank=True, null=True)
    displayname = models.CharField(max_length=200)

# Create your models here.
