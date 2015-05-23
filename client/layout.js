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

Template.layoutTemplate.events({
	'mouseenter .top_nav_button': function(ev, template){
		ev.preventDefault();

		var $this = $(ev.target);

		$this.css('opacity', '1');

	},

	'mouseleave .top_nav_button': function(ev, template){
		ev.preventDefault();

		var $this = $(ev.target);

		$this.css('opacity', '0.6');
	},

	'mouseenter .sub_nav_button': function(ev, template){
		ev.preventDefault();

		var $this = $(ev.target);

		$this.css('background-color', '#FF6D59');
		$this.css('color', 'white');

	},

	'mouseleave .sub_nav_button': function(ev, template){
		ev.preventDefault();

		var $this = $(ev.target);

		$this.css('background-color', 'white');
		$this.css('color', '#FF6D59');

	}

});
