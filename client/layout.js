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
	},

	currentUser: function(){
		return Meteor.userId();
	}
});

$(document).ready(function(){

	$('body').on('click', function(){
		console.log($('.top_nav_button'));
		alert(this);
	});

	$('.top_nav_button').on('click', function(){
		console.log('top nav button clicked');
	});
});