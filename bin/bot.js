'use strict';

var Genie = require('../lib/hack_genie');

var token = process.env.BOT_API_KEY;
var name = process.env.BOT_NAME;

var genie = new Genie({
    token: token,
    name: name
});

genie.run();