$(function(){
    var config = {
        func : function(resp){
            
            if(resp != 1){
                $.liga('mensaje', 'NO ES POSIBLE REALIZAR LA ACCION');
            }else{
                $('#divTabla').load('actualizar.php');
                $('#algocual').load('selec.php');
                
            }
        }
    };
    $('form').liga('AJAX', config);
});