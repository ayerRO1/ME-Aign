import localforage from 'localforage';

localforage.config({
  name: 'aplicatie-slabit',
  storeName: 'tracker_meniu'
});

export async function saveToStorage<T>(key: string, value: T) {
  await localforage.setItem(key, value);
}

export async function loadFromStorage<T>(key: string, fallback: T): Promise<T> {
  const value = await localforage.getItem<T>(key);
  return value ?? fallback;
}

export async function clearStorage() {
  await localforage.clear();
}
