paper.install(window);

// the code below uses Paper.js' PaperScript

///////////////////////
// CONSTRUCTORS
///////////////////////

function PortalPair(portal0, portal1) {
    this.portal0 = portal0;
    this.portal1 = portal1;
    // objects currently being teleported
    this.teleportees = [];
    // objects that have just exited a portal
    this.teleported = [];
    // temp groups for partial paths
    this.teleporteeGroups = [];
}
PortalPair.prototype = {
    checkIntersections:function(objects) {
        objects.forEach(function(o) {
            var index = this.teleportees.indexOf(o);

            checkPortal.call(this, this.portal0, this.portal1);
            checkPortal.call(this, this.portal1, this.portal0);

            function checkPortal(enter, exit) {

                var result = enter.getIntersections(o);

                if (result.length && index === -1) {
                    o._enterPosition = enter.globalToLocal(o.position);
                    o._enterPortal = enter;
                    o._exitPortal = exit;

                    this.teleportees.push(o);
                }
                else if (o._enterPortal !== exit && !result.length && index !== -1) {
                    this.teleportees.splice(index, 1);
                    this.teleported.push(o);
                }
            }
        }, this);
    },
    update:function() {
        this.clearGroups();

        this.teleportees.forEach(function(t) {
            this.updateTeleportee(t);
        }, this);

        this.teleported.forEach(function(t) {
            this.updateTeleported(t);
        }, this);

        this.teleported.length = 0;
    },
    clearGroups:function() {
        this.teleporteeGroups.forEach(function(g) {
            g.remove();
        });
        this.teleporteeGroups.length = 0;
    },
    updateTeleportee:function(object) {
        var group = object.divide(object._enterPortal);
        group.visible = false;
        this.teleporteeGroups.push(group);

        if (group.children[0] instanceof CompoundPath) {
            var part0 = group.children[0].children[0];
            var part1 = group.children[0].children[1];

            var pos0 = object._enterPortal.globalToLocal(part0.position);
            var pos1 = object._enterPortal.globalToLocal(part1.position);

            var delta0 = pos0 - object._enterPosition;
            var delta1 = pos1 - object._enterPosition;

            var teleportPart, teleportPartPos;

            if (delta0.length > delta1.length) {
                teleportPart = part0;
                teleportPartPos = pos0;
            }
            else {
                teleportPart = part1;
                teleportPartPos = pos1;
            }

            var targetPos = object._exitPortal.localToGlobal(teleportPartPos);
            var tMatrix = getPortalTransformMatrix(object._enterPortal, object._exitPortal);

            teleportPart.position = targetPos;
            teleportPart.rotation = tMatrix.rotation;

            object.visible = false;
            group.visible = true;
        }
    },
    updateTeleported:function(object) {
        var pos = object.position;
        var sourcePos = object._enterPortal.globalToLocal(pos);
        var targetPos = object._exitPortal.localToGlobal(sourcePos);
        var tMatrix = getPortalTransformMatrix(object._enterPortal, object._exitPortal);

        object.position = targetPos;
        object.rotation = tMatrix.rotation;
        object._velocity = object._velocity.rotate(tMatrix.rotation);
        object.visible = true;

        delete object._enterPosition;
        delete object._enterPortal;
        delete object._exitPortal;
    }
};

function createPortal(o) {
    return new Path.Rectangle({
        transformContent:false,
        point:new Point(0, 0),
        size:new Point(o.width, 1e-3),
        position:o.position,
        rotation:o.rotation,
        strokeColor:o.color,
        shadowColor:o.color,
        shadowBlur:8
    });
}

function createPortalPair(p0, p1, r0, r1, c) {
    var portal0 = createPortal(
        {
            position:p0,
            rotation:r0,
            width:100,
            color:c
        }
    );

    var portal1 = createPortal(
        {
            position:p1,
            rotation:r1,
            width:100,
            color:c
        }
    );

    return new PortalPair(portal0, portal1);
}

function createCircle(o) {
    var circle = new Path.Circle({
        center:new Point(),
        radius:o.radius,
        fillColor:o.color,
        transformContent:false,
        position:o.position
    });

    circle._velocity = new Point();

    return circle;
}

///////////////////////
// INITS
///////////////////////

var objects = [],
    pairs = [];

pairs.push(
    createPortalPair([400, 300], [700, 700], 0, 150, 'blue'),
    createPortalPair([100, 700], [700, 550], 210, -45, 'red'),
    createPortalPair([100, 450], [700, 300], 45, 135, 'green'),
    createPortalPair([75, 225], [700, 100], 90, 120, 'purple')
);

///////////////////////
// UPDATE
///////////////////////

var gravity = new Point(0, 5);
var timeStep = (1/60);

function onFrame(e) {
    if (e.count % 600 === 0) {
        var circle = createCircle(
            {
                position:new Point(400, -25),
                radius:15,
                color:'black'
            }
        );

        objects.push(circle);
    }

    objects.forEach(function(o) {
        o._velocity += gravity * timeStep;
        o.position += o._velocity;

        if (o.position.x < -20 || o.position.x > view.size.width + 20 || o.y > view.size.height + 20) {
            o.remove();
            objects.splice(objects.indexOf(o), 1);
        }
    });

    pairs.forEach(function(p) {
        p.checkIntersections(objects);
        p.update();
    });
}

///////////////////////
// UTILS
///////////////////////

function getPortalTransformMatrix(srcPortal, dstPortal) {
    var srcMatrix = srcPortal.matrix.inverted();
    var dstMatrix = dstPortal.matrix;

    return dstMatrix.clone().chain(srcMatrix);
}