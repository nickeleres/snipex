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
			Meteor.subscribe('users'),
			Meteor.subscribe('matches')
		]
	}
});

function id_to_string(user_id){
	var user = Meteor.users.find({_id: user_id}).fetch();

	return user_email = user[0].emails[0].address
}

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

		var result = confirm('Do you want to delete your post?');

		if(result){
			Meteor.call('delete_post_and_messages', Session.get('post_id'));
			Router.go('/');
		}
	}
	
});

// single_post_template helpers and events

Template.single_post_template.helpers({
	posts: function(){
		return postsCollection.find({_id: Session.get('post_id')});
	}
});

Template.single_post_template.events({
	'click #submit_message': function(ev, template){
		ev.preventDefault();

		if(! Meteor.userId()){
			Session.set('single_post_not_logged_in', Session.get('post_id'));
			Router.go('/login');
		}

		var today = new Date();

		var new_message_data = {
			body: template.$('#message_textarea').val(),
			poster: Meteor.userId(),
			post_id: Session.get('post_id'),
			created: today.toDateString()
		}

		Meteor.call('addMessage', new_message_data);
	},

	'click #select_contractor': function(ev){
		ev.preventDefault();

		var post = postsCollection.find({_id: this.post_id}).fetch();

		var post_title = post[0].post_title;

		console.log(post_title);

		var match_data = {
			post_data: this.post_id,
			poster_data: Meteor.userId(),
			poster_email: id_to_string(Meteor.userId()),
			contractor_data : this.poster,
			contractor_email: id_to_string(this.poster),
			post_title : post_title
		}

		Meteor.call('addMatch', match_data);
	}
});

// single_post_messages helpers and events

Template.single_post_messages.helpers({
	messages: function(){
		return messagesCollection.find({post_id: Session.get('post_id')});
	},

	message_poster_by_email: function(){
		var current_message = messagesCollection.find({_id: this._id}).fetch();

		var message_owner = current_message[0].poster;

		// var user = Meteor.users.find({_id: message_owner}).fetch();

		// var user_email = user[0].emails[0].address;

		var user_email = id_to_string(message_owner);

		return user_email;
	}
});