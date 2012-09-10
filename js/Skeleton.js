function Skeleton() {

    var self = this;

    /**
     * draw skeleton
     */
    this.draw = function() {
        for ( var c in self.skeletonMap) {
            self._drawBoneBetween( self.skeletonMap[c].bone, self.skeletonMap[c].j1.offset(), self.skeletonMap[c].j2.offset());
        }
    }

    /**
     * draw bone between joints
     * @param whichBone
     * @param joint1
     * @param joint2
     * @private
     */
    this._drawBoneBetween = function(whichBone, joint1, joint2) {
        var x1 = joint1.left;
        var y1 = joint1.top;
        var x2 = joint2.left;
        var y2 = joint2.top;
        var w = $(".joint").width();
        var h = $(".joint").height();

        var dx = x2-x1;
        var dy = y2-y1;

        var hyp = Math.sqrt( Math.pow(dy, 2) + Math.pow(dx, 2));
        var rad = Math.atan2(dy, dx) + Math.PI/2;

        x1 += w/2;
        y1 -= Math.abs(dy) - h/2;

        if (dy > 0) {
            y1 += dy;
        }

        if (dx < 0) {
            x1 += dx;
        }

        if (whichBone.attr("class") == "bone left knee-foot") {
            console.log(y1);
        }
        $(whichBone).height(hyp);
        $(whichBone).css({ "-webkit-transform": "rotate(" + rad + "rad)" });
        $(whichBone).offset({ top: y1, left: x1});

    }

    /** skeleton mapping - requires DOM elements to exist */
    this.skeletonMap = [
        // Left side rigging /////////////////
        // ARMS
        { j1: $(".joint.elbow.left"), j2: $(".joint.hand.left"), bone: $(".bone.left.hand-elbow") },
        { j1: $(".joint.shoulder.left"), j2: $(".joint.elbow.left"), bone: $(".bone.left.shoulder-elbow") },
        { j1: $(".joint.neck"), j2: $(".joint.shoulder.left"), bone: $(".bone.left.neck-shoulder") },

        // LEGS
        { j1: $(".joint.knee.left"), j2: $(".joint.foot.left"), bone: $(".bone.left.knee-foot") },
        { j1: $(".joint.hip.left"), j2: $(".joint.knee.left"), bone: $(".bone.left.hip-knee") },
        { j1: $(".joint.pelvis"), j2: $(".joint.hip.left"), bone: $(".bone.left.pelvis-hip") },

        // Right side rigging ////////////////
        // ARMS
        { j1: $(".joint.elbow.right"), j2: $(".joint.hand.right"), bone: $(".bone.right.hand-elbow") },
        { j1: $(".joint.shoulder.right"), j2: $(".joint.elbow.right"), bone: $(".bone.right.shoulder-elbow") },
        { j1: $(".joint.neck"), j2: $(".joint.shoulder.right"), bone: $(".bone.right.neck-shoulder") },

        // LEGS
        { j1: $(".joint.knee.right"), j2: $(".joint.foot.right"), bone: $(".bone.right.knee-foot") },
        { j1: $(".joint.hip.right"), j2: $(".joint.knee.right"), bone: $(".bone.right.hip-knee") },
        { j1: $(".joint.pelvis"), j2: $(".joint.hip.right"), bone: $(".bone.right.pelvis-hip") },

        // Body spine rigging //////////////
        { j1: $(".joint.head"), j2: $(".joint.neck"), bone: $(".bone.head-neck") },
        { j1: $(".joint.neck"), j2: $(".joint.center"), bone: $(".bone.neck-center") },
        { j1: $(".joint.center"), j2: $(".joint.pelvis"), bone: $(".bone.pelvis-center") }
    ];
}