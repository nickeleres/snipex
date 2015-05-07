//client/home/home.js

Router.route('home', {
	path: '/',
	layoutTemplate: 'layoutTemplate',
	template: 'homeTemplate',
	waitOn: function(){
		return Meteor.subscribe('postsCollection');
	}

});

Template.homeTemplate.helpers({
	posts: function(){
		return postsCollection.find();
	}
})