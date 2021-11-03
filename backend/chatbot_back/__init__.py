from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import LoginManager

app = Flask(__name__)
# App settings
app.config['SECRET_KEY'] = '335f16b52741f2f8525920b30795455c'
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:1148@localhost:5432/chatbot'
# Instantiate extensions
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
login_manager = LoginManager(app)
login_manager.login_view = 'login'
login_manager.login_message_category = 'info'

# Import routes
from chatbot_back import routes
