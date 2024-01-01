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
        default: '3031',
        arg: 'port',
        env: 'PORT'
    },
    env: {
        format: ['prod', 'dev', 'test', 'qa'],
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
    },
    dbtype: {
        format: String,
        default: 'none',
        arg: 'dbtype',
        env: 'DB_TYPE'
    },
    dbname: {
        format: String,
        default: 'demo',
        arg: 'dbname',
        env: 'DB_NAME'
    },
    dburl: {
        format: String,
        default: 'mongodb://localhost:27017/',
        arg: 'dburl',
        env: 'DB_URL'
    }
});

const env = config.get('env');
config.loadFile(`./config/${env}.json`);

config.validate({ allowed: 'strict'  }); // throws error if config does not conform to schema

module.exports = config.getProperties(); // so we can operate with a plain old JavaS

