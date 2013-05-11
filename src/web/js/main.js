(function (exports, $) {
	var canvas = $("#lightcanvas"),
		ctx = canvas[0].getContext("2d"),
        imagePaths = new exports.ImagePaths(canvas[0].width, canvas[0].height);


    var coords = [];

	canvas.on("touchstart", function (event) {
		var touch = event.originalEvent.targetTouches[0];

		ctx.beginPath();
		ctx.moveTo(touch.pageX, touch.pageY);

        imagePaths.addPoint(touch.pageX, touch.pageY, "off");

        event.preventDefault();
	});

	canvas.on("touchmove", function (event) {
		var touch = event.originalEvent.targetTouches[0];

		ctx.lineTo(touch.pageX, touch.pageY);
		ctx.stroke();

        imagePaths.addPoint(touch.pageX, touch.pageY, "on");
        console.log(imagePaths.getPointLast());

        event.preventDefault();
	});

    $("#send").on("click", function () {
        alert("clicked");
    });



}(window, jQuery.noConflict()));