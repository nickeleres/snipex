//server/publications/matches.js

Meteor.publish('matches', function(){
	return matchesCollection.find();
});