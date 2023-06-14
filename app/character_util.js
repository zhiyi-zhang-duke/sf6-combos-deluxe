export function getCharacterData(filename) {
    const character = filename.replace('.json', '');

    const characterData = {
      blanka: require('../character_data/blanka.json'),
      cammy: require('../character_data/cammy.json'),
      'chun-li': require('../character_data/chun-li.json'),
      deejay: require('../character_data/deejay.json'),
      dhasim: require('../character_data/dhasim.json'),
      'e_honda': require('../character_data/e_honda.json'),
      guile: require('../character_data/guile.json'),
      jamie: require('../character_data/jamie.json'),
      jp: require('../character_data/jp.json'),
      juri: require('../character_data/juri.json'),
      ken: require('../character_data/ken.json'),
      kimberly: require('../character_data/kimberly.json'),
      lily: require('../character_data/lily.json'),
      luke: require('../character_data/luke.json'),
      manon: require('../character_data/manon.json'),
      marisa: require('../character_data/marisa.json'),
      ryu: require('../character_data/ryu.json'),
      zangief: require('../character_data/zangief.json'),
    };
  
    if (characterData.hasOwnProperty(character)) {
      return characterData[character];
    }
    return {};
  }
  