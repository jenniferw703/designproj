from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^users$', views.user_profile),
    url(r'^$', views.index, name='index'),
]