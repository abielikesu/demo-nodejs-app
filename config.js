require('dotenv').config();
const convict = require('convict');

const config = convict({
    env: {
        format: ['prod', 'dev', 'test'],
        default: 'dev',
        arg: 'nodeEnv',
        env: 'NODE_ENV'
    },
    apple: {
        format: String,
        default: 'from default',
        arg: 'apple',
        env: 'APPLE'
    },
    banana: {
        format: String,
        default: 'from default',
        arg: 'banana',
        env: 'BANANA'
    },
    cherry: {
        format: String,
        default: 'from default',
        arg: 'cherry',
        env: 'CHERRY'
    }
});

const env = config.get('env');
config.loadFile(`./config/${env}.json`);

config.validate({ allowed: 'strict'  }); // throws error if config does not conform to schema

module.exports = config.getProperties(); // so we can operate with a plain old JavaS

