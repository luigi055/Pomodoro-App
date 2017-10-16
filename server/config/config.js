process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const env = process.env.NODE_ENV;

if (env === 'development' || env === 'test') {
  const config = require ('./config.json');
  const configEnv = config[env];

  Object.keys (configEnv).forEach (key => {
    process.env[key] = configEnv[key];
  });
}
