//client/home/home.js

Router.route('home', {
	path: '/',
	layoutTemplate: 'layoutTemplate',
	template: 'homeTemplate',
	waitOn: function(){
		return [
			Meteor.subscribe('posts'),
			Meteor.subscribe('matches'),
			Meteor.subscribe('posts'),
			Meteor.subscribe('messages', Session.get('post_id')),
			Meteor.subscribe('users'),
			Meteor.subscribe('contractorMatches', Meteor.userId()),
			Meteor.subscribe('posterMatches', Meteor.userId()),
			Meteor.subscribe('matches', Session.get('post_id'))
		]
	}

});

Template.homeTemplate.helpers({
	posts: function(){
		return postsCollection.find();
	}
})