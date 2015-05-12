//lib/collections/matches.js

matchesCollection = new Mongo.Collection('matches');

Meteor.methods({
	addMatch: function(match_data){
		if(!Meteor.userId()){
			throw new Metor.Error('not-authorized');
		} else {
			matchesCollection.insert({
				post: match_data.post_data,
				poster: match_data.poster_data,
				poster_email: match_data.poster_email,
				contractor: match_data.contractor_data,
				contractor_email: match_data.contractor_email,
				post_title: match_data.post_title,
				message_id: match_data.message_id

			});
		}
	},

	removeMatch: function(post_id){
		matchesCollection.remove({post: post_id});
	}
})