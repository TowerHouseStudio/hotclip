function Main(){
    var aVideoObject = document.getElementById('video_content');
    var aVideoOverlay = $.find("#video_overlay");
    $(aVideoOverlay).on("click", function(){
    	$(".tag-click-content").show();
        aVideoObject.playVideo();
    });


    var aVideoManager = new VideoManager();
    aVideoManager.createIndex();
};

