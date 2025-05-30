from django.shortcuts import render
from rest_framework import viewsets, permissions
from .models import Document
from .serializers import DocumentSerializer

# ✅ AI & supporting imports
import fitz  # PyMuPDF for PDF reading
import google.generativeai as genai
from django.conf import settings
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

# ✅ Document CRUD
class DocumentViewSet(viewsets.ModelViewSet):
    serializer_class = DocumentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Document.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

# ✅ AI Q&A Endpoint
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def ask_question(request, pk):
    from django.conf import settings
    import fitz
    import google.generativeai as genai

    try:
        document = Document.objects.get(pk=pk, owner=request.user)
    except Document.DoesNotExist:
        return Response({'error': 'Document not found'}, status=404)

    question = request.data.get('question')
    if not question:
        return Response({'error': 'Question is required'}, status=400)

    try:
        doc_text = ""
        with fitz.open(document.file.path) as doc:
            for page in doc:
                doc_text += page.get_text()
    except Exception as e:
        return Response({'error': 'Failed to read document', 'detail': str(e)}, status=500)

    try:
        genai.configure(api_key=settings.GEMINI_API_KEY)
        model = genai.GenerativeModel(model_name="models/gemini-1.5-flash-latest")
        response = model.generate_content([
            f"Here is the document:\n{doc_text}",
            f"My question is: {question}"
        ])
        return Response({'answer': response.text})
    except Exception as e:
        return Response({'error': 'Failed to generate answer', 'detail': str(e)}, status=500)

