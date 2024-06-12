export default function playerGlobalStateManager() {
  let instance = null;

  function createInstance() {
    let isSwordEquipped = false;
    const maxHealth = 100;
    let health = 100;
    let hasKey = false;
    let coin = 0;
    let point = 0;
    let isMove = false;

    return {
      setIsSwordEquipped(value) {
        isSwordEquipped = value;
      },
      getIsSwordEquipped: () => isSwordEquipped,
      setHealth(value) {
        health = value;
      },
      getHealth: () => health,
      setIsMove(value) {
        isMove = value;
      },
      getIsMove: () => isMove,
      addCoin(value) {
        coin += value;
      },
      getCoin: () => coin,
      addPoint(value) {
        point += value;
      },
      getPoint: () => point,
      setHasKey(value) {
        hasKey = value;
      },
      getMaxHealth: () => maxHealth,
      getHasKey: () => hasKey,
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
