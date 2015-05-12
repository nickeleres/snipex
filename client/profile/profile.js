//client/profile/profile.js

Router.route('user_profile', {
	path: '/user/:_id',
	layoutTemplate: 'layoutTemplate',
	template: 'user_profile_template',
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