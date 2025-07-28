import en_common from '../locales/en/common.json';
import en_login from '../locales/en/login.json';

export const resources = {
  en: {
    common: en_common,
    login: en_login,
  },
} as const;

export type Resources = typeof resources;
