//client/single_post/single_post.js

Router.route('single_post', {
	path: '/post/:_id',
	layoutTemplate: 'layoutTemplate',
	template: 'single_post_template',
	waitOn: function(){
		Session.set('id', this.params._id);
		return [
			Meteor.subscribe('posts'),
			Meteor.subscribe('messages', Session.get('id'))
		]
	}
});

Template.single_post_template.helpers({
	posts: function(){
		return postsCollection.find({_id: Session.get('id')});
	}
});

Template.single_post_messages.helpers({
	messages: function(){
		return messagesCollection.find({post_id: Session.get('id')});
	}
})

Template.single_post_template.events({
	'click #submit_message': function(ev, template){
		ev.preventDefault();

		var today = new Date();

		var new_message_data = {
			body: template.$('#message_textarea').val(),
			poster: Meteor.userId(),
			post_id: Session.get('id'),
			created: today.toDateString()
		}

		console.log(new_message_data);

		Meteor.call('addMessage', new_message_data);
	}
})

