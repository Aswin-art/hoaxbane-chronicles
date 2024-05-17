export default function NPCGlobalStateManager() {
  let instance = null;

  function createInstance() {
    let numberTalkedOldMan = 0;

    return {
      setNumberTalkedOldMan(value) {
        numberTalkedOldMan = value;
      },
      getNumberTalkedOldMan: () => numberTalkedOldMan,
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
