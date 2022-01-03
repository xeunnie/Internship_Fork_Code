import { atom } from 'recoil';

import { THEME_TYPE } from '~/constants/theme';
import type { ChromeStorage } from '~/types/chromeStorage';

export const chromeStorageState = atom<ChromeStorage>({
  key: 'chromeStorageState',
  default: {
    theme: THEME_TYPE.LIGHT,
    accounts: [],
    queues: [],
    additionalChains: [],
    encryptedPassword: null,
    windowId: null,
    selectedAccountName: '',
    selectedChain: 'cosmos',
  },
});
