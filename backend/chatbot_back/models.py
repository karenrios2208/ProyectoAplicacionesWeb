from chatbot_back import db


class Cuenta(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    usuario = db.Column(db.Text, unique=True)
    password = db.Column(db.Text, nullable=False)
    balance = db.Column(db.Float)
    verificado = db.Column(db.Boolean)

    cliente = db.relationship('Cliente', backref='cuenta', uselist=False)
    solicitud = db.relationship('Solicitud', backref='cuenta')

    def __repr__(self):
        return f"Cuenta('{self.usuario}':'{self.cliente.email}')"

    def __id__(self):
        return self.id

    def __usuario__(self):
        return {
            "username": self.usuario,
            "email": self.cliente.email,
            "balance": self.balance,
            "nombre": self.cliente.nombres,
            "apellidos": self.cliente.apellidos
        }

    @classmethod
    def lookup(cls, email):
        return Cuenta.query.filter(Cuenta.cliente.has(email=email)).first()

    @classmethod
    def identify(cls, id):
        return cls.query.get(id)

    @property
    def identity(self):
        return self.id

    @property
    def rolenames(self):
        return ["cliente"]


class Cliente(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    cuenta_id = db.Column(db.Integer, db.ForeignKey(
        'cuenta.id', ondelete='CASCADE'), unique=True, nullable=False)
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

    def as_dict(self):
        return {
            "id": self.id,
            "cuenta_id": self.cuenta_id,
            "nombres": self.nombres,
            "apellidos": self.apellidos,
            "estado_civil": self.estado_civil,
            "dueno_vivienda": self.dueno_vivienda,
            "email": self.email,
            "num_contacto": self.num_contacto,
            "calle": self.calle,
            "num_interior": self.num_interior,
            "num_exterior": self.num_exterior,
            "colonia": self.colonia,
            "estado": self.estado,
            "educacion": self.educacion,
            "fecha_nacimiento": self.fecha_nacimiento,
            "pais": self.pais
        }


class Solicitud(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    cuenta_id = db.Column(db.Integer, db.ForeignKey(
        'cuenta.id', ondelete='CASCADE'), nullable=False)
    fecha_inicio = db.Column(db.DateTime)
    fecha_cierre = db.Column(db.DateTime)
    monto = db.Column(db.Numeric)
    estado_proceso = db.Column(db.Enum(
        'Pendiente', 'Aceptado', 'Rechazado', name='estado_proceso', create_type=False))

    def __repr__(self):
        return f"Solicitud('{self.id}', '{self.monto}')"

    def as_dict(self):
        return {
            "id": self.id,
            "state": self.estado_proceso,
            "amount": float(self.monto),
            "start_date": self.fecha_inicio,
            "close_date": self.fecha_cierre
        }
