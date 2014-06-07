function Main(){
    var aVideoObject = document.getElementById('video_content');

    var aVideoOverlay = $.find("#video_overlay");
    $(aVideoOverlay).on("click", function(){
        aVideoObject.playVideo();
    });

    var aVideoId =  $(aVideoObject).attr('video_id');


    var aVideoManager = new VideoManager(aVideoObject, aVideoId);
    aVideoManager.createIndex();
};

