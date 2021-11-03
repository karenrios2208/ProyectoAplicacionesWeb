from chatbot_back import db, login_manager
from flask_login import UserMixin

# Authentication manager
@login_manager.user_loader
def load_user(cuenta_id):
    return Cuenta.query.get(int(cuenta_id))

# Cuenta object, inherits from UserMixin to help login manager
class Cuenta(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    usuario = db.Column(db.Text, unique=True)
    password = db.Column(db.Text, nullable=False)
    balance = db.Column(db.Float)
    verificado = db.Column(db.Boolean)

    cliente = db.relationship('Cliente', backref='cuenta', uselist=False)
    solicitud = db.relationship('Solicitud', backref='cuenta')

    def __repr__(self):
        return f"Cuenta('{self.usuario}':'{self.cliente.email}')"

class Cliente(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    cuenta_id = db.Column(db.Integer, db.ForeignKey('cuenta.id', ondelete='CASCADE'), unique=True, nullable=False)
    nombres = db.Column(db.Text, nullable=False)
    apellidos = db.Column(db.Text, nullable=False)
    estado_civil = db.Column(db.Text)
    dueno_vivienda = db.Column(db.Boolean)
    email = db.Column(db.Text, nullable=False)
    num_contacto = db.Column(db.Integer, autoincrement=False)
    calle = db.Column(db.Text)
    num_interior = db.Column(db.Integer, autoincrement=False)
    num_exterior = db.Column(db.Integer, autoincrement=False)
    colonia = db.Column(db.Text)
    estado = db.Column(db.Text)
    educacion = db.Column(db.Text)
    fecha_nacimiento = db.Column(db.DateTime, nullable=False)
    pais = db.Column(db.Text)

    def __repr__(self):
        return f"Cliente('{self.nombres}', '{self.apellidos}')"

class Solicitud(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    cuenta_id = db.Column(db.Integer, db.ForeignKey('cuenta.id', ondelete='CASCADE'), unique=True, nullable=False)
    fecha_inicio = db.Column(db.DateTime)
    fecha_cierre = db.Column(db.DateTime)
    monto = db.Column(db.Numeric)
    estado_proceso = db.Column(db.Enum('Pendiente', 'Aceptado', 'Rechazado', name='estado_proceso', create_type=False))

    def __repr__(self):
        return f"Solicitud('{self.id}', '{self.monto}')"
