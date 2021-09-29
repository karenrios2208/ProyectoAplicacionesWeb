
CREATE DATABASE Chatbot;
create type estado_proceso as enum ('Pendiente', 'Aceptado', 'Rechazado');

Create table cliente(
   cId int,
   nombres text NOT NULL,
   apellidos text NOT NULL,
   estado_civil text,
   dueño_vivienda bool,
   verificado bool,
   email text NOT NULL,
   num_contacto int,
   calle text,
   num_interior int,
   num_exterior int,
   colonia text,
   estado text,
   educacion text,
   fecha_nacimiento date,
   pais text,
   password text NOT NULL ,
   PRIMARY KEY( cId)
);


Create table solicitud(
   sId int,
   cId int,
   fecha_inicio date,
   fecha_cierre date,
   monto decimal,
   estado_proceso estado_proceso,
   foreign key(cId) references cliente(cId),
   PRIMARY KEY( sId)
);

