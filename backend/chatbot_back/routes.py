from flask import render_template, url_for, flash, redirect, request
from chatbot_back import app, db, bcrypt
from chatbot_back.forms import Registration, Login
from chatbot_back.models import *
from flask_login import login_user, current_user, logout_user, login_required

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/registration', methods=['GET', 'POST'])
def registration():
    if current_user.is_authenticated:
        return redirect(url_for('home'))
    form = Registration()
    if form.validate_on_submit():
        hashed_password = bcrypt.generate_password_hash(form.password.data).decode('utf-8')
        cuenta = Cuenta(usuario=form.username.data, password=hashed_password)
        db.session.add(cuenta)
        db.session.commit()
        cliente = Cliente(cuenta_id=cuenta.id, nombres=form.nombres.data, apellidos=form.apellidos.data, email=form.email.data, fecha_nacimiento=form.fecha_nacimiento.data)
        db.session.add(cliente)
        db.session.commit()
        flash(f'Account created for {form.username.data}!', 'success')
        return redirect(url_for('login'))
    return render_template('registration.html', form=form)

@app.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('home'))
    form = Login()
    if form.validate_on_submit():
        cuenta = Cuenta.query.filter(Cuenta.cliente.has(email=form.email.data)).first()
        if cuenta and bcrypt.check_password_hash(cuenta.password, form.password.data):
            login_user(cuenta, remember=form.remember.data)
            next = request.args.get('next')
            return redirect(next) if next else redirect(url_for('home'))
        else:
            flash('Login unsuccessful! Check the submited information.', 'danger')
    return render_template('login.html', form=form)

@app.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('home'))

@app.route('/account')
@login_required
def account():
    return render_template('account.html')
