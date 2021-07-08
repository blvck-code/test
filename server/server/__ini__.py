from flask import Flask, make_response, jsonify
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///example.sqlite"
db = SQLAlchemy(app)

@app.route('/')
def hello():
    return make_response(jsonify({'status':' success'}))