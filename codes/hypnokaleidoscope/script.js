'use strict';

// --------------------
// Init
// --------------------

let width = window.innerWidth;
let height = window.innerHeight;

let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

context.globalCompositeOperation = 'multiply';

let offscreenCanvas = document.createElement('canvas');
offscreenCanvas.width = width;
offscreenCanvas.height = height;
let offscreenContext = offscreenCanvas.getContext('2d');

canvas.width = width;
canvas.height = height;

// --------------------
// Drawing
// --------------------

class Clear {

    constructor(trailing = .4, context, opaque = false) {
        this.trailing = trailing;
        this.context = context;
        this.opaque = opaque;
    }

    update() {
        if (this.opaque) {
            this.context.fillStyle = 'rgba(0, 0, 0, ' + this.trailing + ')';
            this.context.fillRect(0, 0, canvas.width, canvas.height);
            this.context.fill();
        } else {
            this.context.clearRect(0, 0, canvas.width, canvas.height);
        }
    };
}

function Vector(x, y, z) {

    this.x = x;
    this.y = y;
    this.z = z === undefined ? 0 : z;

    this.add = function(v) {

        this.x += v.x;
        this.y += v.y;
        this.z += v.z;

        return this;
    };

    this.addX = function(n) {
        this.x += n;

        return this;
    };

    this.addY = function(n) {
        this.y += n;

        return this;
    };

    this.addZ = function(n) {
        this.z += n;

        return this;
    };

    this.subtract = function(v) {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;

        return this;
    };

    this.subtractX = function(n) {
        this.x -= n;

        return this;
    };

    this.subtractY = function(n) {
        this.y -= n;

        return this;
    };

    this.subtractZ = function(n) {
        this.z -= n;

        return this;
    };

    this.multiply = function(n) {

        this.x *= n;
        this.y *= n;
        this.z *= n;

        return this;
    };

    this.multiplyX = function(n) {
        this.x *= n;

        return this;
    };

    this.multiplyY = function(n) {
        this.y *= n;

        return this;
    };

    this.multiplyZ = function(n) {
        this.z *= z;

        return this;
    };

    this.divide = function(n) {

        this.x /= n;
        this.y /= n;
        this.z /= n;

        return this;
    };

    this.magnitude = function() {

        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    };

    this.normalize = function() {
        var m = this.magnitude();
        if (m !== 0) {
            this.divide(m);
        }
    };

    this.limit = function(n) {

        if (this.magnitude() > n) {
            this.normalize();
            this.multiply(n);
        }
    };

    this.distance = function(v) {

        var dx = this.x - v.x,
            dy = this.y - v.y,
            dz = this.z - v.z;

        return Math.sqrt(dx * dx + dy * dy + dz * dz);
    };

    this.invert = function() {

        this.x *= -1;
        this.y *= -1;
        this.z *= -1;

        return this;
    };

    this.inverseX = function() {

        this.x *= -1;

        return this;
    };

    this.inverseY = function() {

        this.y *= -1;

        return this;
    };

    this.inverseZ = function() {

        this.z *= -1;

        return this;
    };

    this.get = function() {

        return new Vector(this.x, this.y, this.z);
    };

    this.dot = function(v) {

        return this.x * v.x + this.y * v.y + this.z * v.z;
    };
}

// -------------------------
// Vector: Static
// -------------------------

Vector.add = function(v1, v2) {

    var v3 = new Vector(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z);

    return v3;
};

Vector.subtract = function(v1, v2) {

    var v3 = new Vector(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z);

    return v3;
};

Vector.multiply = function(v1, v2) {

    var v3 = new Vector(v1.x * v2.x, v1.y * v2.y, v1.z * v2.z);

    return v3;
};

Vector.divide = function(v1, v2) {

    if (typeof v2 === Vector) {
        var v3 = new Vector(v1.x / v2.x, v1.y / v2.y, v1.z / v2.z);
    } else {
        var v3 = new Vector(v1.x / v2, v1.y / v2, v1.z / v2);
    }

    return v3;
};

Vector.distance = function(v1, v2) {

    return v1.distance(v2);
};

Vector.copy = function(v) {
    return new Vector(v.x, v.y, v.z);
};

Vector.random2D = function() {

    var x = parseInt((Math.random() * 3)) -1;
    var y = parseInt((Math.random() * 3)) -1;
    var z = parseInt((Math.random() * 2)) -1;

    var v1 = new Vector(x, y, z);
    return v1;
};

// -------------------------
// Fibonacci
// -------------------------

function fibonacci(num, memo) {
    memo = memo || {};
    if (memo[num]) return memo[num];
    if (num <= 1) return 1;
    return memo[num] = fibonacci(num - 1, memo) + fibonacci(num - 2, memo);
}

// -------------------------
// I am random
// -------------------------

