# --------------------------------
# Flask Backend Entry-point      -
# Copyright (C) 2018 GameFrame   -
# --------------------------------

from app.orm import db
from app.api import generate_api
from flask import Flask
import os

# Initialize Flask
app = Flask(__name__)

# Configure SQLAlchemy
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['SQLALCHEMY_URI']

# Initialize database
db.init_app(app)

# Initialize API
generate_api(app, db)

# Start Flask
if __name__ == "__main__":
    app.run(host=os.environ['BIND_ADDRESS'], port=80)
