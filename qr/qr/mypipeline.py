from accounts.models import Profile
from django.core.exceptions import ObjectDoesNotExist
from django.core.files.base import ContentFile
from requests import request, ConnectionError

def save_profile(backend, user, response, is_new, *args, **kwargs):
    dic = {'user':user}
    gid = response.get('id')
    dic.update({'gid':gid})
    if response.get('url'):
        url = response.get('url')
        dic.update({'url':url})
    if response.get('displayName'):
        displayname = response.get('displayName')
        dic.update({'displayname':displayname})
    if response.get('image') and response['image'].get('url'):
        image = response['image'].get('url')
        dic.update({'image':image})
    if response.get('cover') and response['cover'].get('coverPhoto').get('url'):
        cover = response['cover'].get('coverPhoto').get('url')
        dic.update({'cover':cover})
    try:
        prof = Profile.objects.get(user=user)
        if prof.image and prof.gid and prof.url and prof.displayname and prof.cover:
            pass
        else:
            Profile.objects.filter(user=user).update(**dic)
    except ObjectDoesNotExist:
        prof = Profile.objects.create(**dic)
        prof.save()
