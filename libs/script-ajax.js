$(document).ready(function(){
    $("#prueba").append('<input type="button" id="disparo2" value="Traer coleccion por id">');
    $("#prueba").append('<input type="button" id="btnPuntuar" value="Puntuar Coleccion">');
    $("#prueba").append('<input type="button" id="disparo6" value="Traer storyboards por url">');
    $("#prueba").append('<input type="button" id="disparo3" value="Traer storyboards sin parametro">');
    $("#prueba").append('<input type="button" id="disparo4_alta" value="Alta usuario">');    
    $("#prueba").append('<input type="button" id="disparo4" value="Login usuario">');
    $("#prueba").append('<input type="button" id="disparo5" value="Logout usuario">');
    $("#prueba").append('<input type="button" id="btnSeguir" value="Seguir Usuario">');
    $("#prueba").append('<input type="button" id="btnModTitulo" value="Modificar Titulo">');
    $("#prueba").append('<input type="button" id="btnAltaIndice" value="Alta Indice">');
    $("#prueba").append('<input type="button" id="btnBajaIndice" value="Baja Indice">');
    $("#prueba").append('<input type="button" id="btnModificacionIndice" value="Modificacion Indice">');
    $("#prueba").append('<input type="button" id="btnModificacionPosicionIndice" value="Modificacion Posicion Indice">');    
    $("#prueba").append('<input type="button" id="btnGuardar" value="Probar Guardado">');


    $("#disparo").val("Traer coleccion sin parametro");

    traerColeccion_sinParametro();

 });

var url_ajax = "http://engine.hopclip.com/api/ajax/";

 

$(document).on("click","#disparo",traerColeccion_sinParametro);
$(document).on("click","#disparo2",traerColeccion_conParametro);
$(document).on("click","#disparo3",cargar_storyboard_sin_parametro);
$(document).on("click","#disparo6",cargar_storyboard_con_parametro);
$(document).on("click","#disparo4_alta",alta_usuario);
$(document).on("click","#btnLogin",login_usuario);
$(document).on("click","#disparo5",logout_usuario);
$(document).on("click","#btnModTitulo",modificarTitulo);
$(document).on("click","#btnAltaIndice",altaIndice);
$(document).on("click","#btnBajaIndice",bajaIndice);
$(document).on("click","#btnModificacionIndice",modificacionIndice);
$(document).on("click","#btnModificacionPosicionIndice",modificacionIndice_posicion);
$(document).on("click","#btnGuardar",guardar_coleccion);
$(document).on("click","#btnPuntuar",puntuarColeccion);
$(document).on("click","#btnSeguir",seguirUsuario);

 
function traerColeccion_sinParametro(){
  $.post("http://engine.hopclip.com/api/ajax/traer_coleccion.php")
    .done(function( data ) {
      datos_sesion = jQuery.parseJSON(data);
      var nombre_funcion = 'Traer Coleccion (sin parametro)';
      escribirEnConsola(nombre_funcion,datos_sesion); 
      imprimirEnPantalla(nombre_funcion,'','Nada',data);      
    });
}

function traerColeccion_conParametro(){
  var vid_coleccion = 350107;
  // Realizamos la petición al servidor
  $.post('http://engine.hopclip.com/api/ajax/traer_coleccion.php', {id_coleccion: vid_coleccion},
      function(data) {      
          datos_sesion = jQuery.parseJSON(data);
          var nombre_funcion = 'Traer Coleccion (con parametro)';
          escribirEnConsola(nombre_funcion,datos_sesion);
          imprimirEnPantalla(nombre_funcion,'id_coleccion',vid_coleccion,data);
          }).error(
      function(){
          console.log('Error al ejecutar la petición');
      }
  );
}

