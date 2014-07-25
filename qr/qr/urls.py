from django.conf.urls import patterns, include, url
from qr import settings
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    url(r'^$', 'maker.views.Create', name='Crate'),
    url(r'^qr/', include('maker.urls')),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^media/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.MEDIA_ROOT}),
)
