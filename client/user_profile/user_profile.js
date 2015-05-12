//client/profile/profile.js

Router.route('user_profile', {
	path: '/user/:_id',
	layoutTemplate: 'layoutTemplate',
	template: 'user_profile_template',
	onBeforeAction: function(){
		Session.set('user_id', this.params._id);
		this.next();
	},
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

Template.user_profile_template.helpers({
	userInfo: function(){
		return Meteor.users.find({_id: Session.get('user_id')});
	},

	userAsContractor: function(){
		return matchesCollection.find({contractor: Session.get('user_id')}, {sort: {date_matched: -1}});
	},

	userAsPoster: function(){
		return postsCollection.find({owner: Session.get('user_id')}, {sort: {date_created: -1}});
	}
});