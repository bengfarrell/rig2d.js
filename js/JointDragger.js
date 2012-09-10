function JointDragger() {

    var self = this;

    this.dispatcher = window;

    /**
     * init
     */
    this.init = function() {
        $(".joint").bind("mousedown", self.onGrabjoint);
    }

    /**
     * grab joint handler
     * @param e
     */
    this.onGrabjoint = function(e) {
        $(document).bind("mousemove", self.onMovejoint);
        $(e.currentTarget).bind("mouseup", self.onReleasejoint);
        self._jointDragging = e.currentTarget;
    }

    /**
     * move joint handler
     * @param e
     */
    this.onMovejoint = function(e) {
        $(self._jointDragging).offset({left:e.pageX - $(self._jointDragging).width()/2, top:e.pageY - $(self._jointDragging).height()/2 });
        var e = document.createEvent("Events");
        e.initEvent(JointDragger.prototype.JOINT_MOVED);
        e.dragging = self._jointDragging;
        self.dispatcher.dispatchEvent(e);
    }

    /**
     * release joint handler
     * @param e
     */
    this.onReleasejoint = function(e) {
        $(document).unbind("mousemove", self.onMovejoint);
        $(self._jointDragging).unbind("mouseup", self.onReleasejoint);
    }
}

JointDragger.prototype.JOINT_MOVED = "onJointMoved";