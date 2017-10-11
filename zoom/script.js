
$(function() {
    var SCALE_FACTOR = 3;

    var originalImg = $(".actual-img");
    var tracker = $(".tracker");
    var scaledImg = $(".zoom");
    var zoomViewport = $(".zoom-viewport");

    function updateImagesSizeAndPosition() {
        var originalWidth = originalImg.innerWidth();
        var originalHeight = originalImg.innerHeight();
        var viewportWidth = zoomViewport.innerWidth();
        var viewportHeight = zoomViewport.innerHeight();

        var scaledWidth = originalWidth * SCALE_FACTOR;
        var scaledHeight = originalHeight * SCALE_FACTOR;

        scaledImg.css("width", scaledWidth);
        scaledImg.css("height", scaledHeight);
        scaledImg.css("top", String(-(scaledHeight / 2 - viewportHeight / 2)) + "px");
        scaledImg.css("left", String(-(scaledWidth / 2 - viewportWidth / 2)) + "px");
    }

    updateImagesSizeAndPosition();

    tracker.mousemove(function(e) {
        var self = $(this);

        updateImagesSizeAndPosition();

        var originalWidth = originalImg.innerWidth();
        var originalHeight = originalImg.innerHeight();

        var scaledWidth = scaledImg.innerWidth();
        var scaledHeight = scaledImg.innerHeight();

        var viewportWidth = zoomViewport.innerWidth();
        var viewportHeight = zoomViewport.innerHeight();

        originalCenterX = originalWidth / 2;
        originalCenterY = originalHeight / 2;

        scaledCenterX = scaledWidth / 2;
        scaledCenterY = scaledHeight / 2;

        var offset = self.offset();
        var x = event.pageX - offset.left;
        var y = event.pageY - offset.top;

        xRelativeToCenter = originalCenterX - x;
        yRelativeToCenter = originalCenterY - y;

        scaledXRelativeToCenter = (xRelativeToCenter * SCALE_FACTOR);
        scaledYRelativeToCenter = (yRelativeToCenter * SCALE_FACTOR);

        var scaledXOffset = scaledXRelativeToCenter;
        var scaledYOffset = scaledYRelativeToCenter;

        var scaledImgTransform = "";
        scaledImgTransform += ("translateX(" + String(scaledXOffset) + "px)");
        scaledImgTransform += " ";
        scaledImgTransform += ("translateY(" + String(scaledYOffset) + "px)");

        scaledImg.css("transform", scaledImgTransform);

        zoomViewport.css("top", String(y - viewportHeight / 2) + "px");
        zoomViewport.css("left", String(x - viewportWidth / 2) + "px");
    });

});