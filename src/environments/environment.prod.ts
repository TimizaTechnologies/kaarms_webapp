const _ = require('lodash');
import { commonEnv } from "./environment.common";

const env: Partial<typeof commonEnv> = {
  production: true,
  environmentName: "production",
};

// Export all settings of common replaced by dev options
export const environment = _.merge(commonEnv, env);
