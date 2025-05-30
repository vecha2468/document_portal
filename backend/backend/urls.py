from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse
from django.conf import settings
from django.conf.urls.static import static

def home_view(request):
    return JsonResponse({'message': 'Document Management API is running.'})

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # 👇 Add this line to include your users app endpoints
    path('api/users/', include('users.urls')),
    path('', home_view),  # 👈 Add this
    path('api/documents/', include('documents.urls')),
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)