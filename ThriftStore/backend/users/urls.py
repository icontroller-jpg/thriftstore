from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView

from .views import signup

urlpatterns = [
    path("api/signup/", signup),
    path("api/login/", TokenObtainPairView.as_view()),
]