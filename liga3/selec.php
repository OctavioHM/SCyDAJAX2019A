<?php

 require_once 'LIGA3/LIGA.php';
 
 // Personalizo una conexión a la base de datos (servidor, usuario, contraseña, schema)
 BD('localhost', 'root', '', 'base');
 
 // Configuramos la entidad a usar
 $tabla = 'usuarios';
 $liga  = LIGA($tabla);
 $cual   = !empty($_POST['cual']) ? $_POST['cual'] : '';
 $select = HTML::selector($liga, 1, array('select'=>array('name'=>'cual', 'id'=>'algocual'),
							 'option'=>array('value'=>'@[0]'),
							 "option@si('$cual'=='@[0]')"=>array('selected'=>'selected')), array('depende'=>$liga),false
			   );
 
 
 echo $select;