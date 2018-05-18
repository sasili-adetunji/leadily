from django.urls import path
from .views import LeadListCreate, DetailLead


urlpatterns = [
    path('api/lead/', LeadListCreate.as_view()),
    path('api/lead/<int:pk>/', DetailLead.as_view()),
]