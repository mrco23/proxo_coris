"""
Entry point for the Flask application.
Run with: python server.py
"""
import os
from app import create_app
from app.config.extensions import db

app = create_app()

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    debug = os.getenv('DEBUG', 'True').lower() == 'true'
    
    # Create database tables if they don't exist
    with app.app_context():
        db.create_all()
    
    app.run(host='0.0.0.0', port=port, debug=debug)
