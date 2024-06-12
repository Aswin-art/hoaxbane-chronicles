export default function globalStateManager() {
  let instance = null;

  function createInstance() {
    let freezePlayer = false;
    let locale = "indonesia";
    let fontSize = 30;

    let previousScene = null;
    let currScene = null;

    let isSonSaved = false;
    let isGhostDefeated = false;

    let monster1 = false;
    let monster2 = false;
    let monster3 = false;

    let mission1 = false;
    let mission2 = false;
    let mission3 = false;

    let boss = false;

    let currMission = null;
    let isSoundEnabled = false;

    let soundTheme = null;

    return {
      setFreezePlayer(value) {
        freezePlayer = value;
      },
      getFreezePlayer: () => freezePlayer,
      setSoundTheme(value) {
        soundTheme = value;
      },
      getSoundTheme: () => soundTheme,
      setIsSoundEnabled(value) {
        isSoundEnabled = value;
      },
      getIsSoundEnabled: () => isSoundEnabled,
      setCurrMission(value) {
        currMission = value;
      },
      getCurrMission: () => currMission,
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
      setMission1Done(value) {
        mission1 = value;
      },
      getMission1: () => mission1,
      setMission2Done(value) {
        mission2 = value;
      },
      getMission2: () => mission2,
      setMission3Done(value) {
        mission3 = value;
      },
      getMission3: () => mission3,
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
      setCurrScene(sceneName) {
        currScene = sceneName;
      },
      getCurrScene: () => currScene,
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
