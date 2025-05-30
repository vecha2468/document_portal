from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DocumentViewSet, ask_question


router = DefaultRouter()
router.register(r'', DocumentViewSet, basename='documents')

urlpatterns = [
    path('', include(router.urls)),
    path('<int:pk>/ask/', ask_question),
]
