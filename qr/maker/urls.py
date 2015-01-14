from django.conf.urls import patterns, url
from .views import detail, list_all, create, list_mine, list_his, delete, hide, show

urlpatterns = patterns('',
    # Examples:
    url(r'^$', create, name='create'),
    url(r'^(?P<qr_id>\d+)/$', detail, name='detail'),
    url(r'^listall/$', list_all, name='listall'),
    url(r'^listmy/$', list_mine, name='listmy'),
    url(r'^listhis/(?P<user_id>\d+)/$', list_his, name='listhis'),
    url(r'^delete/(?P<qr_id>\d+)/$', delete, name='delete'),
    url(r'^hide/(?P<qr_id>\d+)/$', hide, name='hide'),
    url(r'^show/(?P<qr_id>\d+)/$', show, name='show'),

)
