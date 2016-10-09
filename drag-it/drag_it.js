function DragIt(element) {
    this.element = element;

    //the object offset when capturing the mouse
    this.capturedOffset = null;

    //the position where mouse is down
    this.capturedPosition = null;

    //the position where mousemove trigerred last time
    this.previousPosition = null;

    //the speed caculated according to previous position
    this.inertiaSpeed = {
        x: 0,
        y: 0
    };

    //the object position
    this.offset = {
        left: 0,
        top: 0
    };

    //callbacks
    this.draggedCallbacks = [];

    //init on the element
    this.init(element);
}

DragIt.prototype = {
    init: function() {
        var that = this;

        //mouse down and touch start
        var handleDown = function(e) {
            e.preventDefault();

            that.capturedOffset = {
                left: that.offset.left,
                top: that.offset.top,
            };
            that.capturedPosition = {
                x: e.pageX,
                y: e.pageY
            };
        };

        //mouse up and touch end
        var handleUp = function(e) {
            e.preventDefault();
            cancelCapture(e);
        };

        //mouse up and touch end
        var cancelCapture = function(e) {
            e.preventDefault();

            //check the captured position
            if (that.capturedPosition == null) {
                return;
            }

            //caculate the position of movement
            var x2 = (e.pageX - that.capturedPosition.x) * (e.pageX - that.capturedPosition.x);
            var y2 = (e.pageY - that.capturedPosition.y) * (e.pageY - that.capturedPosition.y);

            //empty the position
            that.capturedPosition = null;

            //if the movement is little, don't handle it
            if (Math.sqrt(x2 + y2) < 6) {
                return;
            }

            //cancel the event when moved
            e.stopPropagation();

            //handle the inertia
            var inertiaHandler = function() {
                //apply the inertia speed to the offset and then reduce the speed
                if (that.inertiaSpeed.x != 0) {
                    that.offset.left += that.inertiaSpeed.x;
                    that.inertiaSpeed.x -= that.inertiaSpeed.x > 0 ? 1 : -1;
                }
                if (that.inertiaSpeed.Y != 0) {
                    that.offset.top += that.inertiaSpeed.y;
                    that.inertiaSpeed.y -= that.inertiaSpeed.y > 0 ? 1 : -1;
                }

                //trigger the call backs
                that.triggerCallbacks();

                //next timeout
                if (that.inertiaSpeed.x != 0 || that.inertiaSpeed.y != 0) {
                    setTimeout(inertiaHandler, 30);
                }
            };
            setTimeout(inertiaHandler, 30);
        };

        //mouse move and touch move
        var handleMove = function(e) {
            e.preventDefault();

            if (that.capturedPosition != null) {
                that.offset.left = that.capturedOffset.left + e.pageX - that.capturedPosition.x;
                that.offset.top = that.capturedOffset.top + e.pageY - that.capturedPosition.y;

                if (that.previousPosition != null) {
                    //caculate the inertia speed
                    that.inertiaSpeed = {
                        x: e.pageX - that.previousPosition.x,
                        y: e.pageY - that.previousPosition.y
                    };
                }

                //save the position for inertia speed caculation
                that.previousPosition = {
                    x: e.pageX,
                    y: e.pageY
                };

                //trigger the call backs
                that.triggerCallbacks();
            }
        };

        //catch the mouse events
        this.element.addEventListener("mousedown", handleDown, true);
        this.element.addEventListener("mouseup", handleUp, true);
        this.element.addEventListener("mousemove", handleMove, true);

        document.addEventListener("mouseup", cancelCapture, true);

        //catch the touch events
        this.element.addEventListener("touchstart", handleDown, true);
        this.element.addEventListener("touchend", handleUp, true);
        this.element.addEventListener("touchmove", handleMove, true);
    },

    registerCallback: function(callback) {
        this.draggedCallbacks.push(callback);
    },

    triggerCallbacks: function() {
        if (this.draggedCallbacks.length <= 0) {
            //no callback registerred
            return;
        }

        //triger each registerred callbacks
        for (var i = 0; i < this.draggedCallbacks.length; i++) {
            if (typeof this.draggedCallbacks[i] == "function") {
                this.draggedCallbacks[i](this.offset);
            }
        }
    }
}
