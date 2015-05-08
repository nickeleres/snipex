//client/single_post/single_post.js

Router.route('single_post', {
	path: '/post/:_id',
	layoutTemplate: 'layoutTemplate',
	template: 'single_post_template',
	waitOn: function(){
		Session.set('id', this.params._id);
		return Meteor.subscribe('postsCollection');
	}
});

Template.single_post_template.helpers({
	posts: function(){
		return postsCollection.find({_id: Session.get('id')});
	}
})

