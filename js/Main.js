function Main(){
    var self = this;
    var aVideoObject = document.getElementById('video_content');

    var aVideoId =  $(aVideoObject).attr('video_id');
    this.mVideoManager = new VideoManager(aVideoObject, aVideoId);
    //this.mVideoManager.createIndex();

    var aVideoOverlay = $.find("#video_overlay");
    $(aVideoOverlay).on("click", function(){
        var aVideoStatus = self.mVideoManager.getStatus();
        if(aVideoStatus == VideoManager.STATUS_PLAYING || aVideoStatus == VideoManager.STATUS_PAUSED){
            console.log("tag");
            self.mVideoManager.pauseVideo();
            self.showTagger();
        }else if(aVideoStatus == VideoManager.STATUS_NOT_INITIALIZED){
            self.mVideoManager.playVideo();
        }


        //aVideoManager.tag();
    });
};

Main.prototype.updateTags = function(aTag){
    var aContainer = $(".scene-scroll");
    aContainer.append('<div class="tagued-scene"><h6>' + aTag.descripcion_indice + '</h6><span>' + aTag.minuto + '</span><img src="' + aTag.url_imagen +'" /></div>');
};

Main.prototype.onSaveTag = function(){
    var aTagNameDiv = $(".tag-click-content").find('#tag_name_input')[0];
    var aValue = aTagNameDiv.value;
    aTagNameDiv.value = "";
    this.mVideoManager.createIndex(aValue, this.updateTags);
    this.hideTagger();
};

Main.prototype.showTagger = function(){
    $(".tag-click-content").show();
    $( ".discard-button").on("click", $.proxy(this.hideTagger, this));
    $( ".save-button").on("click", $.proxy(this.onSaveTag, this));
    //Gaston podes agregarle eventos a los botones aca?
};

Main.prototype.hideTagger = function(){
    $(".tag-click-content").hide();
    $( ".discard-button").off("click");
    $( ".save-button").off("click");
    this.mVideoManager.playVideo();
};