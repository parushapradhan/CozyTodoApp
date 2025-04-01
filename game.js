  // Scale factor: enlarges each 16x16 tile to (16*scale)x(16*scale) pixels.
  const scale = 2;

  let mapData;
  let tilesetImages = {};
  let spriteImage;
  let spriteLoaded = false;
  let lastTime = 0;

  // Define an animated sprite with frame dimensions 48x32.
  const sprite = {
    x: 170 ,    // Sprite position (in pixels on canvas)
    y: 60,
    width: 48,   // Each frame's width in the sprite sheet
    height: 32,  // Each frame's height in the sprite sheet
    frameIndex: 0,
    frameCount: 4,       // Total frames in the animation (adjust as needed)
    frameTime: 0,        // Time accumulator for frame updates
    frameDuration: 200,  // Milliseconds per frame
    update: function(dt) {
      this.frameTime += dt;
      if (this.frameTime >= this.frameDuration) {
        this.frameTime = 0;
        this.frameIndex = (this.frameIndex + 1) % this.frameCount;
      }
    },
    draw: function(ctx) {
      // Calculate source x based on the current frame.
      const sx = this.frameIndex * this.width;
      const sy = 0;
      ctx.drawImage(
        spriteImage,
        sx, sy, this.width, this.height,
        this.x, this.y,
        this.width * scale, this.height * scale
      );
    }
  };

  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");

  // Load the JSON tilemap.
  fetch('Level_0.json')
    .then(response => response.json())
    .then(data => {
      mapData = data;
      // Resize the canvas based on the map dimensions and scale.
      canvas.width = mapData.width * mapData.tilewidth * scale;
      canvas.height = mapData.height * mapData.tileheight * scale;
      loadTilesets(mapData.tilesets);
    })
    .catch(err => console.error("Error loading JSON:", err));

  // Load each tileset image.
  function loadTilesets(tilesets) {
    let imagesToLoad = tilesets.length;
    tilesets.forEach(tileset => {
      const img = new Image();
      img.src = tileset.image; // Ensure this path is correct relative to your HTML file
      img.onload = () => {
        tilesetImages[tileset.name] = img;
        imagesToLoad--;
        if (imagesToLoad === 0) {
          // After all tileset images load, load the sprite.
          loadSprite();
        }
      };
      img.onerror = () => {
        console.error("Failed to load image:", tileset.image);
        imagesToLoad--;
        if (imagesToLoad === 0) {
          loadSprite();
        }
      };
    });
  }

  // Load the sprite image (replace 'sprite.png' with your actual sprite sheet file).
  function loadSprite() {
    spriteImage = new Image();
    spriteImage.src = '/assets/images/wizard/Interior/AnimatedObject/fireplace.png';
    spriteImage.onload = () => {
      spriteLoaded = true;
      // Start the game loop once everything is loaded.
      requestAnimationFrame(gameLoop);
    };
    spriteImage.onerror = () => {
      console.error("Failed to load sprite image");
      // Even if the sprite fails, continue with the game loop.
      requestAnimationFrame(gameLoop);
    };
  }

  // Draw the tilemap layers.
  function drawMap() {
    const tileWidth = mapData.tilewidth;
    const tileHeight = mapData.tileheight;
    const mapWidth = mapData.width;
    const mapHeight = mapData.height;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    mapData.layers.forEach(layer => {
      if (layer.type !== "tilelayer" || !layer.visible) return;
      for (let row = 0; row < mapHeight; row++) {
        for (let col = 0; col < mapWidth; col++) {
          const index = row * mapWidth + col;
          const gid = layer.data[index];
          if (gid === 0) continue; // Skip empty tiles.
          
          // Determine which tileset the gid belongs to.
          let tileset;
          for (let i = mapData.tilesets.length - 1; i >= 0; i--) {
            if (gid >= mapData.tilesets[i].firstgid) {
              tileset = mapData.tilesets[i];
              break;
            }
          }
          if (!tileset) continue;
          
          // Calculate the local tile id within the tileset.
          const localId = gid - tileset.firstgid;
          const columns = tileset.columns;
          const sx = (localId % columns) * tileWidth;
          const sy = Math.floor(localId / columns) * tileHeight;
          const dx = col * tileWidth * scale;
          const dy = row * tileHeight * scale;
          const img = tilesetImages[tileset.name];
          ctx.drawImage(img, sx, sy, tileWidth, tileHeight, dx, dy, tileWidth * scale, tileHeight * scale);
        }
      }
    });
  }

  // Main game loop: update animations and redraw the scene.
  function gameLoop(timestamp) {
    if (!lastTime) lastTime = timestamp;
    const dt = timestamp - lastTime;
    lastTime = timestamp;
    
    // Redraw the tilemap.
    drawMap();

    // Update and draw the animated sprite on top.
    if (spriteLoaded) {
      sprite.update(dt);
      sprite.draw(ctx);
    }

    requestAnimationFrame(gameLoop);
  }