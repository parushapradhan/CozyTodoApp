class GameEngine {
    constructor(canvasId, width, height) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = width;
        this.canvas.height = height;

        this.tileMap = new TileMap(32); // 32x32 tile size
        this.player = new Player(128, 128); // Player starts at (128,128)

        this.start();
    }

    start() {
        requestAnimationFrame(() => this.gameLoop());
    }

    gameLoop() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.tileMap.draw(this.ctx);
        this.player.update();
        this.player.draw(this.ctx);
        
        requestAnimationFrame(() => this.gameLoop());
    }
}

export class Tile {
    constructor(type, imagePath, x, y, tileSize) {
        this.type = type;
        this.image = new Image();
        this.image.src = imagePath;
        this.x = x;
        this.y = y;
        this.tileSize = tileSize;
    }

    draw(ctx) {
        if (this.image.complete) {
            ctx.drawImage(this.image, this.x * this.tileSize, this.y * this.tileSize, this.tileSize, this.tileSize);
        }
    }
}


class TileMap {
    constructor(tileSize) {
        this.tileSize = tileSize;
        this.tiles = {};

        // Define tile types with associated images
        this.tileImages = {
            1: "grass.png",
            2: "stone.png",
            3: "water.png",
            4: "sand.png",
            5: "dirt.png"
        };

        this.map = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [1, 2, 3, 3, 3, 3, 3, 3, 2, 1],
            [1, 2, 3, 4, 4, 4, 3, 3, 2, 1],
            [1, 2, 3, 4, 5, 4, 3, 3, 2, 1],
            [1, 2, 3, 4, 4, 4, 3, 3, 2, 1],
            [1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ];

        this.loadTileImages();
    }

    loadTileImages() {
        for (const [tileType, imagePath] of Object.entries(this.tileImages)) {
            const img = new Image();
            img.src = imagePath;
            this.tiles[tileType] = img;
        }
    }

    draw(ctx) {
        for (let y = 0; y < this.map.length; y++) {
            for (let x = 0; x < this.map[y].length; x++) {
                let tileType = this.map[y][x];
                let img = this.tiles[tileType];

                if (img.complete) { // Draw only if the image is loaded
                    ctx.drawImage(img, x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
                }
            }
        }
    }
}

class Sprite {
    constructor(imageSrc, frameCount) {
        this.image = new Image();
        this.image.src = imageSrc;
        this.frameCount = frameCount;
        this.frameIndex = 0;
        this.frameCountTracker = 0;
        this.frameSpeed = 10;
    }

    animate() {
        this.frameCountTracker++;
        if (this.frameCountTracker % this.frameSpeed === 0) {
            this.frameIndex = (this.frameIndex + 1) % this.frameCount;
        }
    }

    draw(ctx, x, y, size) {
        ctx.drawImage(
            this.image,
            this.frameIndex * size, 0, size, size,
            x, y, size, size
        );
    }
}

class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.speed = 4;
        this.size = 32;
        this.sprite = new Sprite("character.png", 4); // Load character spritesheet
        this.setupInput();
    }

    setupInput() {
        window.addEventListener("keydown", (event) => {
            switch (event.key) {
                case "ArrowLeft": this.x -= this.speed; break;
                case "ArrowRight": this.x += this.speed; break;
                case "ArrowUp": this.y -= this.speed; break;
                case "ArrowDown": this.y += this.speed; break;
            }
        });
    }

    update() {
        this.sprite.animate();
    }

    draw(ctx) {
        this.sprite.draw(ctx, this.x, this.y, this.size);
    }
}

// Start the game
window.onload = () => new GameEngine("gameCanvas", 320, 320);
