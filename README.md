# document_portal

## Project Overview

## Hosting Links

- **Frontend (Netlify):** [https://poetic-peony-0c3a84.netlify.app/](https://poetic-peony-0c3a84.netlify.app/)
- **Backend (Render):** [https://document-portal-8nkc.onrender.com](https://document-portal-8nkc.onrender.com)


Document Portal is a full-stack web application that allows users to securely upload, manage, and interact with documents through a modern dashboard interface. The project features a React.js frontend and a Django REST backend, providing authentication, document upload, search, and AI-powered Q&A functionality. The application is designed for SSR safety and is deployable to platforms like Netlify (frontend) and Render (backend).

## Tech Stack Used

**Frontend:**
- Next.js (React.js framework)
- React 19
- Tailwind CSS

**Backend:**
- Django 5
- Django REST Framework
- SimpleJWT (for authentication)
- Python 3.11
- PyMuPDF, google-generativeai (for document/AI features)

**Deployment:**
- Netlify (frontend)
- Render (backend)

---

## Steps to Run Locally

### Backend (Django)
1. Navigate to the `backend` directory:
   ```sh
   cd backend
   ```
2. Create and activate a virtual environment (optional but recommended):
   ```sh
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
4. Run migrations:
   ```sh
   python manage.py migrate
   ```
5. (Optional) Create a superuser for admin:
   ```sh
   python manage.py createsuperuser
   ```
6. Start the Django server:
   ```sh
   python manage.py runserver
   ```

### Frontend (Next.js)
1. Open a new terminal and navigate to the `frontend` directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env.local` file with the following content (adjust as needed):
   ```sh
   NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
   ```
4. Start the Next.js development server:
   ```sh
   npm run dev
   ```

The frontend will be available at `http://localhost:3000` and the backend at `http://127.0.0.1:8000` by default.

---


**Key features:**
- User authentication (JWT-based)
- Secure document upload and storage
- Document listing and management dashboard
- AI-powered question and answer system for uploaded documents
- Responsive, modern UI with navigation between login, signup, and dashboard
- SSR-safe frontend using React.js best practices
- Easy deployment to Netlify and Render