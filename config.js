var config = {
	'development': {
		'twitter': {
			TWITTER_CONSUMER_KEY: "",
			TWITTER_CONSUMER_SECRET: "",
		},
		'couchdb': {
			callbackURL: "",
			couchdbURL: ""
		},
		'express': {
			'session': {
				secret: ""
			}
		}	
	},
	'production': {
		'twitter': {
			TWITTER_CONSUMER_KEY: "",
			TWITTER_CONSUMER_SECRET: "",
		},
		'couchdb': {
			callbackURL: "",
			couchdbURL: ""
		},
		'express': {
			'session': {
				secret: ""
			}
		}	
	}
}

module.exports = config
