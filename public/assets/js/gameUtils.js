// public/js/loaders/loadPlayerAssets.js
export function loadPlayerAssets(scene) {
    if (typeof USER !== "undefined" && USER.character === 'robed') {
        scene.load.spritesheet('player_idle_left', '/assets/images/wizard/characters/robed/idle/ROLEWORLD_MC_SKIN_PALE_WIZARD_IDLE_LEFT.png', { frameWidth: 16, frameHeight: 32 });
        scene.load.spritesheet('player_idle_right', '/assets/images/wizard/characters/robed/idle/ROLEWORLD_MC_SKIN_PALE_WIZARD_IDLE_RIGHT.png', { frameWidth: 16, frameHeight: 32 });
        scene.load.spritesheet('player_idle_front', '/assets/images/wizard/characters/robed/idle/ROLEWORLD_MC_SKIN_PALE_WIZARD_IDLE_FRONT.png', { frameWidth: 16, frameHeight: 32 });
        scene.load.spritesheet('player_idle_back', '/assets/images/wizard/characters/robed/idle/ROLEWORLD_MC_SKIN_PALE_WIZARD_IDLE_BACK.png', { frameWidth: 16, frameHeight: 32 });
    
        scene.load.spritesheet('player_walk_left', '/assets/images/wizard/characters/robed/walk/ROLEWORLD_MC_SKIN PALE_WIZARD WALK LEFT.png', { frameWidth: 16, frameHeight: 32 });
        scene.load.spritesheet('player_walk_right', '/assets/images/wizard/characters/robed/walk/ROLEWORLD_MC_SKIN PALE_WIZARD WALK RIGHT.png', { frameWidth: 16, frameHeight: 32 });
        scene.load.spritesheet('player_walk_front', '/assets/images/wizard/characters/robed/walk/ROLEWORLD_MC_SKIN PALE_WIZARD WALK FRONT.png', { frameWidth: 16, frameHeight: 32 });
        scene.load.spritesheet('player_walk_back', '/assets/images/wizard/characters/robed/walk/ROLEWORLD_MC_SKIN PALE_WIZARD WALK BACK.png', { frameWidth: 16, frameHeight: 32 });
    }
    else if (typeof USER !== "undefined" && USER.character === 'witch') {
        scene.load.spritesheet('player_idle_left', '/assets/images/wizard/characters/Witch/Witch Idle Sprite/ROLEWORLD_WIZARD_NPC_WITCH IDLE LEFT.png', { frameWidth: 16, frameHeight: 32 });
        scene.load.spritesheet('player_idle_right', '/assets/images/wizard/characters/Witch/Witch Idle Sprite/ROLEWORLD_WIZARD_NPC_WITCH IDLE RIGHT.png', { frameWidth: 16, frameHeight: 32 });
        scene.load.spritesheet('player_idle_front', '/assets/images/wizard/characters/Witch/Witch Idle Sprite/ROLEWORLD_WIZARD_NPC_WITCH IDLE FRONT.png', { frameWidth: 16, frameHeight: 32 });
        scene.load.spritesheet('player_idle_back', '/assets/images/wizard/characters/Witch/Witch Idle Sprite/ROLEWORLD_WIZARD_NPC_WITCH IDLE BACK.png', { frameWidth: 16, frameHeight: 32 });
    
        scene.load.spritesheet('player_walk_left', '/assets/images/wizard/characters/Witch/Witch Walk Sprite/ROLEWORLD_WIZARD_NPC_WITCH WALK LEFT.png', { frameWidth: 16, frameHeight: 32 });
        scene.load.spritesheet('player_walk_right', '/assets/images/wizard/characters/Witch/Witch Walk Sprite/ROLEWORLD_WIZARD_NPC_WITCH WALK RIGHT.png', { frameWidth: 16, frameHeight: 32 });
        scene.load.spritesheet('player_walk_front', '/assets/images/wizard/characters/Witch/Witch Walk Sprite/ROLEWORLD_WIZARD_NPC_WITCH WALK FRONT.png', { frameWidth: 16, frameHeight: 32 });
        scene.load.spritesheet('player_walk_back', '/assets/images/wizard/characters/Witch/Witch Walk Sprite/ROLEWORLD_WIZARD_NPC_WITCH WALK BACK.png', { frameWidth: 16, frameHeight: 32 });
    }
    else if (typeof USER !== "undefined" && USER.character === 'ghost') {
        scene.load.spritesheet('player_idle_left', '/assets/images/wizard/characters/Ghost/Ghost Sprite/ROLEWORLD_WIZARD_NPC_GHOST LEFT.png', { frameWidth: 16, frameHeight: 32 });
        scene.load.spritesheet('player_idle_right', '/assets/images/wizard/characters/Ghost/Ghost Sprite/ROLEWORLD_WIZARD_NPC_GHOST RIGHT.png', { frameWidth: 16, frameHeight: 32 });
        scene.load.spritesheet('player_idle_front', '/assets/images/wizard/characters/Ghost/Ghost Sprite/ROLEWORLD_WIZARD_NPC_GHOST FRONT.png', { frameWidth: 16, frameHeight: 32 });
        scene.load.spritesheet('player_idle_back', '/assets/images/wizard/characters/Ghost/Ghost Sprite/ROLEWORLD_WIZARD_NPC_GHOST BACK.png', { frameWidth: 16, frameHeight: 32 });
        scene.load.spritesheet('player_walk_left', '/assets/images/wizard/characters/Ghost/Ghost Sprite/ROLEWORLD_WIZARD_NPC_GHOST LEFT.png', { frameWidth: 16, frameHeight: 32 });
        scene.load.spritesheet('player_walk_right', '/assets/images/wizard/characters/Ghost/Ghost Sprite/ROLEWORLD_WIZARD_NPC_GHOST RIGHT.png', { frameWidth: 16, frameHeight: 32 });
        scene.load.spritesheet('player_walk_front', '/assets/images/wizard/characters/Ghost/Ghost Sprite/ROLEWORLD_WIZARD_NPC_GHOST FRONT.png', { frameWidth: 16, frameHeight: 32 });
        scene.load.spritesheet('player_walk_back', '/assets/images/wizard/characters/Ghost/Ghost Sprite/ROLEWORLD_WIZARD_NPC_GHOST BACK.png', { frameWidth: 16, frameHeight: 32 });
    }
    else{
        scene.load.spritesheet('player_idle_left', '/assets/images/wizard/characters/Wizard/Wizard Idle Sprite/ROLEWORLD_WIZARD_NPC_WIZARD IDLE LEFT.png', { frameWidth: 16, frameHeight: 32 });
        scene.load.spritesheet('player_idle_right', '/assets/images/wizard/characters/Wizard/Wizard Idle Sprite/ROLEWORLD_WIZARD_NPC_WIZARD IDLE RIGHT.png', { frameWidth: 16, frameHeight: 32 });
        scene.load.spritesheet('player_idle_front', '/assets/images/wizard/characters/Wizard/Wizard Idle Sprite/ROLEWORLD_WIZARD_NPC_WIZARD IDLE FRONT.png', { frameWidth: 16, frameHeight: 32 });
        scene.load.spritesheet('player_idle_back', '/assets/images/wizard/characters/Wizard/Wizard Idle Sprite/ROLEWORLD_WIZARD_NPC_WIZARD IDLE BACK.png', { frameWidth: 16, frameHeight: 32 });
    
        scene.load.spritesheet('player_walk_left', '/assets/images/wizard/characters/Wizard/Wizard Walk Sprite/ROLEWORLD_WIZARD_NPC_WIZARD WALK LEFT.png', { frameWidth: 16, frameHeight: 32 });
        scene.load.spritesheet('player_walk_right', '/assets/images/wizard/characters/Wizard/Wizard Walk Sprite/ROLEWORLD_WIZARD_NPC_WIZARD WALK RIGHT.png', { frameWidth: 16, frameHeight: 32 });
        scene.load.spritesheet('player_walk_front', '/assets/images/wizard/characters/Wizard/Wizard Walk Sprite/ROLEWORLD_WIZARD_NPC_WIZARD WALK FRONT.png', { frameWidth: 16, frameHeight: 32 });
        scene.load.spritesheet('player_walk_back', '/assets/images/wizard/characters/Wizard/Wizard Walk Sprite/ROLEWORLD_WIZARD_NPC_WIZARD WALK BACK.png', { frameWidth: 16, frameHeight: 32 });
    }
  }
  

