//server/publications/matches.js

Meteor.publish('matches', function(post_id){
	return matchesCollection.find({post: post_id});
});