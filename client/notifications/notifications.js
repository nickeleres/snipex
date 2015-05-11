//client/notifications/notifications.js

Router.route('notifications', {
	path: 'notifications',
	layoutTemplate: 'layoutTemplate',
	template: 'notifications_template',
	waitOn: function(){
		Meteor.subscribe('matches');
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