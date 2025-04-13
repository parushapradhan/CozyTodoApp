export class Bird extends ex.Actor {
    constructor() {
        super({
            pos: ex.vec(200, 300),
            width: 16, // for now we'll use a box so we can see the rotation
            height: 16, // later we'll use a circle collider
            color: ex.Color.Yellow
        })
    }}



const game = new ex.Engine({
    width: 400,
    height: 500,
    backgroundColor: ex.Color.fromHex("#54C0CA"),
    pixelArt: true,
    pixelRatio: 2,
    displayMode: ex.DisplayMode.FitScreen
  });

const ldtkMap = new LdtkResource('/Level_0.ldtkl');
const loader = new ex.Loader([ldtkMap]);
const bird = new Bird();
game.start(loader).then(() => {
    ldtkMap.addToScene(game.currentScene);
});
game.start();