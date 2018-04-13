# --------------------------------
# Flask Backend Entry-point      -
# Copyright (C) 2018 GameFrame   -
# --------------------------------

import os
import sys
sys.path.append(os.path.abspath('data/main'))

from flask import Flask
from flask_cors import CORS

from app.orm import db
from app.api import generate_api


# Initialize Flask
app = Flask(__name__)
CORS(app)

# Configure SQLAlchemy
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_BINDS'] = {'gameframe': os.environ['SQLALCHEMY_URI']}

# Initialize database
db.init_app(app)

# Initialize API
generate_api(app, db)

# Start Flask
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=80, debug=False, use_reloader=False)