function modificarTitulo(){
  titulo = "Nuevo titulo";
  $.post('http://engine.hopclip.com/api/ajax/modificar_titulo_coleccion.php', {titulo : titulo},
      function(data) {
          var datos_sesion = jQuery.parseJSON(data);
          var nombre_funcion = 'Modificar Titulo';
          escribirEnConsola(nombre_funcion,datos_sesion);
          imprimirEnPantalla(nombre_funcion,'titulo',titulo,data);
          //console.log(data);
    }).error(
      function(){
          console.log('Error al ejecutar la petición');
      });
}

function altaIndice(){
  var accion = 'alta';
  var id_indice =-1;
  var id_video = 'uTuxpp1lb7U';
  var minuto = '00:50';
  var fuente = 'youtube';
  var descripcion_indice = 'Una descripcion';
  var url_imagen = 'http://engine.hopclip.com/storyboards/image/@uT/@ux/@pp/@1l/@b7/@U/00-00-50.jpg';
  var posicion = 1;
    var indice_obj= new Indice(accion,id_indice,fuente,id_video,minuto,descripcion_indice,url_imagen,posicion);
    $.post('../abm_indice.php', {indice : indice_obj},
      function(data) {
          var nombre_funcion = 'Alta Indice';
          var datos_sesion = jQuery.parseJSON(data);
          escribirEnConsola(nombre_funcion,datos_sesion);
          imprimirEnPantalla(nombre_funcion,'un_indice',indice_obj,data);
    }).error(
      function(){
          console.log('Error al ejecutar la petición');
      });
}

function bajaIndice(){
  var accion = 'baja';
  var id_indice =-1;
  var id_video = 'uTuxpp1lb7U';
  var minuto = '00:50';
  var fuente = 'youtube';
  var descripcion_indice = 'Una descripcion';
  var url_imagen = 'http://engine.hopclip.com/storyboards/image/@uT/@ux/@pp/@1l/@b7/@U/00-00-50.jpg';
  var posicion = 1;
    var indice_obj= new Indice(accion,id_indice,fuente,id_video,minuto,descripcion_indice,url_imagen,posicion);
    $.post('../abm_indice.php', {indice : indice_obj},
      function(data) {
          var nombre_funcion = 'Baja Indice';
          var datos_sesion = jQuery.parseJSON(data);
          escribirEnConsola(nombre_funcion,datos_sesion);
          imprimirEnPantalla(nombre_funcion,'un_indice',indice_obj,data);
    }).error(
      function(){
          console.log('Error al ejecutar la petición');
      });
}

function modificacionIndice(){
  var accion = 'modificacion';
  var id_indice =-1;
  var id_video = 'bNXpzLzjWtk';
  var minuto = '01:57';
  var fuente = 'youtube';
  var descripcion_indice = 'Otra descripcion';
  var url_imagen = 'http://engine.hopclip.com/storyboards/image/@bN/@Xp/@zL/@zj/@Wt/@k/00-02-00.jpg';
  var posicion = 1;
    var indice_obj= new Indice(accion,id_indice,fuente,id_video,minuto,descripcion_indice,url_imagen,posicion);
    $.post('../abm_indice.php', {indice : indice_obj},
      function(data) {
          var nombre_funcion = 'Modificar Indice';
          var datos_sesion = jQuery.parseJSON(data);
          escribirEnConsola(nombre_funcion,datos_sesion);
          imprimirEnPantalla(nombre_funcion,'un_indice',indice_obj,data);
    }).error(
      function(){
          console.log('Error al ejecutar la petición');
      });
}

