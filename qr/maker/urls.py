from django.conf.urls import patterns, url
from .views import detail, listshow, Create

urlpatterns = patterns('',
    # Examples:
    url(r'^$', 'Create', name='Create'),
    url(r'^(?P<qr_id>\d+)/$', detail, name='detail'),
    url(r'^list/$', listshow, name='list'),

)
