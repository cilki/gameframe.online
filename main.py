# --------------------------------
# Flask Backend Entry-point      -
# Copyright (C) 2018 GameFrame   -
# --------------------------------

import os

from flask import Flask
from flask_cors import CORS

from data.main.vindex import VindexThread

from app.orm import db, Game
from app.api import generate_api


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

# Start the VINDEX thread
with app.app_context():
    VindexThread(Game.query.filter(Game.steam_id != None).all()).start()

# Start Flask
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=80)
