function VideoManager(aVideoObject, aVideoId){
    this.mBasePath = "http://engine.hopclip.com/api/ajax/";
    this.mCollectionCreated = false;
    this.mVideoStoryBoard = null;
    this.mVideoObject = aVideoObject;
    this.mVideoId = aVideoId;
};

VideoManager.prototype.createIndex = function(){

    var self = this;

    function _createIndex(){

    }

    if(this.mCollectionCreated == false){
        this.getCollection(function(){
            //check story board
            if(!self.mVideoStoryBoard){
                //traer story
                self.getStoryBoard(self.mVideoId, _createIndex);
            }
        });
    }


    /*var accion = 'alta';
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
            *//*escribirEnConsola(nombre_funcion,datos_sesion);
            imprimirEnPantalla(nombre_funcion,'un_indice',indice_obj,data);*//*
        }).error(
        function(){
            console.log('Error al ejecutar la petición');
        });*/
};


VideoManager.prototype.getCollection = function(aOnCompleted){
    $.post(this.mBasePath + "traer_coleccion.php")
        .done(function( data ) {
            datos_sesion = jQuery.parseJSON(data);
            var nombre_funcion = 'Traer Coleccion (sin parametro)';
        });
}

VideoManager.prototype.getStoryBoard = function(aVideoId, aOnCompleted){

    $.post(this.mBasePath + "cargar_storyboard.php", {url_video: aVideoId})
        .done(function( data ) {
            var nombre_funcion = 'Traer storyboards (con parametro)';
            var datos_sesion = jQuery.parseJSON(data);
            aOnCompleted();
            /*escribirEnConsola(nombre_funcion,datos_sesion);
            imprimirEnPantalla(nombre_funcion,'url_video',idVideo,data);*/
        });
}
