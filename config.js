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
			'title': "The Ark",
			'subtitle': "Bnei Noach Database",
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
			'title': "The Ark",
			'subtitle': "Bnei Noach Database",
			'session': {
				secret: ""
			}
		}	
	}
}

module.exports = config