function modificacionIndice_posicion(){
  /*----------------------------------------------------
  con el drag & drop se debe conservar la posición vieja 
  para luego enviarla al WS y así cambiar también la 
  varialbe de sesión.
  ----------------------------------------------------*/
  var posicion_vieja = 1;

  var accion = 'cambio_posicion';
  var id_indice =-1;
  var id_video = 'bNXpzLzjWtk';
  var minuto = '01:57';
  var fuente = 'youtube';
  var descripcion_indice = 'Una descripcion';
  var url_imagen = 'http://engine.hopclip.com/storyboards/image/@bN/@Xp/@zL/@zj/@Wt/@k/00-02-00.jpg';
  var posicion = 2;
    var indice_obj= new Indice(accion,id_indice,fuente,id_video,minuto,descripcion_indice,url_imagen,posicion);
    $.post('../abm_indice.php', {indice : indice_obj, posicion_vieja: posicion_vieja},
      function(data) {
          var nombre_funcion = 'Modificar Posicion Indice';
          var datos_sesion = jQuery.parseJSON(data);
          escribirEnConsola(nombre_funcion,datos_sesion);
          imprimirEnPantalla(nombre_funcion,'un_indice y posición vieja',indice_obj,data);
    }).error(
      function(){
          console.log('Error al ejecutar la petición');
      });
}

function alta_usuario(){
  var vusername = "fer_PRUEBA";
  var vnombre_persona = "fer_PRUEBA"
  var vapellido_persona = "m_PRUEBA";
  var vemail = "fernando.marichal3@evimed.net";
  var vpassword = "qwerty";
  var un_usuario = new Usuario(vusername,vnombre_persona,vapellido_persona,vemail,vpassword);
  $.post('http://engine.hopclip.com/api/ajax/alta_usuario.php', {usuario: un_usuario},
      function(data) {
          var nombre_funcion = 'Alta de Usuario';
          var datos_sesion = jQuery.parseJSON(data);
          escribirEnConsola(nombre_funcion,datos_sesion);
          imprimirEnPantalla(nombre_funcion,'un_usuario',un_usuario,data);
      }).error(
        function(){
          console.log('Error al ejecutar la petición');
      }
  );

}

function login_usuario(){
  var vusername = "hop_clip";
  var vemail = "fernando.marichal@evimed.net";
  /*----------------------------------------------------
  funciona tanto con el nombre de usuario como con 
  el mail, ahora está puesto para que tome el username
  ----------------------------------------------------*/
  vusername_o_email = vusername;
  var vpassword = "qwerty";
  var un_usuario = new Usuario(vusername_o_email,"","",vusername_o_email,vpassword);
  //var un_usuarioJSON = JSON.stringify(un_usuario);

  // Realizamos la petición al servidor
  $.post('http://engine.hopclip.com/api/ajax/login_usuario.php', {usuario: un_usuario},
      function(data) {
          var nombre_funcion = 'Login de Usuario';
          var datos_sesion = jQuery.parseJSON(data);
          escribirEnConsola(nombre_funcion,datos_sesion);
          imprimirEnPantalla(nombre_funcion,'un_usuario',un_usuario,data);
      }).error(
        function(){
          console.log('Error al ejecutar la petición');
      }
  );

}

function logout_usuario(){
  $.post('http://engine.hopclip.com/api/ajax/logout_usuario.php',
      function(data) {
          var nombre_funcion = 'Logout de Usuario';
          var datos_sesion = 'error!';
          var retornado = parseInt(data);
          if(retornado == 1){
              datos_sesion = "El logout fue exitoso!";
          }
          escribirEnConsola(nombre_funcion,datos_sesion);
          imprimirEnPantalla(nombre_funcion,'','Nada',data);         
      }).error(
        function(){
          console.log('Error al ejecutar la petición');
      }
  );

}

function cargar_storyboard_sin_parametro(){
  $.post("http://engine.hopclip.com/api/ajax/cargar_storyboard.php")
    .done(function( data ) {
      var nombre_funcion = 'Traer storyboards (sin parametro)';
      if(data != "null"){
          var datos_sesion = jQuery.parseJSON(data);
          escribirEnConsola(nombre_funcion,datos_sesion);
          imprimirEnPantalla(nombre_funcion,'','Nada',data);
      }
      else{
        var datos_sesion = 'No retorna nada porque la variable de sesión todavía no está cargada o expiró';
        escribirEnConsola(nombre_funcion,datos_sesion);
        imprimirEnPantalla(nombre_funcion,'','Nada',datos_sesion);
      }
    });
}

