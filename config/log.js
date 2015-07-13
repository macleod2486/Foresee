/**
 * Built-in Log Configuration
 * (sails.config.log)
 *
 * Configure the log level for your app, as well as the transport
 * (Underneath the covers, Sails uses Winston for logging, which
 * allows for some pretty neat custom transports/adapters for log messages)
 *
 * For more information on the Sails logger, check out:
 * http://sailsjs.org/#/documentation/concepts/Logging
 */

var winston = require('winston');
module.exports = {

    'log': {
        'colors': false,
        'custom': new (winston.Logger)({
            'transports': [
                new (winston.transports.Console)({
                    'level': 'info',
                    'colorize': true,
                    'timestamp': false,
                    'json': false
                }),
                new winston.transports.File({
                    'level': 'debug',
                    'colorize': false,
                    'timestamp': true,
                    'json': false,
                    'filename': './logs/sails.log',
                    'maxsize': 5120000,
                    'maxFiles': 3
                })
            ]
        })
    }
};
