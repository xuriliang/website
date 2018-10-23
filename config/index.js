const path = require('path')

module.exports = {
	dev : {
		assetsPublicPath : '/',
		host : 'localhost',
		port : '8081',
		proxyTable : {
			
		}
	},
	build : {
		assetsRoot : path.resolve(__dirname,'../dist'),
		assetsPublicPath : '/'
	}
}