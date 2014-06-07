function VideoManager(){
    this.mBasePath = "http://engine.hopclip.com/api/ajax/";
};

VideoManager.prototype.createIndex = function(){
    var self = this;
    var accion = 'alta';
    var id_indice =-1;
    var id_video = 'WPSimpleYouTube_41c983a8fadee8d5b417f38d9070e0f1';
    var minuto = '00:50';
    var fuente = 'youtube';
    var descripcion_indice = 'Una descripcion';
    var url_imagen = 'http://engine.hopclip.com/storyboards/image/@uT/@ux/@pp/@1l/@b7/@U/00-00-50.jpg';
    var posicion = 1;
    var indice_obj=  {accion:accion, id_indice:id_indice, fuente:fuente, url_video:id_video, minuto:minuto, descripcion_indice:descripcion_indice, url_imagen:url_imagen, posicion:posicion};
    $.post(this.mBasePath + 'abm_indice.php', {indice : indice_obj},
        function(data) {
            var nombre_funcion = 'Alta Indice';
            var datos_sesion = jQuery.parseJSON(data);
            self.getCollection();
            /*escribirEnConsola(nombre_funcion,datos_sesion);
            imprimirEnPantalla(nombre_funcion,'un_indice',indice_obj,data);*/
        }).error(
        function(){
            console.log('Error al ejecutar la petición');
        });
};


VideoManager.prototype.getCollection = function(){
    $.post(this.mBasePath + "traer_coleccion.php")
        .done(function( data ) {
            datos_sesion = jQuery.parseJSON(data);
            var nombre_funcion = 'Traer Coleccion (sin parametro)';
        });
}

