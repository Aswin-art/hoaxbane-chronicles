export default function globalStateManager() {
  let instance = null;

  function createInstance() {
    let freezePlayer = false;
    let locale = "english";
    let fontSize = 30;
    let previousScene = null;
    let isSonSaved = false;
    let isGhostDefeated = false;
    let monster1 = true;
    let monster2 = true;
    let monster3 = true;
    let boss = true;

    return {
      setFreezePlayer(value) {
        freezePlayer = value;
      },
      getFreezePlayer: () => freezePlayer,
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
