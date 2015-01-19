from .forms import QRForm
from django.http import HttpResponseRedirect, HttpResponse
from .models import QR
from django.shortcuts import render, get_object_or_404
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.core.urlresolvers import reverse
from django.shortcuts import render_to_response
from django.template.context import RequestContext
from django.contrib.auth.models import User
from django.db.models import Q
from django.views.decorators.http import require_POST
from django.core.exceptions import PermissionDenied
from django.utils.encoding import smart_str
import os

def home(request):
    context = RequestContext(request, {'user': request.user, 'form':QRForm})
    return render_to_response('home.html', context_instance=context)

@require_POST
def create(request):
    if request.user.is_authenticated():
        form = QRForm(data=request.POST, files=request.FILES)
        if form.is_valid():
            qr = form.save(commit=False)
            qr.owner = request.user
            qr.save()
            return detail(request, qr.id)
    else:
        raise PermissionDenied

def delete(request, qr_id):
    item = QR.objects.get(id=qr_id)
    if item.owner == request.user:
        item.delete()
        res = HttpResponse()
        c = '{"status":"success", "id":"%s"}' % str(qr_id)
        res.__init__(content=c, content_type='application/json', reason=None)
        return res
    else:
        raise PermissionDenied

def show(request, qr_id):
    item = QR.objects.get(id=qr_id)
    if item.owner == request.user:
        item.shown = True
        item.save()
        res = HttpResponse()
        c = '{"status":"success", "id":"%s"}' % str(qr_id)
        res.__init__(content=c, content_type='application/json', reason=None)
        return res
    else:
        raise PermissionDenied

def hide(request, qr_id):
    item = QR.objects.get(id=qr_id)
    if item.owner == request.user:
        item.shown = False
        item.save()
        res = HttpResponse()
        c = '{"status":"success", "id":"%s"}' % str(qr_id)
        res.__init__(content=c, content_type='application/json', reason=None)
        return res
    else:
        raise PermissionDenied

def detail(request, qr_id):
    item = get_object_or_404(QR, pk=qr_id)
    return render(request, 'detail.html', {'item': item})

def list_all(request):
    list1 = QR.objects.all().filter(shown=True).order_by('-date')  # .order_by('-pub_date')[:5]
    paginator = Paginator(list1, 6)  # Show 25 contacts per page
    page = request.GET.get('page')
    try:
        items = paginator.page(page)
    except PageNotAnInteger:
        # If page is not an integer, deliver first page.
        items = paginator.page(1)
    except EmptyPage:
        # If page is out of range (e.g. 9999), deliver last page of results.
        items = paginator.page(paginator.num_pages)
    context = {'items': items}
    return render(request, 'listall.html', context)


def list_mine(request):
    list2 = QR.objects.filter(owner=request.user).order_by('-date')
    paginator = Paginator(list2, 6)  # Show 25 contacts per page
    page = 1
    if request.is_ajax():
        query = request.GET.get('page')
        if query is not None:
            page = query
    try:
        items2 = paginator.page(page)
    except PageNotAnInteger:
        # If page is not an integer, deliver first page.
        items2 = paginator.page(1)
    except EmptyPage:
        # If page is out of range (e.g. 9999), deliver last page of results.
        items2 = paginator.page(paginator.num_pages)
    context = {'items': items2}
    return render(request, 'listmy.html', context)

def list_his(request, user_id):
    user = User.objects.get(pk=user_id)
    list3 = QR.objects.filter(owner=user).filter(shown=True).order_by('-date')
    paginator = Paginator(list3, 6)  # Show 25 contacts per page
    page = 1
    if request.is_ajax():
        query = request.GET.get('page')
        if query is not None:
            page = query
    try:
        items3 = paginator.page(page)
    except PageNotAnInteger:
        # If page is not an integer, deliver first page.
        items3 = paginator.page(1)
    except EmptyPage:
        # If page is out of range (e.g. 9999), deliver last page of results.
        items3 = paginator.page(paginator.num_pages)
    context = {'items': items3, 'user':user}
    return render(request, 'listhis.html', context)

def download(request, qr_id):
    qr = QR.objects.get(pk=qr_id)
    file = qr.qrmaked.file
    input = qr.input
    file_name = "qr-%s.png" % input[:5]
    response = HttpResponse(file, mimetype='application/force-download')
    response['Content-Disposition'] = 'attachment; filename="%s"' % file_name
#     response['X-Sendfile'] = smart_str(file_name)
    return response

# Create your views here.