export function loadAnimalAssets(scene) {
    if (typeof USER !== "undefined" && USER.animal === 'dozy') {
        scene.load.spritesheet('dozy_sleep_east', '/assets/images/animals/dozy_sleeping.png', { frameWidth: 80, frameHeight: 80 });
    }
    if (typeof USER !== "undefined" && USER.animal === 'henrietta') {
        scene.load.spritesheet('henrietta_sleep_east', '/assets/images/animals/henrietta.png', { frameWidth: 80, frameHeight: 80 });
    }
    if (typeof USER !== "undefined" && USER.animal === 'capybara') {
        scene.load.spritesheet('capybara_sleep_east', '/assets/images/animals/capybara.png', { frameWidth: 80, frameHeight: 80 });
    }
    if (typeof USER !== "undefined" && USER.animal === 'calico') {
        scene.load.spritesheet('calico_sleep_east', '/assets/images/animals/calico_cat.png', { frameWidth: 80, frameHeight: 80 });
    }
    if (typeof USER !== "undefined" && USER.animal === 'siamese') {
        scene.load.spritesheet('siamese_sleep_east', '/assets/images/animals/siamese_cat.png', { frameWidth: 80, frameHeight: 80 });
    }
}

export function playAnimalAnimation(scene) {
    if (typeof USER !== "undefined" && USER.animal === 'dozy') {
        scene.anims.create({
        key: 'dozy_sleeping',
        frames: this.anims.generateFrameNumbers('dozy_sleeping', { start: 0, end: 7 }),
        frameRate: 4,
        repeat: -1
        });
        const dozy = scene.physics.add.sprite(100, 100, 'dozy_sleeping');
        dozy.anims.play('dozy_sleeping');
    }
    if (typeof USER !== "undefined" && USER.animal === 'henrietta') {
        scene.anims.create({
        key: 'henrietta_sleep_east',
        frames: this.anims.generateFrameNumbers('henrietta_sleep_east', { start: 0, end: 7 }),
        frameRate: 4,
        repeat: -1
        });
        const henrietta = scene.physics.add.sprite(100, 100, 'henrietta_sleep_east');
        henrietta.anims.play('henrietta_sleep_east');
    }
    if (typeof USER !== "undefined" && USER.animal === 'calico') {
        scene.anims.create({
        key: 'calico_sleep_east',
        frames: this.anims.generateFrameNumbers('calico_sleep_east', { start: 0, end: 7 }),
        frameRate: 4,
        repeat: -1
        });
        const calico = scene.physics.add.sprite(100, 100, 'calico_sleep_east');
        calico.anims.play('calico_sleep_east');
    }
    if (typeof USER !== "undefined" && USER.animal === 'siamese') {
        scene.anims.create({
        key: 'siamese_sleep_east',
        frames: this.anims.generateFrameNumbers('siamese_sleep_east', { start: 0, end: 7 }),
        frameRate: 4,
        repeat: -1
        });
        const siamese = scene.physics.add.sprite(100, 100, 'siamese_sleep_east');
        siamese.anims.play('dozy_sleeping');
    }
    if (typeof USER !== "undefined" && USER.animal === 'capybara') {
        scene.anims.create({
        key: 'capybara_sleep_east',
        frames: this.anims.generateFrameNumbers('capybara_sleep_east', { start: 0, end: 7 }),
        frameRate: 4,
        repeat: -1
        });
        const capybara = scene.physics.add.sprite(100, 100, 'capybara_sleep_east');
        capybara.anims.play('capybara_sleep_east');
    }
}