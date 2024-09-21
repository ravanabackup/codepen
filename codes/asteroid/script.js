"use strict";
class Particle {
    constructor(x, y, speedX, speedY, maxLife) {
        this.x = x;
        this.y = y;
        this.speedX = speedX;
        this.speedY = speedY;
        this.life = 0;
        this.maxLife = maxLife;
    }
    update() {
        this.x -= this.speedX;
        this.y -= this.speedY;
        this.life++;
    }
    isDead() {
        return this.life > this.maxLife;
    }
}
class Bullet {
    constructor(x, y, radius, speed, angle) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed = speed;
        this.angle = angle;
        this.birthTime = performance.now();
    }
    update(canvasWidth, canvasHeight) {
        this.x += this.speed * Math.cos(this.angle);
        this.y += this.speed * Math.sin(this.angle);
        // Wrap around screen
        if (this.x < 0)
            this.x = canvasWidth;
        if (this.x > canvasWidth)
            this.x = 0;
        if (this.y < 0)
            this.y = canvasHeight;
        if (this.y > canvasHeight)
            this.y = 0;
    }
}
class Asteroid {
    constructor(x, y, radius, speed, angle) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed = speed;
        this.angle = angle;
        this.shape = this.generateRockShape(); // Generate rock shape for the asteroid
    }
    generateRockShape() {
        const numPoints = Math.floor(Math.random() * 5) + 5; // Random number of points for the rock
        const rockShape = [];
        for (let i = 0; i < numPoints; i++) {
            const angle = (i / numPoints) * Math.PI * 2;
            const deviation = Math.random() * this.radius * 0.6; // Random deviation from the radius
            const x = Math.cos(angle) * (this.radius + deviation);
            const y = Math.sin(angle) * (this.radius + deviation);
            rockShape.push([x, y]);
        }
        return rockShape;
    }
    update(canvasWidth, canvasHeight) {
        this.x += this.speed * Math.cos(this.angle);
        this.y += this.speed * Math.sin(this.angle);
        if (this.x < 0)
            this.x = canvasWidth;
        if (this.x > canvasWidth)
            this.x = 0;
        if (this.y < 0)
            this.y = canvasHeight;
        if (this.y > canvasHeight)
            this.y = 0;
    }
}
class Ship {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 20;
        this.rotation = Math.random() * Math.PI * 2; // Random initial rotation
        this.speedX = 0;
        this.speedY = 0;
        this.rotationSpeed = 0.05;
        this.maxSpeed = 5;
        this.friction = 0.99;
        this.alive = true;
        this.thrustParticles = [];
    }
    createThrustParticle() {
        const angle = this.rotation + Math.PI;
        const speed = Math.random() * 2 + 1;
        this.thrustParticles.push(new Particle(this.x + Math.cos(angle) * this.radius, this.y + Math.sin(angle) * this.radius, -Math.cos(angle) * speed, -Math.sin(angle) * speed, 60));
    }
    update(keys, canvasWidth, canvasHeight) {
        if (!this.alive)
            return;
        if (keys.ArrowLeft)
            this.rotation -= this.rotationSpeed;
        if (keys.ArrowRight)
            this.rotation += this.rotationSpeed;
        if (keys.ArrowUp) {
            this.speedX += Math.cos(this.rotation) * 0.1;
            this.speedY += Math.sin(this.rotation) * 0.1;
            this.createThrustParticle();
            const speed = Math.sqrt(this.speedX * this.speedX + this.speedY * this.speedY);
            if (speed > this.maxSpeed) {
                const angle = Math.atan2(this.speedY, this.speedX);
                this.speedX = Math.cos(angle) * this.maxSpeed;
                this.speedY = Math.sin(angle) * this.maxSpeed;
            }
        }
        else {
            this.speedX *= this.friction;
            this.speedY *= this.friction;
        }
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0)
            this.x = canvasWidth;
        if (this.x > canvasWidth)
            this.x = 0;
        if (this.y < 0)
            this.y = canvasHeight;
        if (this.y > canvasHeight)
            this.y = 0;
        this.thrustParticles = this.thrustParticles.filter((particle) => {
            particle.update();
            return !particle.isDead();
        });
    }
    draw(ctx) {
        if (this.alive) {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            ctx.beginPath();
            ctx.moveTo(this.radius, 0);
            ctx.lineTo(-this.radius, this.radius / 2);
            ctx.lineTo(-this.radius, -this.radius / 2);
            ctx.closePath();
            ctx.strokeStyle = "white";
            ctx.stroke();
            ctx.restore();
        }
        this.thrustParticles.forEach((particle) => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fillStyle = "orange";
            ctx.fill();
        });
    }
}
class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ship = new Ship(this.canvas.width / 2, this.canvas.height / 2);
        this.asteroids = [];
        this.bullets = [];
        this.keys = {
            ArrowUp: false,
            ArrowDown: false,
            ArrowLeft: false,
            ArrowRight: false,
            Space: false,
            r: false
        };
        this.victory = false;
        window.addEventListener("keydown", (e) => {
            if (this.keys.hasOwnProperty(e.key))
                this.keys[e.key] = true;
            if (e.key === " " && !e.repeat)
                this.ship.alive && !this.victory ? this.shoot() : this.resetGame();
        });
        window.addEventListener("keyup", (e) => {
            if (this.keys.hasOwnProperty(e.key))
                this.keys[e.key] = false;
        });
        this.createAsteroids(5);
        this.gameLoop();
    }
    createAsteroids(num) {
        this.asteroids = [];
        for (let i = 0; i < num; i++) {
            const radius = Math.random() * 30 + 15;
            this.asteroids.push(new Asteroid(Math.random() * this.canvas.width, Math.random() * this.canvas.height, radius, Math.random() * 2 + 1, Math.random() * Math.PI * 2));
        }
    }
    fragmentAsteroid(asteroid) {
        if (asteroid.radius > 15) {
            const count = 1 + Math.ceil(Math.random() * 4);
            for (let i = 0; i < count; i++) {
                this.asteroids.push(new Asteroid(asteroid.x, asteroid.y, asteroid.radius / count ** 0.5, Math.random() * 2 + 1, Math.random() * Math.PI * 2));
            }
        }
    }
    shoot() {
        if (this.ship.alive) {
            this.bullets.push(new Bullet(this.ship.x, this.ship.y, 5, 7, this.ship.rotation));
        }
    }
    resetGame() {
        this.ship = new Ship(this.canvas.width / 2, this.canvas.height / 2);
        this.createAsteroids(5);
        this.bullets = [];
        this.victory = false;
        this.gameLoop();
    }
    checkVictory() {
        if (this.asteroids.length === 0) {
            this.victory = true;
        }
    }
    update() {
        this.ship.update(this.keys, this.canvas.width, this.canvas.height);
        this.asteroids.forEach((asteroid) => {
            asteroid.update(this.canvas.width, this.canvas.height);
        });
        this.bullets.forEach((bullet) => {
            bullet.update(this.canvas.width, this.canvas.height);
        });
        this.removeAgedBullets();
        this.checkCollisions();
        this.checkVictory();
    }
    removeAgedBullets() {
        const oldTime = performance.now() - 2000;
        this.bullets.forEach((bullet, bulletIndex) => {
            if (oldTime > bullet.birthTime)
                this.bullets.splice(bulletIndex, 1);
        });
    }
    checkCollisions() {
        this.bullets.forEach((bullet, bulletIndex) => {
            this.asteroids.forEach((asteroid, asteroidIndex) => {
                const dx = bullet.x - asteroid.x;
                const dy = bullet.y - asteroid.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < bullet.radius + asteroid.radius) {
                    this.fragmentAsteroid(asteroid);
                    this.asteroids.splice(asteroidIndex, 1);
                    this.bullets.splice(bulletIndex, 1);
                }
            });
        });
        this.asteroids.forEach((asteroid) => {
            const dx = this.ship.x - asteroid.x;
            const dy = this.ship.y - asteroid.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < this.ship.radius + asteroid.radius) {
                this.ship.alive = false;
            }
        });
    }
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ship.draw(this.ctx);
        this.asteroids.forEach((asteroid) => {
            const rockShape = asteroid.shape;
            this.drawRock(this.ctx, asteroid.x, asteroid.y, asteroid.radius, rockShape);
        });
        this.bullets.forEach((bullet) => {
            this.ctx.beginPath();
            this.ctx.arc(bullet.x, bullet.y, bullet.radius, 0, Math.PI * 2);
            this.ctx.closePath();
            this.ctx.fillStyle = "white";
            this.ctx.fill();
        });
        if (this.victory) {
            this.drawVictory();
        }
        else if (!this.ship.alive) {
            this.drawGameOver();
        }
    }
    drawRock(ctx, x, y, radius, rockShape) {
        ctx.beginPath();
        ctx.moveTo(x + rockShape[0][0], y + rockShape[0][1]);
        for (let i = 1; i < rockShape.length; i++) {
            const [dx, dy] = rockShape[i];
            ctx.lineTo(x + dx, y + dy);
        }
        ctx.closePath();
        ctx.strokeStyle = "white";
        ctx.stroke();
    }
    drawGameOver() {
        this.ctx.fillStyle = "red";
        this.ctx.font = "48px sans-serif";
        this.ctx.textAlign = "center";
        this.ctx.fillText("Game Over", this.canvas.width / 2, this.canvas.height / 2);
    }
    drawVictory() {
        this.ctx.fillStyle = "green";
        this.ctx.font = "48px sans-serif";
        this.ctx.textAlign = "center";
        this.ctx.fillText("Victory!", this.canvas.width / 2, this.canvas.height / 2);
    }
    gameLoop() {
        this.update();
        this.draw();
        if (this.ship.alive && !this.victory) {
            requestAnimationFrame(() => this.gameLoop());
        }
    }
}
const game = new Game("gameCanvas");