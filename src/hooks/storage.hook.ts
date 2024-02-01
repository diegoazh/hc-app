import { Drivers, Storage } from '@ionic/storage';
import CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';

const store = new Storage({
  driverOrder: [
    CordovaSQLiteDriver._driver,
    Drivers.IndexedDB,
    Drivers.LocalStorage,
  ],
});

export const initStorage = (): Promise<Storage> => {
  return store
    .defineDriver(CordovaSQLiteDriver)
    .then(() => store?.create())
    .catch((err) => {
      throw err;
    });
};

export const useStorage = (): Storage => store;
