// keys.js logic to select prod and dev 
// heroku will have the NODE_ENV set up as production automatically 
// That is why we are using that variable here 

if (process.env.NODE_ENV === 'production') {
	// we are in production 
	module.exports = require('./prod.js');		
} else {
	// we are in dev - use dev.js 
	module.exports = require('./dev.js');
}