function cargar_storyboard_con_parametro(){
  var idVideo = "fbX3uW6GQAc";
  $.post("http://engine.hopclip.com/api/ajax/cargar_storyboard.php", {url_video: idVideo})
    .done(function( data ) {
      var nombre_funcion = 'Traer storyboards (con parametro)';
      var datos_sesion = jQuery.parseJSON(data);
      escribirEnConsola(nombre_funcion,datos_sesion);
      imprimirEnPantalla(nombre_funcion,'url_video',idVideo,data);      
    });
}

function guardar_coleccion(){
  $.post('http://engine.hopclip.com/api/ajax/salvar.php',
    function(data) {
      var nombre_funcion = 'Guardar coleccion';
      if(data != 0){
        datos_sesion = jQuery.parseJSON(data);
      }
      else{
        datos_sesion = "No hay una coleccion cargada";
        data = "Retorna 0 cuando hay error o no hay una coleccion cargada";
      }
      escribirEnConsola(nombre_funcion,datos_sesion);
      imprimirEnPantalla(nombre_funcion,'','nada (usa la variable de sesion que tiene la coleccion',data);  
      

    }).error(
      function(){
          console.log('Error al ejecutar la petición');
      }); 
}

function puntuarColeccion(){
  puntos = 5;
  $.post('http://engine.hopclip.com/api/ajax/puntuar_coleccion.php', {puntaje : puntos},
      function(data) {
        var nombre_funcion = 'Puntuar coleccion';
        escribirEnConsola(nombre_funcion,data);
        imprimirEnPantalla(nombre_funcion,'envía los puntos, la coleccion y el usuario ya los tiene en la variable de sesion',puntos,data);  
    }).error(
      function(){
          console.log('Error al ejecutar la petición');
      });
}

function seguirUsuario(){
  $.post('http://engine.hopclip.com/api/ajax/seguir_usuario.php',
      function(data) {
        var nombre_funcion = 'Seguir Usuario';
        escribirEnConsola(nombre_funcion,data);
        imprimirEnPantalla(nombre_funcion,'','No envía nada, la coleccion y el usuario ya los tiene en la variable de sesion',data); 
    }).error(
      function(){
          console.log('Error al ejecutar la petición');
      });
}


/*-------------------------------------------------------------------------------------------------------------------
MANEJO DE RETORNO AJAX
-------------------------------------------------------------------------------------------------------------------*/
function escribirEnConsola(nombre_funcion,datos){
  console.log('');
  console.log('---------------------- '+nombre_funcion+' ----------------------');
  console.log(datos);  
  console.log('');
}

function imprimirEnPantalla(nombre_funcion,nombre_parametro_recibe,recibe,datos){
  var imprimir = '<div style="border: 2px solid black;margin: 40px;padding: 40px;"><h3>'+nombre_funcion+'</h3><span><strong>Recibe '+nombre_parametro_recibe+'</strong>: '+ recibe + '</span><br/><span><strong>Retorno</strong>: '+datos+'</span></div><br/>';
  $('#retorno').append(imprimir);
}


/*-------------------------------------------------------------------------------------------------------------------
OBJETOS
-------------------------------------------------------------------------------------------------------------------*/
function Usuario(username,nombre,apellido,mail,password)   
{
    this.username = username;
    this.nombre = nombre;
    this.apellido = apellido;
    this.mail = mail;
    this.password = password;
}

function Indice(accion,id_indice,fuente,url_video,minuto,descripcion_indice,url_imagen,posicion){
  this.accion=accion;
  this.id_indice=id_indice;
  this.fuente=fuente;
  this.url_video=url_video;
  this.minuto=minuto;
  this.descripcion_indice=descripcion_indice;
  this.url_imagen=url_imagen;
  this.posicion=posicion;
}