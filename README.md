# Rooter - Delivery Route Optimization System

Rooter is a business-first system designed to streamline the delivery process by optimizing routes for delivery drivers and companies. The system processes manifest data and generates the most efficient delivery routes, saving time, fuel, and costs.

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

## Setup Instructions

1. Clone the repository
2. Set up the backend:
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. Set up the frontend:
   ```bash
   cd frontend
   npm install
   ```

4. Configure environment variables:
   - Create `.env` files in both backend and frontend directories
   - Add required API keys (Google Maps, etc.)

5. Run the development servers:
   - Backend: `python run.py`
   - Frontend: `npm start`

## Environment Variables

### Backend (.env)
```
GOOGLE_MAPS_API_KEY=your_api_key
DATABASE_URL=your_database_url
```

### Frontend (.env)
```
REACT_APP_GOOGLE_MAPS_API_KEY=your_api_key
REACT_APP_API_URL=http://localhost:5000
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License
