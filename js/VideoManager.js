function VideoManager(aVideoObject, aVideoId){
    this.mBasePath = "http://engine.hopclip.com/api/ajax/";
    this.mCollectionCreated = false;
    this.mVideoStoryBoard = null;
    this.mVideoObject = aVideoObject;
    this.mVideoId = aVideoId;
};

VideoManager.prototype.createIndex = function(aTitle, onCompleted){

    var self = this;
    var aCurrentTime = self.getCurrentTime();

    function _createIndex(){


        var aImage = self.findClosestImage(aCurrentTime);

        /*var accion = 'alta';
         var id_indice =-1;
         var id_video = 'WPSimpleYouTube_41c983a8fadee8d5b417f38d9070e0f1';
         var minuto = '00:50';
         var fuente = 'youtube';
         var descripcion_indice = 'Una descripcion';
         var url_imagen = 'http://engine.hopclip.com/storyboards/image/@uT/@ux/@pp/@1l/@b7/@U/00-00-50.jpg';
         var posicion = 1;*/
         var indice_obj=  {accion:'alta', id_indice:-1, fuente:'youtube', url_video:self.mVideoId, minuto:self.secondsToMinutes(aCurrentTime), descripcion_indice:aTitle, url_imagen:aImage, posicion:1};

         onCompleted(indice_obj);

         $.post(self.mBasePath + 'abm_indice.php', {indice : indice_obj},
            function(data) {
                var nombre_funcion = 'Alta Indice';
                var datos_sesion = jQuery.parseJSON(data);

                /*escribirEnConsola(nombre_funcion,datos_sesion);
                imprimirEnPantalla(nombre_funcion,'un_indice',indice_obj,data);*/
            }).error(
                function(){
                console.log('Error al ejecutar la petición');
            });
    }

    if(this.mCollectionCreated == false){
        this.getCollection(function(){
            //check story board
            if(!self.mVideoStoryBoard){
                //traer story
                self.getStoryBoard(self.mVideoId, _createIndex);
            }else{
                _createIndex();
            }
        });
    }else{
        _createIndex();
    }
};

VideoManager.prototype.pauseVideo = function(){
    this.mVideoObject.pauseVideo();
};

VideoManager.prototype.playVideo = function(){
    this.mVideoObject.playVideo();
};

VideoManager.prototype.getCurrentTime = function(){
    return this.mVideoObject.getCurrentTime();
};

VideoManager.prototype.getStatus = function(){
    return this.mVideoObject.getPlayerState();
};

VideoManager.prototype.getCollection = function(aOnCompleted){
    var self = this;
    $.post(this.mBasePath + "traer_coleccion.php")
        .done(function( data ) {
            self.mCollectionCreated = true;
            aOnCompleted();
        });
}

VideoManager.prototype.getStoryBoard = function(aVideoId, aOnCompleted){
    var self = this;
    $.post(this.mBasePath + "cargar_storyboard.php", {url_video: "fbX3uW6GQAc"})
        .done(function( data ) {
            var datos_sesion = jQuery.parseJSON(data);
            if(datos_sesion.length > 0){
                self.mVideoStoryBoard = self.convertStoryBoardsToSeconds(datos_sesion[0].tiempos_storyboard);

            }
            aOnCompleted();
            /*escribirEnConsola(nombre_funcion,datos_sesion);
            imprimirEnPantalla(nombre_funcion,'url_video',idVideo,data);*/
        });
};

VideoManager.prototype.convertStoryBoardsToSeconds = function(aStoryBoard){
    var aNewStoryBoard = [];
    for(var aKey in aStoryBoard){
        var aTimeArray = aKey.split(':');
        var aHourInSeconds = parseInt(aTimeArray[0]) * 3600;
        var aMinuteInSeconds = parseInt(aTimeArray[1]) * 60;
        var aSeconds = parseInt(aTimeArray[2]) + aMinuteInSeconds + aHourInSeconds;
        aNewStoryBoard.push({time:aSeconds, data:aStoryBoard[aKey]});
    }
    return aNewStoryBoard;
};

VideoManager.prototype.secondsToMinutes = function(aSeconds){
    var aHour = parseInt(aSeconds / 3600);
    var aMinute = parseInt(aSeconds / 60);
    aSeconds = parseInt(aSeconds);

    if(aHour < 10){ aHour = "0" + aHour;}
    if(aMinute < 10){ aMinute = "0" + aMinute; }
    if(aSeconds < 10) { aSeconds = "0" + aSeconds; }

    return aHour + ":" + aMinute + ":" + aSeconds;
};

VideoManager.prototype.findClosestImage = function(aSeconds){
    var aClosestIndex = 0;
    var aMinDistance = Number.MAX_VALUE;
    for(var i = 0; i < this.mVideoStoryBoard.length; i++){
        var aItem = this.mVideoStoryBoard[i];
        var aDiff = Math.abs(aSeconds - aItem.time);
        if(aDiff < aMinDistance){
            aMinDistance = aDiff;
            aClosestIndex = i;
        }
    }

    return this.mVideoStoryBoard[aClosestIndex].data;
};

VideoManager.STATUS_NOT_INITIALIZED = -1;
VideoManager.STATUS_ENDED = 0;
VideoManager.STATUS_PLAYING = 1;
VideoManager.STATUS_PAUSED = 2;
VideoManager.STATUS_BUFFERING = 3;
VideoManager.STATUS_QUEUED = 5;