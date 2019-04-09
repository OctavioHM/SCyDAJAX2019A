<?php

 require_once 'LIGA3/LIGA.php';
 
 // Personalizo una conexión a la base de datos (servidor, usuario, contraseña, schema)
 BD('localhost', 'root', '', 'base');
 
 // Configuramos la entidad a usar
 $tabla = 'usuarios';
 $liga  = LIGA($tabla);
  
  $cols = array('*', '-contraseña', 'acción'=>'<a href="?borrar=@[0]">Borrar</a>');
  $join = array('depende'=>$liga);
  $pie  = '<th colspan="@[numCols]">Total de instancias: @[numReg]</th>';

  HTML::tabla($liga, 'USUARIOS CREADOS ', $cols, true, $join, $pie);