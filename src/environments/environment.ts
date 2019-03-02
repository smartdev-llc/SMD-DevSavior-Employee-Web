import { DEFAULT_CONFIG } from '../config/default';

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  appUrl: 'http://localhost:4200',
  apiEndpoint: 'https://uat.api.juniorviec.com',
  appName: DEFAULT_CONFIG.appName,
  config: DEFAULT_CONFIG
};
