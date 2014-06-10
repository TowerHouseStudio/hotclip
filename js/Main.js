function Main(){
    var self = this;
    this.mSideBarIsOpen = true;

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
            self.hideSideBar();
        }
    });

    $( ".arrow-tab" ).click(function() {
        self.hideSideBar();
    });

    $( ".arrow-tab-hide" ).click(function() {
        self.showSideBar();
    });

};

Main.prototype.hideSideBar = function(){
    if(this.mSideBarIsOpen == true){
        this.mSideBarIsOpen = false;
        $( ".frame-boxes" ).animate({width: "toggle"}, 100, function() {
            $( ".frame-boxes-hide" ).show();
        });
    }
};
Main.prototype.showSideBar = function(){
    if(this.mSideBarIsOpen == false){
        this.mSideBarIsOpen = true;
        $( ".frame-boxes-hide" ).hide( 100, function() {
            $( ".frame-boxes" ).animate({width: "toggle"}, 100, function() {});
        });
    }
};

Main.prototype.playVideoOnTag = function(aSeconds){
    this.mVideoManager.playVideoOnSeconds(aSeconds);
};

Main.prototype.updateTags = function(aTag, aSeconds){
    var self = this;
    $('#btnGuardar').css('display','initial');
    var aContainer = $(".scene-scroll");
    var aElement = $('<div class="tagued-scene" seconds="'+ aSeconds +'"><h6>' + aTag.descripcion_indice + '</h6><span>' + aTag.minuto + '</span><img src="' + aTag.url_imagen +'" /></div>');
    aElement.on("click", function(){
        var aSeconds = $(aElement).attr("seconds");
        self.playVideoOnTag(aSeconds);
    });
    aContainer.append(aElement);
    this.showSideBar();
};

Main.prototype.onSaveTag = function(){
    var aTagNameDiv = $(".tag-click-content").find('#tag_name_input')[0];
    var aValue = aTagNameDiv.value;
    aTagNameDiv.value = "";
    this.mVideoManager.createIndex(aValue, $.proxy(this.updateTags, this));
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