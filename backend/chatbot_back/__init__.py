import os

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_praetorian import Praetorian

app = Flask(__name__, static_url_path="", static_folder="../static")
# App settings
app.config['SECRET_KEY'] = '335f16b52741f2f8525920b30795455c'
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv(
    'DATABASE_URL', 'postgresql://postgres:1148@localhost:5432/chatbot').replace("postgres://", "postgresql://")
# Instantiate extensions
db = SQLAlchemy(app)

# Import models
from chatbot_back import models  # nopep8

db.create_all()
db.session.commit()

bcrypt = Bcrypt(app)
CORS(app)

guard = Praetorian()
guard.init_app(app, models.Cuenta)

# Import routes
from chatbot_back import routes  # nopep8
