// import * as _ from 'lodash';
import merge from 'lodash/merge';
import { commonEnv } from './environment.common';

const env: Partial<typeof commonEnv> = {
  production: true,
  environmentName: 'staging',
};

// Export all settings of common replaced by dev options
export const environment = merge(commonEnv, env);
