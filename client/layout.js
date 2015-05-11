//client/layout.js

Template.layoutTemplate.helpers({
	hasMatches: function(){
		var matches_as_poster = matchesCollection.find({poster: Meteor.userId()});
		var matches_as_contractor = matchesCollection.find({contractor: Meteor.userId()});
		
	}
});