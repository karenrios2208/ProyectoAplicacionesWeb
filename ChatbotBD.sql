
Create database Chatbot;
Create type estado_proceso as enum ('Pendiente', 'Aceptado', 'Rechazado');

Create table cliente(
   cliente_id SERIAL,
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
   primary key (cliente_id)
);


Create table solicitud(
   solicitud_id SERIAL,
   cliente_id int,
   fecha_inicio date,
   fecha_cierre date,
   monto decimal,
   estado_proceso estado_proceso,
   foreign key(cliente_id) references cliente(cliente_id),
   primary key (solicitud_id)
);

