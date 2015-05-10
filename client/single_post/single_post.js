//client/single_post/single_post.js

Router.route('single_post', {
	path: '/post/:_id',
	layoutTemplate: 'layoutTemplate',
	template: 'single_post_template',
	onBeforeAction: function(){
		Session.set('post_id', this.params._id);
		this.next();
	},

	waitOn: function(){
		return [
			Meteor.subscribe('posts'),
			Meteor.subscribe('messages', Session.get('post_id')),
			Meteor.subscribe('users')
		]
	}
});

// single_post_template helpers and events

Template.single_post_template.helpers({
	posts: function(){
		return postsCollection.find({_id: Session.get('post_id')});
	}
});

// single_post helpers and events

Template.single_post.helpers({
	isOwner: function(){
		var current_post = postsCollection.find({_id: Session.get('post_id')}).fetch();
		var current_owner = current_post[0].owner;
		return current_owner == Meteor.userId();
	},

	posted_by_name: function(){
		var current_post = postsCollection.find({_id: Session.get('post_id')}).fetch();

		var current_post_owner_id = current_post[0].owner;

		var post_owner_user = Meteor.users.find({_id: current_post_owner_id}).fetch();

		return post_owner_email = post_owner_user[0].emails[0].address;

	}
});

Template.single_post.events({
	'click #delete_post_button': function(ev){
		ev.preventDefault();
		Meteor.call('delete_post_and_messages', Session.get('post_id'));
		Router.go('/');
	}
	
});

// single_post_messages helpers and events

Template.single_post_messages.helpers({
	messages: function(){
		return messagesCollection.find({post_id: Session.get('post_id')});
	}
})

Template.single_post_template.events({
	'click #submit_message': function(ev, template){
		ev.preventDefault();

		var today = new Date();

		var new_message_data = {
			body: template.$('#message_textarea').val(),
			poster: Meteor.userId(),
			post_id: Session.get('post_id'),
			created: today.toDateString()
		}

		console.log(new_message_data);

		Meteor.call('addMessage', new_message_data);
	}
});