function getRandomBetween(min, max) {
    return Math.floor(min + Math.random()*(max+1 - min));
}

'use strict';

class Spiral3d {

    constructor(position, color, context) {
        this.angle = 0;
        this.depthAngle = Math.PI / 2;
        this.angleIncrement = 0.01;
        this.resolution = 0.2;
        this.width = 100;
        this.height = 100;
        this.depth = 40;
        this.position = position;
        this.color = color;
        this.spiral = 8;
        this.jitter = 1;
        this.context = context;
    }

    update() {

        this.angle += this.angleIncrement;
        this.depthAngle += this.angleIncrement;

        this.draw();
    }

    draw() {

        for ( let i = -(Math.PI * this.depth / 2) ; i < (Math.PI * this.depth / 2) ; i += this.resolution ) {

            // let sin = Math.sin(this.angle);
            // let spiralSin = Math.sin(this.depthAngle);
            let cos = Math.cos(this.angle);
            let spiralCos = Math.cos(this.depthAngle);

            let sin = 1;
            let spiralSin = 0;
            // let cos = 1;
            // let spiralCos = 0;

            let moveToX = (
                this.position.x +
                ( sin * ( Math.sin(this.angle + i) * (this.width * ( i / this.depth ) ) ) ) +
                ( ( i * this.spiral ) * spiralSin )
                + (this.jitter * (Math.sin(i/.01) * 5))
            );
            let moveToY = (
                this.position.y +
                ( cos * ( Math.cos(this.angle + i) * (this.height * ( i / this.depth ) ) ) ) +
                ( ( i * this.spiral ) * spiralCos )
                + (this.jitter * (Math.cos(i/.1) * 20))
            );

            let toI = i + this.resolution;

            let lineToX = (
                this.position.x +
                ( sin * ( Math.sin(this.angle + toI) * (this.width * ( toI / this.depth ) ) ) ) +
                ( ( toI * this.spiral ) * spiralSin )
                + (this.jitter * (Math.sin(toI/.01) * 5))
            );
            let lineToY = (
                this.position.y +
                ( cos * ( Math.cos(this.angle + toI) * (this.height * ( toI / this.depth ) ) ) ) +
                ( ( toI * this.spiral ) * spiralCos )
                + (this.jitter * (Math.cos(toI/.1) * 20))
            );

            this.context.lineWidth = 2;
            this.context.strokeStyle = this.color.update();
            this.context.beginPath();
            this.context.moveTo(moveToX, moveToY);
            this.context.lineTo(lineToX, lineToY);
            this.context.stroke();
        }
    }
}

'use strict';

class Color {

    constructor(
        rIncrement, gIncrement, bIncrement, aIncrement,
        pinR, pinG, pinB, pinA
    ) {
        this.color = { r:0, g:0, b:0, a:1 };
        this.rAngle = 0;
        this.gAngle = 0;
        this.bAngle = 0;
        this.aAngle = 0;
        this.rIncrement = rIncrement;
        this.gIncrement = gIncrement;
        this.bIncrement = bIncrement;
        this.aIncrement = aIncrement;

        this.rBaseValue = pinR !== undefined ? pinR : (256 / 2);
        this.gBaseValue = pinG !== undefined ? pinG : (256 / 2);
        this.bBaseValue = pinB !== undefined ? pinB : (256 / 2);
        this.aBaseValue = pinA !== undefined ? pinA : .5;
    }

    update() {

        this.color.r = this.rBaseValue + Math.floor(Math.sin(this.rAngle) * this.rBaseValue);
        this.color.g = this.gBaseValue + Math.floor(Math.cos(this.gAngle) * this.gBaseValue);
        this.color.b = this.bBaseValue + Math.floor(Math.cos(this.bAngle) * this.bBaseValue);
        this.color.a = this.aBaseValue + Math.sin(this.aAngle) * this.aBaseValue;

        this.rAngle += this.rIncrement;
        this.gAngle += this.gIncrement;
        this.bAngle += this.bIncrement;
        this.aAngle += this.aIncrement;

        return 'rgba(' +
            this.color.r + ',' +
            this.color.g + ',' +
            this.color.b + ',' +
            this.color.a + ')';
    }

    static create(
        rIncrement = .1,
        gIncrement = .1,
        bIncrement = .1,
        aIncrement = .1,
        pinR,
        pinG,
        pinB,
        pinA
    ) {
        return new Color(
            rIncrement,
            gIncrement,
            bIncrement,
            aIncrement,
            pinR,
            pinG,
            pinB,
            pinA
        );
    }

}

'use strict';

class KaleidoscopeFragment {

    constructor(position, width, height, angle) {
        this.position = position;
        this.width = width;
        this.height = height;
        this.angle = angle;
    }

    setAngle(angle) {
        this.angle = angle;
    }

