from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
import os
import pandas as pd
import googlemaps
from PIL import Image
import pytesseract
import json

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///rooter.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Initialize Google Maps client
gmaps = googlemaps.Client(key=os.getenv('GOOGLE_MAPS_API_KEY'))

# Models
class Driver(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    start_location = db.Column(db.String(200), nullable=False)
    end_location = db.Column(db.String(200), nullable=False)

class Delivery(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    address = db.Column(db.String(200), nullable=False)
    driver_id = db.Column(db.Integer, db.ForeignKey('driver.id'))
    status = db.Column(db.String(50), default='pending')

# Routes
@app.route('/api/upload/manifest', methods=['POST'])
def upload_manifest():
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    try:
        if file.filename.endswith('.xlsx'):
            df = pd.read_excel(file)
            # Process Excel data
            return jsonify({'message': 'Excel file processed successfully', 'data': df.to_dict()})
        else:
            return jsonify({'error': 'Unsupported file format'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/upload/image', methods=['POST'])
def upload_image():
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    try:
        image = Image.open(file)
        text = pytesseract.image_to_string(image)
        # Process extracted text
        return jsonify({'message': 'Image processed successfully', 'text': text})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/route/optimize', methods=['POST'])
def optimize_route():
    data = request.json
    if not data or 'deliveries' not in data or 'start_location' not in data or 'end_location' not in data:
        return jsonify({'error': 'Missing required data'}), 400

    try:
        # Get coordinates for all locations
        locations = [data['start_location']] + data['deliveries'] + [data['end_location']]
        coordinates = []
        
        for location in locations:
            geocode_result = gmaps.geocode(location)
            if geocode_result:
                lat = geocode_result[0]['geometry']['location']['lat']
                lng = geocode_result[0]['geometry']['location']['lng']
                coordinates.append((lat, lng))
            else:
                return jsonify({'error': f'Could not geocode location: {location}'}), 400

        # Get optimized route
        directions_result = gmaps.directions(
            data['start_location'],
            data['end_location'],
            waypoints=data['deliveries'],
            optimize_waypoints=True,
            mode="driving"
        )

        if not directions_result:
            return jsonify({'error': 'Could not find route'}), 400

        return jsonify({
            'message': 'Route optimized successfully',
            'route': directions_result[0]
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/drivers', methods=['POST'])
def create_driver():
    data = request.json
    if not data or 'name' not in data or 'start_location' not in data or 'end_location' not in data:
        return jsonify({'error': 'Missing required data'}), 400

    try:
        driver = Driver(
            name=data['name'],
            start_location=data['start_location'],
            end_location=data['end_location']
        )
        db.session.add(driver)
        db.session.commit()
        return jsonify({'message': 'Driver created successfully', 'driver_id': driver.id})
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True) 