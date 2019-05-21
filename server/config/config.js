let env = process.env.NODE_ENV || 'development';

if (env === 'development' || env === 'test') {
    const configObj = require('./config.json');
    const config    = configObj[env];

    Object.keys(config).forEach(key => {
        process.env[key] = config[key];
    });
}