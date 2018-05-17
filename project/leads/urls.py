from django.urls import path
from .views import LeadListCreate


urlpatterns = [
    path('api/lead/', LeadListCreate.as_view() ),
]