    addAngle(angle) {
        this.angle += angle;
    }

    update() {

        this.draw();
    }

    draw() {
        context.save();
        context.translate(this.position.x, this.position.y);
        context.rotate(this.angle * Math.PI/180);
        context.translate(this.position.x * -1, this.position.y * -1);

        context.beginPath();
        context.strokeStyle = 'rgba(255, 255, 255, 1)';
        context.lineWidth = 1;
        context.moveTo( this.position.x, this.position.y );
        context.lineTo( this.position.x - ( this.width / 2 ), 0 );
        context.lineTo( this.position.x + ( this.width / 2 ), 0 );
        context.closePath();

        context.clip();
        context.drawImage(
            offscreenContext.canvas,
            0, 0,
            offscreenCanvas.width,
            offscreenCanvas.height
        );
        context.restore();
    }

    static create(position, width, height, angle = 0) {

        return new KaleidoscopeFragment(position, width, height, angle);
    }
}

'use strict';

class Kaleidoscope {

    constructor(width, height, fragments = []) {

        this.LEFT = 'left';
        this.RIGHT = 'right';
        this.BOTH = 'both';

        this.width = width;
        this.height = height;
        this.fragments = fragments;
        this.angleIncrement = 0.9;

        this.updateFragmentCount(10);
        this.rotationMode = this.RIGHT;
    }

    updateFragmentCount(count) {
        this.fragments = [];
        for (let i = 1 ; i <= count ; i++) {
            this.fragments.push(KaleidoscopeFragment.create(
                new Vector( canvas.width / 2, canvas.height / 2 ),
                canvas.width / 2,
                canvas.height / 2,
                (360 / count) * i
            ));
        }
    }

    update() {
        this.fragments.map((fragment, index) => {
            let increment = this.angleIncrement;
            switch (this.rotationMode) {
                case this.LEFT:
                    increment = this.angleIncrement * -1;
                    break;
                case this.RIGHT:
                    increment = this.angleIncrement;
                    break;
                case this.BOTH:
                    increment = index%2 === 0 ? this.angleIncrement : this.angleIncrement * -1;
                    break;
            }
            fragment.addAngle(increment);
            fragment.update();
        });
    }

    static create(width, height) {

        return new Kaleidoscope(width, height);
    }
}

'use strict';

class DepthShader {

    constructor(position, radius) {
        this.position = position;
        this.radius = radius;
        this.opacityBaseValue = .5;
        this.opacity = this.opacityBaseValue;
        this.opacityAngle = 0;
    }

    update() {
        this.opacity = this.opacityBaseValue + (Math.sin(this.opacityAngle) * this.opacityBaseValue);
        this.opacityAngle += .01;

        this.draw();
    }

    draw() {
        context.fillStyle = 'rgba(0, 0, 0, ' + (this.opacity * .2) + ')';
        for (let i = 0 ; i < 10 ; i++) {
            context.beginPath();
            context.arc(
                this.position.x,
                this.position.y,
                ((this.radius / 2) / 10) * i,
                0, Math.PI * 2
            );
            context.closePath();
            context.fill();
        }
    }

    static create(position, radius) {
        return new DepthShader(position, radius);
    }
}

'use strict';

class StarField {

    constructor(position) {
        this.position = position;
        this.stars = [];
        this.speed = 0.01;
        setInterval(this.createStar.bind(this), 10);
    }

    createStar() {
        this.stars.push({
            position: Vector.copy(this.position),
            angle: Math.random() * (Math.PI * 2),
            radius: 0,
            starRadius: 0,
            alpha: 0,
            speed: this.speed
        });
    }

    update() {
        this.stars.map(star => {
            star.position.x += Math.sin(star.angle) * star.radius;
            star.position.y += Math.cos(star.angle) * star.radius;
            star.radius += star.speed;
            star.starRadius += 0.05;
            star.alpha += 0.005;
            star.speed += Math.random() / 100;
            if (star.position.x > canvas.width ||
                star.position.x < 0 ||
                star.position.y > canvas.height ||
                star.position.y < 0
            ) {
                this.stars.splice(this.stars.indexOf(star), 1);
            }
        });
        this.draw();
    }

    draw() {
        context.lineWidth = 1;
        this.stars.map(star => {
            context.strokeStyle = 'rgba(255, 255, 255, ' + star.alpha + ')';
            context.beginPath();
            context.arc(star.position.x, star.position.y, star.starRadius, 0, Math.PI * 2);
            context.closePath();
            context.stroke();
        });
    }

    static create(position) {
        return new StarField(position);
    }
}

'use strict';

class CreepingSnake {

