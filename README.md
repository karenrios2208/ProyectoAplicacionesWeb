# Proyecto de Aplicaciones Web
## Requerimientos:
YO YO YO!

Para instalar el modulo de Kommunicate y poder usar el chatbot debes hacer: 

npm install @kommunicate/kommunicate-chatbot-plugin --force

#El --force es necesario :^)

### Back-End:
Los siguientes programas deben de estar instalados en el servidor donde se correrá el backend:
- PostgreSQL
- Python (Preferiblemente la versión más reciente)
- Las siguientes paqueterías de Python:
  - flask
  - flask-sqlalchemy
  - flask-bcrypt
  - flask-login
  - flask_wtf
  - wtforms
  - psycopg2-binary
***

## Instrucciones para correr el Backend:
Antes de correr el backend es necesario asegurarse de que exista una base de datos de PostgreSQL en el servidor.

Las credenciales utilizadas son las default (`postgres` y `1148`, respectivamente) y la dirección de la base de datos es `localhost:5432` por convención. El nombre default escogido para la base de datos es: `chatbot`.

Todos los datos anteriormente mencionados  se encuentran especificados como URI de la aplicación en la **línea 9** del archivo [`__init__.py`](backend/chatbot_back/__init__.py).

Si se desea cambiar la información a una base de datos personalizada, es necesario cambiar la ya mencionada línea a un *string* con el siguiente formato:
>postgresql://[user]:[password]@[network address]:[port]/[database name]

Para correr el backend, simplemente se debe de correr el script [`run.py`](backend/run.py)
