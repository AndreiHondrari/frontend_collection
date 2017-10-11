
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

        // determine the scaled size of the zoom div/image
        var scaledWidth = originalWidth * SCALE_FACTOR;
        var scaledHeight = originalHeight * SCALE_FACTOR;

        // make sure that the zoomable div/image is the scale of the original div/image
        scaledImg.css("width", scaledWidth);
        scaledImg.css("height", scaledHeight);

        // make sure that the zoomable div/image is centered in the viewport
        scaledImg.css("top", String(-(scaledHeight / 2 - viewportHeight / 2)) + "px");
        scaledImg.css("left", String(-(scaledWidth / 2 - viewportWidth / 2)) + "px");
    }

    updateImagesSizeAndPosition();

    tracker.mousemove(function(e) {
        var self = $(this);

        updateImagesSizeAndPosition();

        // gather sizes for normal image, scaled image and the viewport
        var originalWidth = originalImg.innerWidth();
        var originalHeight = originalImg.innerHeight();

        var scaledWidth = scaledImg.innerWidth();
        var scaledHeight = scaledImg.innerHeight();

        var viewportWidth = zoomViewport.innerWidth();
        var viewportHeight = zoomViewport.innerHeight();

        // obtain center coordinates in the normal image
        originalCenterX = originalWidth / 2;
        originalCenterY = originalHeight / 2;

        // obtain center coordinates in the scaled image
        scaledCenterX = scaledWidth / 2;
        scaledCenterY = scaledHeight / 2;

        // get (x, y) coordinates of the mouse in the tracker viewport
        var offset = self.offset();
        var x = event.pageX - offset.left;
        var y = event.pageY - offset.top;

        // determine the relative distance of the mouse pointer from the normal image center point
        xRelativeToCenter = originalCenterX - x;
        yRelativeToCenter = originalCenterY - y;

        // determine the relative distance of the mouse targeted location from the scaled image center point
        scaledXRelativeToCenter = (xRelativeToCenter * SCALE_FACTOR);
        scaledYRelativeToCenter = (yRelativeToCenter * SCALE_FACTOR);

        // pan the viewport to the targeted location
        var scaledImgTransform = "";
        scaledImgTransform += ("translateX(" + String(scaledXRelativeToCenter) + "px)");
        scaledImgTransform += " ";
        scaledImgTransform += ("translateY(" + String(scaledYRelativeToCenter) + "px)");

        scaledImg.css("transform", scaledImgTransform);

        // center the viewport on the mouse location
        zoomViewport.css("top", String(y - viewportHeight / 2) + "px");
        zoomViewport.css("left", String(x - viewportWidth / 2) + "px");
    });

});