    constructor(position, angle, context, color) {

        this.position = position;
        this.context = context;
        this.color = color;
        this.resolution = .4;
        this.waveLength = 20;
        this.length = 200;
        this.height = 100;
        this.radius = this.height / 2;
        this.angle = 0;
        this.rotation = angle;
        this.lineWidth = .1;
    }

    update() {

        this.angle += .1;

        this.draw();
    }

    calculateX(i) {
        return ( this.position.x + ( i * ( this.resolution + this.waveLength ) ) ) + ( Math.cos(this.angle) *  5 );
    }

    calculateY(i, radius) {
        return ( this.position.y + ( Math.sin( i + this.resolution + this.angle ) * radius ) ) + ( Math.sin(this.angle) * 5 )
    }

    draw() {
        this.context.save();
        this.context.translate( this.position.x, this.position.y );
        this.context.rotate( this.rotation * Math.PI/180 );
        this.context.translate( this.position.x * -1, this.position.y * -1 );

        let toX = 0;
        let toY = 0;
        this.context.lineWidth = this.lineWidth;
        this.context.lineJoin = 'round';
        this.context.lineCap = 'round';
        let startI = -( ( this.length / 2 ) / this.waveLength );

        let radius = this.radius;
        for ( let i = startI ; i < ( ( this.length / 2 ) / this.waveLength) ; i += this.resolution ) {
            this.context.beginPath();
            this.context.strokeStyle = this.color.update();
            if (i === startI ) {
                toX = this.calculateX(i);
                toY = this.calculateY(i, radius);
            }
            this.context.moveTo( toX, toY );
            toX = this.calculateX(i);
            toY = this.calculateY(i, radius);
            radius -= 1.8;
            this.context.lineTo( toX, toY );
            this.context.stroke();
            this.context.lineWidth += 0.4;
        }

        this.context.restore();
    }

    static create(position, angle, context, color) {
        return new CreepingSnake(position, angle, context, color);
    }
}

'use strict';

class FlyingSnake {

    constructor(position, context) {

        this.position = position;
        this.initialPosition = Vector.copy(position);
        this.snake = CreepingSnake.create(
            this.position,
            -90,
            context,
            Color.create(1, 2, 3, 0, 255)
        );
    }

    update() {

        this.snake.update();
        this.snake.position.y -= 1.5;
        if (this.snake.position.y < -this.snake.height) {
            this.snake.position.y = this.initialPosition.y;
        }
    }

    static create(position, context) {
        return new FlyingSnake(position, context);
    }
}

'use strict';

class Snakes {

    constructor(position, context) {

        this.position = position;
        this.context = context;
        this.snakes = [];

        setInterval(this.createSnake.bind(this), 200);
    }

    createSnake() {
        if (this.snakes.length < 5) {
            this.snakes.push({
                snake: CreepingSnake.create(
                    Vector.copy(this.position),
                    0,
                    this.context,
                    Color.create(1, 2, 3, 0, undefined, 255)
                ),
                radius: 0
            });
        }
    }

    update() {
        this.snakes.map(snake => {
            snake.snake.position.x -= Math.sin(snake.snake.rotation) * snake.radius;
            snake.snake.position.y -= Math.cos(snake.snake.rotation) * snake.radius;
            snake.radius += 0.01;
            if (snake.snake.position.x > snake.snake.width ||
                snake.snake.position.x < 0 ||
                snake.snake.position.y > canvas.height ||
                snake.snake.position.y < 0
            ) {
                this.snakes.splice(this.snakes.indexOf(snake), 1);
            }
            snake.snake.update();
        });
    }

    draw() {

    }

    static create(position, context) {
        return new Snakes(position, context);
    }
}

'use strict';

function Stage() {

    let clear = new Clear( .4, context, true );
    let offscreenClear = new Clear( 1, offscreenContext, false );
    let spiral3d = new Spiral3d( new Vector( canvas.width / 2, canvas.height / 2 ), Color.create( .1, .2, .3 ), offscreenContext );

    let depthShader = DepthShader.create(
        new Vector( canvas.width / 2, canvas.height / 2 ),
        canvas.height - 100,
        canvas.height - 100
    );
    let kaleidoscope = Kaleidoscope.create( canvas.width, canvas.height );
    let starField = StarField.create(
        new Vector( canvas.width / 2, canvas.height / 2 )
    );
    let snakes = Snakes.create(
        new Vector( canvas.width / 2, canvas.height / 2 ),
        offscreenContext
    );
    let flyingSnake = FlyingSnake.create(
        new Vector( canvas.width / 2, ( canvas.height / 2 ) + 100 ), offscreenContext
    );

    let animate = function() {
        clear.update();
        offscreenClear.update();
        spiral3d.update();
        flyingSnake.update();
        starField.update();
        snakes.update();
        kaleidoscope.update();
        depthShader.update();

        requestAnimationFrame(animate);
    }.bind(this);

    animate();
}

new Stage();