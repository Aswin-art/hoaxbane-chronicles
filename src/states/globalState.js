export default function globalStateManager() {
  let instance = null;

  function createInstance() {
    let freezePlayer = false;
    let locale = "english";
    let fontSize = 30;
    let previousScene = null;
    let isSonSaved = false;
    let isGhostDefeated = false;
    let monster1 = false;
    let monster2 = false;
    let monster3 = false;
    let boss = false;

    return {
      setFreezePlayer(value) {
        freezePlayer = value;
      },
      getFreezePlayer: () => freezePlayer,
      setMonster1Defeated(value) {
        monster1 = value;
      },
      getMonster1: () => monster1,
      setMonster2Defeated(value) {
        monster2 = value;
      },
      getMonster2: () => monster2,
      setMonster3Defeated(value) {
        monster3 = value;
      },
      getMonster3: () => monster3,
      setBossDefeated(value) {
        boss = value;
      },
      getBoss: () => boss,
      setFontSize(value) {
        fontSize = value;
      },
      getFontSize: () => fontSize,
      setLocale(value) {
        locale = value;
      },
      getLocale: () => locale,
      setPreviousScene(sceneName) {
        previousScene = sceneName;
      },
      getPreviousScene: () => previousScene,
      setIsSonSaved(value) {
        isSonSaved = value;
      },
      getIsSonSaved: () => isSonSaved,
      setIsGhostDefeated(value) {
        isGhostDefeated = value;
      },
      getIsGhostDefeated: () => isGhostDefeated,
    };
  }

  return {
    getInstance() {
      if (!instance) {
        instance = createInstance();
      }

      return instance;
    },
  };
}
