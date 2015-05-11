//client/layout.js

Template.layoutTemplate.helpers({
	hasMatches: function(){
		var matches_as_poster = matchesCollection.find({poster: Meteor.userId()}).fetch();
		var matches_as_contractor = matchesCollection.find({contractor: Meteor.userId()}).fetch();

		if(matches_as_poster != ''){
			return true
		} else if (matches_as_contractor != ''){
			return true
		} else {
			return false;
		}
	}
});
