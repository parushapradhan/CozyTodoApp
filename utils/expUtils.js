
function checkExpLevel(user) {
    const exp = user.music_settings.exp;
    if (exp >= 800) {
      user.music_settings.level = 5;
    } else if (exp >= 600) {
      user.music_settings.level = 4;
    } else if (exp >= 400) {
      user.music_settings.level = 3;
    } else if (exp >= 200) {
      user.music_settings.level = 2;
    }
    return user;
  }
  
  module.exports = { checkExpLevel };
  