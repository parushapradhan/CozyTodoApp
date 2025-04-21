// public/js/loaders/loadPlayerAssets.js
export function loadPlayerAssets(scene) {
    if (typeof USER !== "undefined" && USER.character === 'robed') {
        scene.load.spritesheet('player_idle_left', '/assets/images/wizard/characters/robed/idle/ROLEWORLD_MC_SKIN_PALE_WIZARD_IDLE_LEFT.png', { frameWidth: 16, frameHeight: 30 });
        scene.load.spritesheet('player_idle_right', '/assets/images/wizard/characters/robed/idle/ROLEWORLD_MC_SKIN_PALE_WIZARD_IDLE_RIGHT.png', { frameWidth: 16, frameHeight: 30 });
        scene.load.spritesheet('player_idle_front', '/assets/images/wizard/characters/robed/idle/ROLEWORLD_MC_SKIN_PALE_WIZARD_IDLE_FRONT.png', { frameWidth: 16, frameHeight: 30 });
        scene.load.spritesheet('player_idle_back', '/assets/images/wizard/characters/robed/idle/ROLEWORLD_MC_SKIN_PALE_WIZARD_IDLE_BACK.png', { frameWidth: 16, frameHeight: 30 });
    
        scene.load.spritesheet('player_walk_left', '/assets/images/wizard/characters/robed/walk/ROLEWORLD_MC_SKIN PALE_WIZARD WALK LEFT.png', { frameWidth: 16, frameHeight: 30 });
        scene.load.spritesheet('player_walk_right', '/assets/images/wizard/characters/robed/walk/ROLEWORLD_MC_SKIN PALE_WIZARD WALK RIGHT.png', { frameWidth: 16, frameHeight: 30 });
        scene.load.spritesheet('player_walk_front', '/assets/images/wizard/characters/robed/walk/ROLEWORLD_MC_SKIN PALE_WIZARD WALK FRONT.png', { frameWidth: 16, frameHeight: 30 });
        scene.load.spritesheet('player_walk_back', '/assets/images/wizard/characters/robed/walk/ROLEWORLD_MC_SKIN PALE_WIZARD WALK BACK.png', { frameWidth: 16, frameHeight: 30 });
    }
    else if (typeof USER !== "undefined" && USER.character === 'witch') {
        scene.load.spritesheet('player_idle_left', '/assets/images/wizard/characters/Witch/Witch Idle Sprite/ROLEWORLD_WIZARD_NPC_WITCH IDLE LEFT.png', { frameWidth: 16, frameHeight: 32 });
        scene.load.spritesheet('player_idle_right', '/assets/images/wizard/characters/Witch/Witch Idle Sprite/ROLEWORLD_WIZARD_NPC_WITCH IDLE RIGHT.png', { frameWidth: 16, frameHeight: 32 });
        scene.load.spritesheet('player_idle_front', '/assets/images/wizard/characters/Witch/Witch Idle Sprite/ROLEWORLD_WIZARD_NPC_WITCH IDLE FRONT.png', { frameWidth: 16, frameHeight: 32 });
        scene.load.spritesheet('player_idle_back', '/assets/images/wizard/characters/Witch/Witch Idle Sprite/ROLEWORLD_WIZARD_NPC_WITCH IDLE BACK.png', { frameWidth: 16, frameHeight: 32 });
    
        scene.load.spritesheet('player_walk_left', '/assets/images/wizard/characters/Witch/Witch Walk Sprite/ROLEWORLD_WIZARD_NPC_WITCH WALK LEFT.png', { frameWidth: 16, frameHeight: 30 });
        scene.load.spritesheet('player_walk_right', '/assets/images/wizard/characters/Witch/Witch Walk Sprite/ROLEWORLD_WIZARD_NPC_WITCH WALK RIGHT.png', { frameWidth: 16, frameHeight: 30 });
        scene.load.spritesheet('player_walk_front', '/assets/images/wizard/characters/Witch/Witch Walk Sprite/ROLEWORLD_WIZARD_NPC_WITCH WALK FRONT.png', { frameWidth: 16, frameHeight: 30 });
        scene.load.spritesheet('player_walk_back', '/assets/images/wizard/characters/Witch/Witch Walk Sprite/ROLEWORLD_WIZARD_NPC_WITCH WALK BACK.png', { frameWidth: 16, frameHeight: 30 });
    }
    else if (typeof USER !== "undefined" && USER.character === 'ghost') {
        scene.load.spritesheet('player_idle_left', '/assets/images/wizard/characters/Ghost/Ghost Sprite/ROLEWORLD_WIZARD_NPC_GHOST LEFT.png', { frameWidth: 16, frameHeight: 30 });
        scene.load.spritesheet('player_idle_right', '/assets/images/wizard/characters/Ghost/Ghost Sprite/ROLEWORLD_WIZARD_NPC_GHOST RIGHT.png', { frameWidth: 16, frameHeight: 30 });
        scene.load.spritesheet('player_idle_front', '/assets/images/wizard/characters/Ghost/Ghost Sprite/ROLEWORLD_WIZARD_NPC_GHOST FRONT.png', { frameWidth: 16, frameHeight: 30 });
        scene.load.spritesheet('player_idle_back', '/assets/images/wizard/characters/Ghost/Ghost Sprite/ROLEWORLD_WIZARD_NPC_GHOST BACK.png', { frameWidth: 16, frameHeight: 30 });
    }
    else{
        scene.load.spritesheet('player_idle_left', '/assets/images/wizard/characters/Wizard/Wizard Idle Sprite/ROLEWORLD_WIZARD_NPC_WIZARD IDLE LEFT.png', { frameWidth: 16, frameHeight: 30 });
        scene.load.spritesheet('player_idle_right', '/assets/images/wizard/characters/Wizard/Wizard Idle Sprite/ROLEWORLD_WIZARD_NPC_WIZARD IDLE RIGHT.png', { frameWidth: 16, frameHeight: 30 });
        scene.load.spritesheet('player_idle_front', '/assets/images/wizard/characters/Wizard/Wizard Idle Sprite/ROLEWORLD_WIZARD_NPC_WIZARD IDLE FRONT.png', { frameWidth: 16, frameHeight: 30 });
        scene.load.spritesheet('player_idle_back', '/assets/images/wizard/characters/Wizard/Wizard Idle Sprite/ROLEWORLD_WIZARD_NPC_WIZARD IDLE BACK.png', { frameWidth: 16, frameHeight: 30 });
    
        scene.load.spritesheet('player_walk_left', '/assets/images/wizard/characters/Wizard/Wizard Walk Sprite/ROLEWORLD_WIZARD_NPC_WIZARD WALK LEFT.png', { frameWidth: 16, frameHeight: 30 });
        scene.load.spritesheet('player_walk_right', '/assets/images/wizard/characters/Wizard/Wizard Walk Sprite/ROLEWORLD_WIZARD_NPC_WIZARD WALK RIGHT.png', { frameWidth: 16, frameHeight: 30 });
        scene.load.spritesheet('player_walk_front', '/assets/images/wizard/characters/Wizard/Wizard Walk Sprite/ROLEWORLD_WIZARD_NPC_WIZARD WALK FRONT.png', { frameWidth: 16, frameHeight: 30 });
        scene.load.spritesheet('player_walk_back', '/assets/images/wizard/characters/Wizard/Wizard Walk Sprite/ROLEWORLD_WIZARD_NPC_WIZARD WALK BACK.png', { frameWidth: 16, frameHeight: 30 });
    }
  }
  

export function loadAnimalAssets(scene) {

}