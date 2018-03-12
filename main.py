import os
from flask import Flask, render_template

# Setup Flask
app = Flask(__name__)

# Configure SQLAlchemy
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['SQLALCHEMY_URI']
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize database
from app.orm import db
db.init_app(app)

# Initialize API
from app.api import generate_api
generate_api(app, db)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=80)
