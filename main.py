# --------------------------------
# Flask Backend Entry-point      -
# Copyright (C) 2018 GameFrame   -
# --------------------------------

from app.orm import db
from app.api import generate_api
from flask import Flask
from flask_cors import CORS
import os

# Initialize Flask
app = Flask(__name__)
CORS(app)

# Configure SQLAlchemy
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['SQLALCHEMY_URI']

# Initialize database
db.init_app(app)

# Initialize API
generate_api(app, db)

# Start Flask
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=80)
