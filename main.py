import os
from flask import Flask, render_template

# Setup Flask
app = Flask(__name__)

# Configure SQLAlchemy
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['SQLALCHEMY_URI']

# Initialize database
from app.orm import db
db.init_app(app)

# Initialize API
from app.api import generate_api
generate_api(app, db)


@app.route("/", defaults={'path': ''})
@app.route("/<path:path>")
def index(path):
    return render_template('index.html')


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=80)
