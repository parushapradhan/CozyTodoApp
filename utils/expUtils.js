exports.checkExpLevel = (user) => {
  const exp = user.music_settings.exp;
  let level = user.music_settings.level;

  if (exp >= 200 && level === 1) {
    user.music_settings.level = 2;
  }
  if (exp >= 400 && level === 2) {
    user.music_settings.level = 3;
  }
  if (exp >= 600 && level === 3) {
    user.music_settings.level = 4;
  }
  if (exp >= 800 && level === 4) {
    user.music_settings.level = 5;
  }
};
