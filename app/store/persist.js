import { createMigrate } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const migrations = {
  2: state => {
    const { settings } = state;
    const newSettings = Object.assign({}, settings);
    newSettings.explorers = [
      {
        key: 'eosflare.io',
        path: 'https://eosflare.io/tx/'
      },
      {
        key: 'bloks.io',
        path: 'https://bloks.io/transaction/'
      },
      {
        key: 'eosx.io',
        path: 'https://www.eosx.io/tx/'
      }
    ];
    newSettings.selectedTheme = 'light';

    return Object.assign({}, state, {
      settings: newSettings
    });
  },
  3: state => {
    const { settings } = state;
    const newSettings = Object.assign({}, settings);
    newSettings.exchangeCurrency = 'usd';
  }
};

// configure persistor
const persistConfig = {
  version: 3,
  key: 'root',
  storage,
  migrate: createMigrate(migrations, { debug: true }),
  whitelist: ['settings', 'contacts'],
  debug: true
};

export default persistConfig;
