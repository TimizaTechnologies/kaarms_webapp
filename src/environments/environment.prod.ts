// import * as _ from 'lodash';
import merge from 'lodash/merge';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { version } = require('../../package.json');
import { commonEnv } from './environment.common';

const env: Partial<typeof commonEnv> = {
  production: true,
  environmentName: 'production',
  appVersion: version,
};

// Export all settings of common replaced by dev options
export const environment = merge(commonEnv, env);
