from flask import flash, redirect, request, jsonify
from flask_praetorian import auth_required, current_user
from chatbot_back import app, db, bcrypt, guard
from chatbot_back.forms import Registration, Login
from chatbot_back.models import *


@app.route('/api/register', methods=['POST'])
def registration():
    json = request.get_json()
    form = Registration.from_json(json)
    print(json, form.data, form.validate())
    if form.validate_on_submit():
        hashed_password = bcrypt.generate_password_hash(
            form.password.data).decode('utf-8')
        cuenta = Cuenta(usuario=form.username.data, password=hashed_password)
        db.session.add(cuenta)
        db.session.commit()
        cliente = Cliente(cuenta_id=cuenta.id, nombres=form.nombres.data,
                          apellidos=form.apellidos.data, email=form.email.data,
                          fecha_nacimiento=form.fecha_nacimiento.data)
        db.session.add(cliente)
        db.session.commit()
        flash(f'Account created for {form.username.data}!', 'success')
        return jsonify({"status": 200}), 200
    return jsonify({"status": 400, "errors": form.errors}), 200


@app.route('/api/refresh', methods=['POST'])
def refresh():
    old_token = request.get_data()
    new_token = guard.refresh_jwt_token(old_token)
    ret = {'access_token': new_token}
    return ret, 200


@app.route('/api/login', methods=['POST'])
def login():
    req = request.get_json(force=True)
    email = req.get("email", None)
    password = req.get("password", None)
    user = guard.authenticate(email, password)
    ret = {"access_token": guard.encode_jwt_token(user)}
    return jsonify(ret), 200


@app.route('/api/account')
@auth_required
def account():
    return current_user().__repr__(), 200
