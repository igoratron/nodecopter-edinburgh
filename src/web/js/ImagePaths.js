(function (exports) {
    var ImagePaths = function (width, height) {
        this._points = [];
        this._canvasWidth = width;
        this._canvasHeight = height;
    };

    ImagePaths.prototype.addPoint = function (x, y, color, threshold) {
        if (threshold === void 0) {
            threshold = 100;
        }

        y = Math.abs(y - this._canvasHeight);

        if(this._points.length > 0) {
            var lastPoint = this._points[this._points.length - 1];
            if(distance(lastPoint.x, lastPoint.y, x, y) > threshold) {
                this._points.push({x: x, y: y, color: color});
            }
        } else {
            this._points.push({x: x, y: y, color: color});
        }
    };

    ImagePaths.prototype.size = function () {
        return this._points.length;
    };

    ImagePaths.prototype.getPoint = function (i) {
        return this._points[i];
    };

    ImagePaths.prototype.getPointLast = function () {
        return this._points[this._points.length - 1];
    };

    ImagePaths.prototype.getArray = function () {
        return this._points;
    }

    function distance(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    }

    exports.ImagePaths = exports.ImagePaths || ImagePaths;
}(window));