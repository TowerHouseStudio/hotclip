function Main(){
    var self = this;
    var aVideoObject = document.getElementById('video_content');

    var aVideoOverlay = $.find("#video_overlay");
    $(aVideoOverlay).on("click", function(){
    	self.showTagger();
        aVideoObject.playVideo();
    });

    var aVideoId =  $(aVideoObject).attr('video_id');


    var aVideoManager = new VideoManager(aVideoObject, aVideoId);
    aVideoManager.createIndex();
};


Main.prototype.showTagger = function(){
    $(".tag-click-content").show();

    //Gaston podes agregarle eventos a los botones aca?
};

Main.prototype.hideTagger = function(){};