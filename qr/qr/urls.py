from django.conf.urls import patterns, include, url
from qr import settings
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    url(r'^$', 'maker.views.home', name='home'),
    url(r'^qr/', include('maker.urls')),
    url('', include('social.apps.django_app.urls', namespace='social')),
    url('', include('django.contrib.auth.urls', namespace='auth')),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^media/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.MEDIA_ROOT}),
    url(r'^foundation/', include('foundation.urls')),
    url(r'^i18n/', include('django.conf.urls.i18n')),
)
