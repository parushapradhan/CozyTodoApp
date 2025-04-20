// public/js/game.js
window.addEventListener('load', () => {
    const config = {
      type: Phaser.AUTO,
      parent: 'game-content',
      width: 256,           
      height: 256,
      zoom: 3,
      pixelArt: true,           
      physics: {
        default: 'arcade',
        arcade: { gravity: { y: 0 }, debug: false , debugShowBody: false}
      },
      scene: { preload, create, update }
    };
  
    const game = new Phaser.Game(config);
  
    let cursors, keyE, player, interactiveObj, decoration;
  
    function preload() {
        // --- Level JSON & Tileset Images ---
        this.load.tilemapTiledJSON('level0', '/Level_0.json');
        this.load.image('furniture', '/assets/images/wizard/Interior/furniture.png');
        this.load.image('floors', '/assets/images/wizard/Interior/floors.png');


      // this.load.spritesheet('Entity2Sprite', '/assets/sprites/entity2_anim.png', { frameWidth: 64, frameHeight: 64 });
      
      // --- Load other game assets ---
        //   PlAYER IDLE
        this.load.spritesheet('player_idle_left', '/assets/images/wizard/character/idle/ROLEWORLD_MC_SKIN_PALE_WIZARD_IDLE_LEFT.png', { frameWidth: 16, frameHeight: 30 });
        this.load.spritesheet('player_idle_right', '/assets/images/wizard/character/idle/ROLEWORLD_MC_SKIN_PALE_WIZARD_IDLE_RIGHT.png', { frameWidth: 16, frameHeight: 30 });
        this.load.spritesheet('player_idle_front', '/assets/images/wizard/character/idle/ROLEWORLD_MC_SKIN_PALE_WIZARD_IDLE_FRONT.png', { frameWidth: 16, frameHeight: 30 });   
        this.load.spritesheet('player_idle_back', '/assets/images/wizard/character/idle/ROLEWORLD_MC_SKIN_PALE_WIZARD_IDLE_BACK.png', { frameWidth: 16, frameHeight: 30 });
   

        //   PLAYER WALKING
        this.load.spritesheet('player_walk_left', '/assets/images/wizard/character/walk/ROLEWORLD_MC_SKIN PALE_WIZARD WALK LEFT.png', { frameWidth: 16, frameHeight: 30 });
        this.load.spritesheet('player_walk_right', '/assets/images/wizard/character/walk/ROLEWORLD_MC_SKIN PALE_WIZARD WALK RIGHT.png', { frameWidth: 16, frameHeight: 30 });
        this.load.spritesheet('player_walk_front', '/assets/images/wizard/character/walk/ROLEWORLD_MC_SKIN PALE_WIZARD WALK FRONT.png', { frameWidth: 16, frameHeight: 30 });
        this.load.spritesheet('player_walk_back', '/assets/images/wizard/character/walk/ROLEWORLD_MC_SKIN PALE_WIZARD WALK BACK.png', { frameWidth: 16, frameHeight: 30 });
        

        //Animated Objects
        this.load.spritesheet('animated_basement', '/assets/images/wizard/animations/ROLEWORLD_WIZARD_ANIMATED INTERIOR_BASEMENT.png', { frameWidth: 32, frameHeight: 48 });
        this.load.spritesheet('animated_blue_book', '/assets/images/wizard/animations/ROLEWORLD_WIZARD_ANIMATED INTERIOR_BLUE BOOK.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('animated_water_pump','/assets/images/wizard/animations/ROLEWORLD_WIZARD_ANIMATED INTERIOR_BLUE WATER PUMP.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('animated_candle1', '/assets/images/wizard/animations/ROLEWORLD_WIZARD_ANIMATED INTERIOR_CANDLE 1.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('animated_candle2', '/assets/images/wizard/animations/ROLEWORLD_WIZARD_ANIMATED INTERIOR_CANDLE 2.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('animated_candle3', '/assets/images/wizard/animations/ROLEWORLD_WIZARD_ANIMATED INTERIOR_CANDLE 3.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('animated_candle4', '/assets/images/wizard/animations/ROLEWORLD_WIZARD_ANIMATED INTERIOR_CANDLE 4.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('animated_cauldron1', '/assets/images/wizard/animations/ROLEWORLD_WIZARD_ANIMATED INTERIOR_CAULDRON 1.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('animated_cauldron2', '/assets/images/wizard/animations/ROLEWORLD_WIZARD_ANIMATED INTERIOR_CAULDRON 2.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('animated_cauldron3', '/assets/images/wizard/animations/ROLEWORLD_WIZARD_ANIMATED INTERIOR_CAULDRON 3.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('animated_chest1', '/assets/images/wizard/animations/ROLEWORLD_WIZARD_ANIMATED INTERIOR_CHEST 1.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('animated_fireplace', '/assets/images/wizard/animations/ROLEWORLD_WIZARD_ANIMATED INTERIOR_FIREPLACE.png', { frameWidth: 48, frameHeight: 30 });
        
        //interactive fireplace
        this.load.spritesheet('fireplace_on', '/assets/images/wizard/animations/fireplace.png', { frameWidth: 112, frameHeight: 112 });

        // DOZY
        this.load.image('dozy_sheet', '/assets/images/dozy/dozy_happy_wag.png');
        this.load.spritesheet('dozy_happy', '/assets/images/dozy/dozy_happy_wag.png', { frameWidth: 80, frameHeight: 80 });
        this.load.spritesheet('dozy_sitting_east', '/assets/images/dozy/dozy_sitting_east.png', { frameWidth: 80, frameHeight: 80 });
        this.load.spritesheet('dozy_sleep_east', '/assets/images/dozy/dozy_sleep_west.png', { frameWidth: 80, frameHeight: 80 });
        this.load.spritesheet('dozy_sleeping', '/assets/images/dozy/dozy_sleeping.png', { frameWidth: 80, frameHeight: 80 });
        this.load.spritesheet('dozy_wag_east', '/assets/images/dozy/dozy_wag_east.png', { frameWidth: 80, frameHeight: 80 });
        this.load.spritesheet('dozy_wag_tail_north', '/assets/images/dozy/dozy_wag_tail_north.png', { frameWidth: 80, frameHeight: 80 });
        
        // Load decoration image
        // this.load.image('decoration', '/assets/images/interior.png');
       // Load interactive object spritesheet
        // this.load.spritesheet('interactive', '/assets/interactive.png', { frameWidth: 32, frameHeight: 32 });
    }
  
    function create() {
      // this.physics.world.setBounds(x, y, width, height);
      // this.physics.world.setBoundsCollision();
// this.physics.world.setBoundsCollision(left, right, up, down);


      // this.physics.world.setBounds(x, y, width, height, checkLeft, checkRight, checkUp, checkDown);

      
      cursors = this.input.keyboard.createCursorKeys();
      keys = this.input.keyboard.addKeys({
        A: Phaser.Input.Keyboard.KeyCodes.A,
        S: Phaser.Input.Keyboard.KeyCodes.S,
        D: Phaser.Input.Keyboard.KeyCodes.D,
        W: Phaser.Input.Keyboard.KeyCodes.W
      });

      // --- Create the Tilemap ---
      const map = this.make.tilemap({ key: 'level0' });
      const furnitureTileset = map.addTilesetImage('ROLEWORLD_WIZARD_INTERIOR_ASSET', 'furniture');
      const floorsTileset = map.addTilesetImage('ROLEWORLD_WIZARD_INTERIOR_TILESET', 'floors');
      map.createLayer('Floor_1', floorsTileset, 0, 0);
      map.createLayer('Floor_2', floorsTileset, 0, 0);
      map.createLayer('Furniture_1', furnitureTileset, 0, 0);
      map.createLayer('Furniture_2', furnitureTileset, 0, 0);
      map.createLayer('Furniture_3', furnitureTileset, 0, 0);
      map.createLayer('Furniture_4', furnitureTileset, 0, 0);
      this.cameras.main.setBackgroundColor('#e3c7c7');
              // CREATE COLLISIONS 
  
        const obstacles = this.physics.add.staticGroup();
        // Bed (top-left)
        obstacles.create(45, 60).setSize(40, 60).setOffset(-20, -30).refreshBody();
        obstacles.create(115, 150).setSize(80, 40).setOffset(-40, -20).refreshBody();
        
        //  Fireplace (top-middle)
        obstacles.create(190, 100).setSize(70, 50).setOffset(-35, -25).refreshBody();
        obstacles.create(230, 100).setSize(30, 30).setOffset(-15, -15).refreshBody();
        
        // Books at the foot of bed
        obstacles.create(30, 110).setSize(20, 20).setOffset(-10, -10).refreshBody();
        
        //  Staircase (bottom-right)
        obstacles.create(215, 235).setSize(50, 30).setOffset(-25, -15).refreshBody()

        // Top wall (across the entire top edge)
        const topWall = this.physics.add.staticSprite(120, 40, null)  // Centered horizontally, very top
        .setSize(256, 90)      // Full width, thin height
        .setOrigin(0.5, 0)     // Align to top
        .refreshBody();
        obstacles.add(topWall);

        // --- Create the Player ---
        // Create the player using the idle front spritesheet as the initial texture.
        player = this.physics.add.sprite(200, 150, 'player_idle_front');
        player.setSize(32, 20).setOffset(2, 10);

        player.setCollideWorldBounds(true);
        this.physics.add.collider(player, obstacles);
        this.physics.add.collider(player, topWall);


      // Create animations for walking.
      this.anims.create({
        key: 'walk-front',
        frames: this.anims.generateFrameNumbers('player_walk_front', { start: 0, end: 5 }),
        frameRate: 6,
        repeat: -1
      });

      this.anims.create({
        key: 'walk-back',
        frames: this.anims.generateFrameNumbers('player_walk_back', { start: 0, end: 5 }),
        frameRate: 6,
        repeat: -1
      });
      this.anims.create({
        key: 'walk-left',
        frames: this.anims.generateFrameNumbers('player_walk_left', { start: 0, end: 5 }),
        frameRate: 6,
        repeat: -1
      });
      this.anims.create({
        key: 'walk-right',
        frames: this.anims.generateFrameNumbers('player_walk_right', { start: 0, end: 5 }),
        frameRate: 10,
        repeat: -1
      });
      
      // Create idle "animations" (can be a single frame) so we can switch textures.
      this.anims.create({
        key: 'idle-front',
        frames: this.anims.generateFrameNumbers('player_walk_right', { start: 0, end:  5}),
        frameRate: 6
      });
      this.anims.create({
        key: 'idle-back',
        frames: [ { key: 'player_idle_back', frame: 0 } ],
        frameRate: 1
      });
      this.anims.create({
        key: 'idle-left',
        frames: [ { key: 'player_idle_left', frame: 0 } ],
        frameRate: 1
      });
      this.anims.create({
        key: 'idle-right',
        frames: [ { key: 'player_idle_right', frame: 0 } ],
        frameRate: 1
      });

      //create the animated cauldron
      this.anims.create({
        key: 'animated_blue_book',
        frames: this.anims.generateFrameNumbers('animated_blue_book', { start: 0, end: 5 }),
        frameRate: 6,
        repeat: -1
      });
      blue = this.physics.add.sprite(40, 216, 'animated_blue_book');
      blue.anims.play('animated_blue_book');
      // this.cameras.main.setZoom(1);
     

      this.anims.create({
        key: 'animated_cauldron3',
        frames: this.anims.generateFrameNumbers('animated_cauldron3', { start: 0, end: 5 }),
        frameRate: 6,
        repeat: -1
      });
      cauldron = this.physics.add.sprite(120, 150, 'animated_cauldron3');
      cauldron.anims.play('animated_cauldron3')


      //candle
      this.anims.create({
        key: 'animated_candle1',
        frames: this.anims.generateFrameNumbers('animated_candle1', { start: 0, end: 5 }),
        frameRate: 6,
        repeat: -1
      });

      this.anims.create({
        key: 'animated_candle2',
        frames: this.anims.generateFrameNumbers('animated_candle2', { start: 0, end: 5 }),
        frameRate: 6,
        repeat: -1
      });

      this.anims.create({
        key: 'animated_candle3',
        frames: this.anims.generateFrameNumbers('animated_candle3', { start: 0, end: 5 }),
        frameRate: 6,
        repeat: -1
      });

      this.anims.create({
        key: 'animated_candle4',
        frames: this.anims.generateFrameNumbers('animated_candle4', { start: 0, end: 5 }),
        frameRate: 6,
        repeat: -1
      });
      candle1 = this.physics.add.sprite(17, 141, 'animated_candle1');
      candle1.anims.play('animated_candle1')
  

      // basement
      this.anims.create({
        key: 'animated_basement',
        frames: this.anims.generateFrameNumbers('animated_basement', { start: 0, end: 5 }),
        frameRate: 6,
        repeat: -1
      });
      basement = this.physics.add.sprite(140, 220, 'animated_basement');
      basement.anims.play('animated_basement')

      //chest
      // this.anims.create({
      //   key: 'animated_chest',
      //   frames: this.anims.generateFrameNumbers('animated_chest', { start: 0, end: 5 }),
      //   frameRate: 6,
      //   repeat: -1
      // });
      // chest = this.physics.add.sprite(30, 10, 'animated_chest');
      // chest.anims.play('animated_chest')

      
      // --- Create the Draggable Decoration ---
      // decoration = this.add.image(200, 200, 'decoration').setInteractive();
      // this.input.setDraggable(decoration);
      // this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
      //   gameObject.x = dragX;
      //   gameObject.y = dragY;
      // });
  
      // --- Create the Interactive Object ---
      // interactiveObj = this.physics.add.sprite(200, 75, 'animated_fireplace');
      // this.anims.create({
      //   key: 'animated_fireplace',
      //   frames: this.anims.generateFrameNumbers('animated_fireplace', { start: 0, end: 5 }),
      //   frameRate: 6,
      //   repeat: -1
      // });
      // interactiveObj.anims.play('animated_fireplace');

      interactiveObj = this.physics.add.sprite(205, 60, 'fireplace_on');
      this.anims.create({
        key: 'fireplace_on',
        frames: this.anims.generateFrameNumbers('fireplace_on', { start: 0, end: 3 }),
        frameRate: 4,
        repeat: -1
      });
      interactiveObj.anims.play('fireplace_on');
      // interactiveObj.anims.pause();
      if (typeof USER !== "undefined" && USER.animal_settings.dozy === true) {
        console.log("Dozy is enabled");
        this.anims.create({
          key: 'dozy_sleeping',
          frames: this.anims.generateFrameNumbers('dozy_sleeping', { start: 0, end: 7 }),
          frameRate: 4,
          repeat: -1
        });
      
        const dozy = this.physics.add.sprite(100, 100, 'dozy_sleeping');
        dozy.anims.play('dozy_sleeping');
      }
    }
  
    function update() {
      // Reset velocity
      player.body.setVelocity(0);
      let currentDirection = 'front'; // Default direction is 'front'
      let moving = false;
      // Check movement input and switch texture & animation accordingly.
      if (cursors.left.isDown || keys.A.isDown) {
        currentDirection = 'left';
        moving = true;
        player.body.setVelocityX(-150);
        if (player.texture.key !== 'player_walk_left') {
          player.setTexture('player_walk_left');
          player.anims.play('walk-left', true);
        }
      } else if (cursors.right.isDown || keys.D.isDown) {
        player.body.setVelocityX(150);
        if (player.texture.key !== 'player_walk_right') {
          player.setTexture('player_walk_right');
          player.anims.play('walk-right', true);
        }
        currentDirection = 'right';
        moving = true;
      } else if (cursors.up.isDown || keys.W.isDown) {
        player.body.setVelocityY(-150);
        if (player.texture.key !== 'player_walk_back') {
          player.setTexture('player_walk_back');
          player.anims.play('walk-back', true);
        }
        currentDirection = 'back';
        moving = true;
      } else if (cursors.down.isDown || keys.S.isDown) {
        player.body.setVelocityY(150);
        if (player.texture.key !== 'player_walk_front') {
          player.setTexture('player_walk_front');
          player.anims.play('walk-front', true);
        }
        currentDirection = 'front';
        moving = true;
      }
      
      // If not moving, set idle texture/animation based on current direction.
      if (!moving) {
        if (currentDirection === 'left' && player.texture.key !== 'player_idle_left') {
          player.setTexture('player_idle_left');
          player.anims.play('idle-left');
        } else if (currentDirection === 'right' && player.texture.key !== 'player_idle_right') {
          player.setTexture('player_idle_right');
          player.anims.play('idle-right');
        } else if (currentDirection === 'back' && player.texture.key !== 'player_idle_back') {
          player.setTexture('player_idle_back');
          player.anims.play('idle-back');
        } else if (currentDirection === 'front' && player.texture.key !== 'player_idle_front') {
          player.setTexture('player_idle_front');
          player.anims.play('idle-front');
        }
      }
    }
  });
  