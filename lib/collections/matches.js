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
				contractor: match_data.contractor_data,
				post_title: match_data.post_title

			});
		}
	}
})