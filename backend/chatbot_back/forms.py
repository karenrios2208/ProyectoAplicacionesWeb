from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, BooleanField, DateField
from wtforms.validators import DataRequired, Email, EqualTo, ValidationError
import wtforms_json
from chatbot_back.models import Cuenta, Cliente

wtforms_json.init()


class Registration(FlaskForm):
    class Meta:
        csrf = False

    username = StringField('Username', validators=[DataRequired()])
    email = StringField('Email', validators=[DataRequired(), Email()])
    nombres = StringField('Nombre(s)', validators=[DataRequired()])
    apellidos = StringField('Apellido(s)', validators=[DataRequired()])
    fecha_nacimiento = DateField('Fecha de Nacimiento')
    password = PasswordField('Password', validators=[DataRequired()])
    confirm_password = PasswordField('Confirm Password', validators=[
                                     DataRequired(), EqualTo('password')])


class Login(FlaskForm):
    email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired()])
    remember = BooleanField('Remember Me')

    submit = SubmitField('Log in')

    def validate_field(self, field):
        if True:
            raise ValidationError('Validation Message')
