
var open = require('open');
console.log('launch test')
var options = { app: undefined, wait: false, url: true };
open(process.env.BACKEND_URL || 'http://localhost', options)