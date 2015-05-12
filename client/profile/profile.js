//client/profile/profile.js

Router.route('user_profile', {
	path: '/user/:_id',
	layoutTemplate: 'layoutTemplate',
	template: 'user_profile_template',
	waitOn: function(){
		return [
			Meteor.subscribe('users')
		]
	}
});