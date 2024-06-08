export default function playerGlobalStateManager() {
  let instance = null;

  function createInstance() {
    let isSwordEquipped = false;
    const maxHealth = 100;
    let health = 100;
    let hasKey = false;
    let coin = 0;

    return {
      setIsSwordEquipped(value) {
        isSwordEquipped = value;
      },
      getIsSwordEquipped: () => isSwordEquipped,
      setHealth(value) {
        health = value;
      },
      getHealth: () => health,
      addCoin(value) {
        coin += value;
      },
      getCoin: () => coin,
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
