//client/notifications/notifications.js

Router.route('notifications', {
	path: 'notifications',
	layoutTemplate: 'layoutTemplate',
	template: 'notifications_template',
	waitOn: function(){
		return [
			Meteor.subscribe('posts'),
			Meteor.subscribe('messages', Session.get('post_id')),
			Meteor.subscribe('users'),
			Meteor.subscribe('contractorMatches', Meteor.userId()),
			Meteor.subscribe('posterMatches', Meteor.userId()),
			Meteor.subscribe('matches', Session.get('post_id'))
		]
	}
});

Template.notifications_template.helpers({
	matches: function(){
		return matchesCollection.find();
	},

	isContractor: function(){
		if(this.contractor == Meteor.userId()){
			return true;
		}
	},

	isPoster: function(){
		if(this.poster == Meteor.userId()){
			return true;
		}
	}
});