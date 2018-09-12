import { createMigrate } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const migrations = {
  2: (state) => {
    const { settings } = state;
    const newSettings = Object.assign({}, settings);
    newSettings.explorers = [
      {
        key: 'eosflare.io',
        path: 'https://eosflare.io/tx/'
      },
      {
        key: 'bloks.io',
        path: 'https://bloks.io/transaction/',
      },
      {
        key: 'myeoskit.com',
        path: 'https://www.myeoskit.com/#/tx/'
      }
    ];
    newSettings.selectedTheme = 'light';

    return Object.assign({}, state, {
      settings: newSettings
    });
  }
}

// configure persistor
const persistConfig = {
  version: 2,
  key: 'root',
  storage,
  migrate: createMigrate(migrations, { debug: true }),
  whitelist: ['settings'],
  debug: true
};

export default persistConfig;