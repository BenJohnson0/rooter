# Rooter - Route Optimization System

A system for optimizing delivery routes using manifest data, with features for file uploads and Google Maps integration.

## Setup Instructions

### Prerequisites
- Node.js and npm
- Python 3.8+
- Google Maps API key

### Getting Started

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd rooter
   ```

2. **Set up environment variables**

   Frontend:
   - Copy `frontend/.env.example` to `frontend/.env`
   - Add your Google Maps API key to `frontend/.env`

   Backend:
   - Copy `backend/.env.example` to `backend/.env`
   - Add your Google Maps API key to `backend/.env`

3. **Install dependencies**

   Frontend:
   ```bash
   cd frontend
   npm install
   ```

   Backend:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

4. **Start the development servers**

   Frontend:
   ```bash
   cd frontend
   npm start
   ```

   Backend:
   ```bash
   cd backend
   flask run
   ```

## Environment Variables

### Frontend (.env)
```
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
REACT_APP_API_URL=http://localhost:5000
```

### Backend (.env)
```
GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
DATABASE_URL=sqlite:///rooter.db
FLASK_ENV=development
FLASK_APP=app.py
```

## Security Notes
- Never commit `.env` files to version control
- Keep your API keys secure and don't share them publicly
- Use environment variables for all sensitive configuration

## Features

- Manifest data import via Excel (.xlsx) files
- Image-to-text capture for manifest data
- Customizable start and end locations for drivers
- Google Maps integration for route optimization
- Fuel efficiency and time-saving route calculations
- User-friendly interface for drivers and companies

## Tech Stack

- Backend: Python (Flask)
- Frontend: React with TypeScript
- Database: PostgreSQL
- Maps Integration: Google Maps API
- OCR: Tesseract for image-to-text processing
- Excel Processing: pandas, openpyxl

## Project Structure

```
rooter/
├── backend/           # Flask backend
├── frontend/         # React frontend
├── docs/            # Documentation
└── tests/           # Test files
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License
