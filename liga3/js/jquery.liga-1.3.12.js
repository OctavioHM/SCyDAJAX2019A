;(function($,window,document,undefined){var pluginName="liga";zIndexLIGAjs=1000;function bloqueador(){return $('<div />').addClass('bloquea').css({width:'110%',height:'110%',margin:'-15px',position:'fixed','z-index':zIndexLIGAjs++,opacity:'0.6',filter:'alpha(opacity = 60)'}).attr('onselectstart','return false;').attr('onmousedown','return false;')}function centrar(ven){var iz=$(window).width()/2;var ar=$(window).height()/2;var msjIz=ven.outerWidth()/2;var msjAr=ven.outerHeight()/2;if((msjIz*2)>((iz*2)*0.5)){ven.css({position:'fixed',left:5,top:5,right:5,'z-index':(zIndexLIGAjs++)+500})}else{ven.css({position:'fixed',left:iz-msjIz,top:(ar-msjAr)*0.4,'z-index':(zIndexLIGAjs++)+500})}}function validar(input,regla,forma){var valido=true;var valor=input.val();if(window.FormData){if(input.attr('type')=='file'){var campo=input.get(0);var files=campo.files;for(var i=0;i<files.length;i++){if(files[i].name&&files[i].size){if((regla['tamin']&&files[i].size<regla['tamin']*1048576)||(regla['tamax']&&files[i].size>regla['tamax']*1048576)){return false}var ext=files[i].name.substring(files[i].name.lastIndexOf('.')+1);if(regla['patron']){var pat=regla['patron']['length']?regla['patron']:[regla['patron']];var val=false;for(var j in pat){if(pat[j].test(ext)||(files[i].type&&pat[j].test(files[i].type))){val=true}}if(!val){return false}}}}return true}}if(regla['patron']){var pat=regla['patron']['length']?regla['patron']:[regla['patron']];var val=false;for(var i in pat){if(pat[i].test(valor)){val=true}}if(!val){valido=false}}if(regla['mayor']){if(isNaN(valor)||valor<=regla['mayor']){valido=false}}if(regla['menor']){if(isNaN(valor)||valor>=regla['menor']){valido=false}}if(regla['cond']){var campos=forma.serializeArray();var form={};for(var i in campos){form[campos[i]['name']]=campos[i]['value']}try{valido=eval('('+regla['cond']+')')}catch(e){$.error('Error al evaluar la condición "'+regla['cond']+'"');valido=false}}return valido}function obj2Hash(cad){var hash=(cad)?cad:parent.location.hash;hash=(hash.indexOf('#')==0)?hash.substring(1):hash;hash=hash.split('//');var objHash={};for(var i in hash){var datos=hash[i].split('/');if(datos[0]&&datos[1]){var id=datos[0];var vars=datos[1];for(var j=2;j<datos.length;j++){vars+='/'+datos[j]}objHash[id]=vars}}return objHash}function procesarHash(){var objHash=obj2Hash();var recep=$('body').data('historialLIGA');for(var id in recep){if(objHash[id]){var rece=$('#'+id).data('historialLIGA');if(rece['actual']!=objHash[id]){cargar(id,rece['url'],objHash[id],rece['func']);rece['actual']=objHash[id];$('#'+id).data('historialLIGA',rece)}}else{var hist=$('#'+id).data('historialLIGA');if(hist['actual']!=hist['param']){cargar(id,hist['url'],hist['param'],hist['func']);hist['actual']=hist['param'];$('#'+id).data('historialLIGA',hist)}}}}function cargar(id,url,vars,func){var cont=$('#'+id);var hist=cont.data('historialLIGA');var cach=cont.data(vars);if(hist['cache']&&cach){cont.html(cach);if(func){func(resp)}}else{cont.liga('mensaje',{msj:'<span class="ui-icon ui-icon-info" style="float: left; margin-right: .3em;"></span> Cargando',seg:0,btn:false});if(vars.indexOf(':')===0){url=encodeURI(vars.substring(1));vars=''}cont.load(url,encodeURI(vars),function(resp){if(hist['cache']){cont.data((vars)?vars:decodeURI(':'+url),resp)}if(func){func(resp)}})}}function Plugin(method,element,options){this.method=method;this.element=element;this.options=options;this._name=pluginName;if(this[method]){return this[method](this.element,this.options)}}Plugin.prototype={alerta:function(el,options){if(typeof options!=='object')options={msj:String(options)};var settings=$.extend({msj:' ',tit:'¡Atención!','class':'alerta',vel:'fast',btn:'Cerrar',fijo:true,func:function(){}},options);var div=bloqueador();$('body').addClass('sin-scroll');$('body').prepend(div);var tit=$('<div />').addClass('titAlerta ui-widget-header').html('<span class="ui-icon ui-icon-notice" style="float: left; margin-right: .3em;"></span>'+settings['tit']);var btn=$('<button />').addClass('cerrarMsjAlerta btn1').html(settings['btn']).click(function(e){$(this).parent().slideUp(settings['vel'],function(){if($('.bloquea').length==1){$('body').removeClass('sin-scroll')}settings['func']();div.remove();$(this).remove()});e.preventDefault()});div.click(function(){btn.click()});var msj=$('<div />').addClass('contAlerta').html(settings['msj']);var ven=$('<div />').addClass(settings['class']+' ui-widget-content').prepend(tit,msj,btn);$('body').prepend(ven);$('.contAlerta').css('user-select','text');centrar(ven);ven.slideDown(settings['vel'],function(){btn.focus();centrar(ven);$(window).resize(function(){centrar(ven)});if($.isFunction($.fn.draggable)){ven.draggable({handle:'.titAlerta',scroll:false,revert:settings['fijo']});$('.titAlerta',ven).css({cursor:'move'}).disableSelection()}});return ven},pregunta:function(el,options){if(typeof options!=='object')options={msj:String(options)};var settings=$.extend({msj:' ',tit:'Confirmación','class':'alerta',vel:'fast',btnS:'Sí',btnN:'No',fijo:true,funcS:function(){},funcN:function(){}},options);var div=bloqueador();$('body').addClass('sin-scroll');$('body').prepend(div);var tit=$('<div />').addClass('titAlerta ui-widget-header').html('<span class="ui-icon ui-icon-help" style="float: left; margin-right: .3em;"></span>'+settings['tit']);var btS=$('<button />').addClass('cerrarMsjAlerta btn1').html(settings['btnS']).click(function(e){settings['funcS']();$(this).parent().slideUp(settings['vel'],function(){$('body').removeClass('sin-scroll');div.remove();$(this).remove()});e.preventDefault()});var btN=$('<button />').addClass('cerrarMsjAlerta btn2').html(settings['btnN']).click(function(e){settings['funcN']();$(this).parent().slideUp(settings['vel'],function(){if($('.bloquea').length==1){$('body').removeClass('sin-scroll')}div.remove();$(this).remove()});e.preventDefault()});div.click(function(){btN.click()});var msj=$('<div />').addClass('contAlerta').html(settings['msj']);var ven=$('<div />').addClass(settings['class']+' ui-widget-content').prepend(tit,msj,btS,btN);$('body').prepend(ven);$('.contAlerta').css('user-select','text');centrar(ven);ven.slideDown(settings['vel'],function(){btN.focus();$(window).resize(function(){centrar(ven)});if($.isFunction($.fn.draggable)){ven.draggable({handle:'.titAlerta',scroll:false,revert:settings['fijo']});$('.titAlerta',ven).css({cursor:'move'}).disableSelection()}});return ven},memoria:function(el,options){var llave=(typeof options=='string')?options:options[0];var valor=((typeof options=='object'&&options[1])||options[1]==null)?options[1]:undefined;var expira=(typeof options=='object'&&options[2])?options[2]:undefined;if(typeof llave==='string'&&llave!==''){if(window.localStorage&&expira===undefined){if(valor===null){window.localStorage.removeItem(llave);return true}if(valor===undefined)return window.localStorage.getItem(llave);if(valor!==null&&valor!==undefined)window.localStorage.setItem(llave,valor)}else{if(valor){var fecha=new Date();expira=!isNaN(expira)?expira:365;fecha.setTime(fecha.getTime()+(expira*24*60*60*1000));expira='; expires='+fecha.toGMTString();document.cookie=llave+"="+valor+expira+"; path=/"}else{if(valor===null){return $.liga('guardar',llave,' ',-1)}llave=llave+'=';var ck=document.cookie.split(';');for(var i=0;i<ck.length;i++){var c=ck[i];while(c.charAt(0)==' ')c=c.substring(1,c.length);if(c.indexOf(llave)==0)return c.substring(llave.length,c.length)}return null}}return valor}return false},notificacion:function(el,options){if(typeof options!=='object')options={msj:String(options)};var settings=$.extend({msj:' ',tit:'Notificación',img:'http://4.bp.blogspot.com/-6hx-qdNb8XU/T4nW4Q-Qf4I/AAAAAAAAAWs/IY0z6IPpbyQ/s200/LIGA.PNG',seg:10,alt:'body',func:function(){},funClic:function(){}},options);if(!('Notification'in window)&&!window.webkitNotifications){settings['msj']='<img src="'+settings['img']+'" width="35" height="35" style="float: left;" /> '+settings['msj'];return $(settings['alt']).liga('mensaje',settings)}var per=('Notification'in window)?Notification.permission:window.webkitNotifications.checkPermission();if(per==2||per=='denied'){settings['msj']='<img src="'+settings['img']+'" width="35" height="35" style="float: left;" /> '+settings['msj'];return $(settings['alt']).liga('mensaje',settings)}if(per>0||per=='default'){if('Notification'in window){Notification.requestPermission(function(){return $.liga('notificacion',settings)})}else{window.webkitNotifications.requestPermission(function(){return $.liga('notificacion',settings)})}}else{var notif;if('Notification'in window){notif=new Notification(settings['tit'],{body:settings['msj'],icon:settings['img']});notif.onerror=function(){$(settings['alt']).liga('mensaje',settings)};if(settings['seg']){setTimeout(function(){notif.close()},settings['seg']*1000)}}else{notif=window.webkitNotifications.createNotification(settings['img'],settings['tit'],settings['msj']);notif.show();if(settings['seg']){setTimeout(function(){notif.cancel()},settings['seg']*1000)}}notif.onclose=settings['func'];notif.onclick=settings['funClic']}return notif},mensaje:function(el,options){if(typeof options!=='object')options={msj:String(options)};var settings=$.extend({msj:' ',tit:'Mensaje','class':'msj1 ui-state-highlight',vel:'fast',seg:10,btn:'&nbsp;X&nbsp;',conservar:true,func:function(){}},options);var btn='';if(settings['btn']){btn=$('<button />').addClass('cerrarMsj').html(settings['btn']).click(function(e){$(this).parent().slideUp(settings['vel'],function(){settings['func']();$(this).remove()});e.preventDefault()}).attr('title','Cerrar mensaje')}var cont=$('<div />').addClass(settings['class']+' ui-widget-content').attr('title',settings['tit']).css({display:'none'}).append(btn,settings['msj']);var $el=$(el);if($el.is('body')){var div=$('#LIGADIVFLOTANTE');if(div.length==0){div=$('<div />').attr('id','LIGADIVFLOTANTE').css({width:'400px',position:'fixed','left':'50%','z-index':(zIndexLIGAjs++)-100});$('body').prepend(div.css({position:'fixed','margin-left':'-200px'}))}div.prepend(cont)}else{$el.prepend(cont)}cont.fadeIn(settings['vel'],function(){if(settings['btn']){btn.focus()}if(settings['seg']){var obj=$(this);var idt=setTimeout(function(){obj.fadeOut(settings['vel'],function(){settings['func']();$(this).remove()})},settings['seg']*1000);if(settings['conservar']){obj.mousemove(function(){clearTimeout(idt)})}}})},AJAX:function(el,options){var settings=$.extend({url:'',reg:{},fil:{},seg:10,func:function(resp){settings['mensajes'](resp)},error:function(msj,input,form,quitar){$('.error',input.parent()).remove();if(!quitar){var span=$('<span />').addClass('error ui-widget-content ui-state-error').css({display:'none'}).html('<span class="ui-icon ui-icon-alert" style="float: left; margin-right: .3em;"></span>'+msj);input.parent().append(span.fadeIn('medium'));input.one('change.liga',function(){var nom=input.attr('name');if(settings['reg'][nom]['requerido']||input.val()!==''||settings['reg'][nom]['numin']){if(validar(input,settings['reg'][nom],form)===true){settings['error'](msj,input,form,true)}else{settings['error'](msj,input,form,false)}}else{settings['error'](msj,input,form,true)}})}},reset:function(forma,e){$('.error',forma).fadeOut('fast',function(){$(this).remove()})},mensajes:function(conf){$('body').liga('mensaje',conf)}},options);var forma=$(el);var formh=el;settings['url']=(forma.attr('action'))?forma.attr('action'):settings['url'];forma.on('submit.liga',function(e){forma.bind('reset.liga',function(e){settings['reset'](forma,e)});var campos=forma.serializeArray();var validos=true;var form={};for(var i in campos){var campo=campos[i]['name'];var valor=campos[i]['value'];var input=$('[name="'+campo+'"]',forma);input.unbind('change.liga');if(settings['reg'][campo]){var regla=settings['reg'][campo];var msj=(regla['msj'])?regla['msj']:'El campo '+campo+' no es válido';if(regla['requerido']){if(valor!==''){if(!validar(input,regla,forma)){settings['error'](msj,input,forma);validos=false}}else{settings['error'](msj,input,forma);validos=false}}else{if(valor!==''){if(!validar(input,regla,forma)){settings['error'](msj,input,forma);validos=false}}}}if(settings['fil'][campo]){form[campo]=valor;formh[campo].value=settings['fil'][campo](valor)}}var archivos=false;var campos=$(':file',forma);var conAPI=true;if(window.FormData){campos.each(function(){var campo=this;$(campo).unbind('change.liga');if(settings['reg'][campo.name]){var regla=settings['reg'][campo.name];var msj=(regla['msj'])?regla['msj']:'Archivo(s) inválido(s) en el campo '+campo.name;var files=this.files;if(files.length>0){archivos=true;if(!validar($(campo),regla,forma)){settings['error'](msj,$(campo),forma);validos=false}}else{if(regla['numin']&&files.length<regla['numin']){settings['error'](msj,$(campo),forma);validos=false}}}})}else if(campos.length>0){conAPI=false}if(validos){$('.error',forma).remove();var datos=forma.serialize();if(!forma.data(datos)){settings['mensajes']({msj:'<span class="ui-icon ui-icon-info" style="float: left; margin-right: .3em;"></span> Enviando información al servidor',seg:2,conservar:false});forma.data(datos,true);if(conAPI){var metodo=forma.attr('method')?forma.attr('method'):'GET';var formD;var config={url:settings['url'],timeout:settings['seg']*1000,type:metodo};if(archivos&&window.FormData){formD=new FormData(formh);settings['mensajes']({msj:'<span class="ui-icon ui-icon-info" style="float: left; margin-right: .3em;"></span> Subiendo <progress id="LIGAprogress"><em id="progreso"></em></progress>',seg:5,conservar:true});config['contentType']=false;config['processData']=false;config['cache']=false;config['xhr']=function(){var xhr=$.ajaxSettings.xhr();if(xhr.upload){var barra=$('progress#LIGAprogress');var prog=$('#progreso');xhr.upload.addEventListener('progress',function(e){if(e.lengthComputable){barra.attr({value:e.loaded,max:e.total});prog.text(e.loaded+' de '+e.total);if(e.loaded>=e.total){barra.parent().fadeOut(function(){$(this).remove()})}}},false)}return xhr}}else{formD=$(formh).serialize()}config['data']=formD;$.ajax(config).always(function(resp){forma.removeData(datos)}).done(function(resp){settings['func'](resp)}).fail(function(resp,err,error){var msjs={'Not Found':'Recurso no encontrado en el servidor','timeout':'Se superó el tiempo de espera'};var msj=(msjs[error])?msjs[error]:'Error en el servidor';settings['func']({msj:'<span class="ui-icon ui-icon-alert" style="float: left; margin-right: .3em;"></span>'+msj+', inténtelo de nuevo más tarde',seg:0,tit:err,'class':'msj2 ui-state-error'})})}else{var iframe=$('<iframe />').css({width:0,height:0,display:'none'}).attr('name','LIGAreceptor');$('body').append(iframe);forma.attr('target','LIGAreceptor').attr('enctype','multipart/form-data');forma.unbind('submit.liga');forma.submit();iframe.load(function(){var resp=iframe.contents();settings['func']($('body',resp).html());forma.removeData(datos);forma.liga('AJAX',settings)})}}else{settings['mensajes']({msj:'<span class="ui-icon ui-icon-alert" style="float: left; margin-right: .3em;"></span> Procesando la información, espere por favor',seg:2,conservar:false,'class':'msj2 ui-state-error'})}}for(var campo in settings['fil']){if(formh[campo]){formh[campo].value=form[campo]}}e.preventDefault()})},historial:function(el,options){if(typeof options!=='object')return this;var recep={};for(var id in options){options[id]['actual']='';$('#'+id).data('historialLIGA',options[id]);recep[id]=true}$('body').data('historialLIGA',recep);procesarHash();window.onhashchange=procesarHash;return this},cargar:function(el,options){if(typeof options!=='string')return this;var delHash=obj2Hash();var carHash=obj2Hash(options);var hash='';for(var id in delHash){if(!carHash[id]||(carHash[id]==delHash[id])){hash+=(hash=='')?id+'/'+delHash[id]:'//'+id+'/'+delHash[id]}}for(var id in carHash){if(carHash[id]!=delHash[id]){hash+=(hash=='')?id+'/'+carHash[id]:'//'+id+'/'+carHash[id]}}parent.location.href='#'+hash;return this},actualizar:function(el,options){if(typeof options!=='string')return this;var id=(options.indexOf('/')>-1)?options.substring(0,options.indexOf('/')):options;var hs=(options.indexOf('/')>-1)?options.substring(options.indexOf('/')+1):false;var ob=$('#'+id);var hi=ob.data('historialLIGA');if(hi){if(hs){ob.removeData(hs)}else{ob.removeData();ob.data('historialLIGA',hi)}}return this}};$[pluginName]=function(method,options){var t=document.body;if(!$.data(t,pluginName)){$.data(t,pluginName,new Plugin(undefined,$,options))}return $.data(t,pluginName)[method]($,options)};$.fn[pluginName]=function(method,options){return this.each(function(){if(!$.data(this,pluginName)){$.data(this,pluginName,new Plugin(method,this,options))}else{$.data(this,pluginName)[method](this,options)}})}})(jQuery,window,document);