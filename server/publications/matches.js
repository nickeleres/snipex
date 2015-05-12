//server/publications/matches.js

Meteor.publish('matches', function(post_id){
	return matchesCollection.find({post: post_id});
});

Meteor.publish('contractorMatches', function(current_user){
	return matchesCollection.find({contractor: current_user});
});

Meteor.publish('posterMatches', function(current_user){
	return matchesCollection.find({poster: current_user});
});