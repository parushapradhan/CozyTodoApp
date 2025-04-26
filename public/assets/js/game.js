// // public/js/game.js
import { Bedroom } from './scenes/bedroom.js';
import { Basement } from './scenes/basement.js';
import { Kitchen } from './scenes/kitchen.js';
let cursors, keys, keyE, player, interactiveObj, decoration;
let blue, cauldron, candle1, basement;
// import { USER } from './user.js'; // Assuming you have a user.js file that exports the USER object
window.addEventListener('load', () => {
    const config = {
      type: Phaser.AUTO,
      parent: 'game-content',
      width: 208,           
      height: 208,
      zoom: 3,
      pixelArt: true,           
      physics: {
        default: 'arcade',
        arcade: { gravity: { y: 0 }, debug: false , debugShowBody: false}
      },
      scene: [Basement, Kitchen, Bedroom, ]
    };
  
    const game = new Phaser.Game(config);
  
    let cursors, keyE, player, interactiveObj, decoration;
  });
  