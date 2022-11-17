require('dotenv').config();
const convict = require('convict');

const config = convict({
    host: {
        format: String,
        default: 'localhost',
        arg: 'host',
        env: 'HOST'
    },
    port: {
        format: String,
        default: '3032',
        arg: 'port',
        env: 'PORT'
    },
    env: {
        format: ['prod', 'dev', 'test'],
        default: 'dev',
        arg: 'nodeEnv',
        env: 'NODE_ENV'
    },
    version: {
        format: String,
        default: 'HEAD',
        arg: 'appVersion',
        env: 'APP_VERSION'
    },
    title: {
        format: String,
        default: 'Demo node.js',
        arg: 'appTitle',
        env: 'APP_TITLE'
    }
});

const env = config.get('env');
config.loadFile(`./config/${env}.json`);

config.validate({ allowed: 'strict'  }); // throws error if config does not conform to schema

module.exports = config.getProperties(); // so we can operate with a plain old JavaS

