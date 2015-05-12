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
			Meteor.subscribe('contractorMatches', Meteor.userId()),
			Meteor.subscribe('posterMatches', Meteor.userId()),
			Meteor.subscribe('matches', Session.get('post_id'))
		]
	}
});

id_to_string = function(user_id){
	var user = Meteor.users.find({_id: user_id}).fetch();

	return user_email = user[0].emails[0].address
}

id_to_username = function(user_id){
	var user = Meteor.users.find({_id: user_id}).fetch();	

	return user_email = user[0].username
}

// single_post helpers and events

Template.single_post.helpers({
	isOwner: function(){
		var current_post = postsCollection.find({_id: Session.get('post_id')}).fetch();
		var current_owner = current_post[0].owner;
		return current_owner == Meteor.userId();
	},

	posted_by_username: function(){
		var current_post = postsCollection.find({_id: Session.get('post_id')}).fetch();

		var current_post_owner_id = current_post[0].owner;

		var post_owner_username = id_to_username(current_post_owner_id);

		return post_owner_username;

	},

	isClosed: function(){
		var post_has_match = matchesCollection.find({post: Session.get('post_id')}).fetch();
		if(post_has_match == ''){
			return false;
		} else {
			return true;
		}
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
	},

	'click #reopen_post_button': function(ev){
		ev.preventDefault();

		Meteor.call('removeMatch', Session.get('post_id'));
	}
	
});

// single_post_template helpers and events

Template.single_post_template.helpers({
	posts: function(){
		return postsCollection.find({_id: Session.get('post_id')});
	},

	bidSelected: function(){
		var match = matchesCollection.find({post: Session.get('post_id')}).fetch();
		if(match != ''){
			return true;
		} else {
			return false;
		}
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

		var today = Date();

		var match_data = {
			post_data: this.post_id,
			poster_data: Meteor.userId(),
			poster_email: id_to_string(Meteor.userId()),
			contractor_data : this.poster,
			contractor_email: id_to_string(this.poster),
			post_title : post_title,
			message_id: this._id,
			date_matched: today
		}

		Meteor.call('addMatch', match_data);
	}
});

// single_post_messages helpers and events

Template.single_post_messages.helpers({
	messages: function(){
		return messagesCollection.find({post_id: Session.get('post_id')});
	},

	username: function(){
		var current_message = messagesCollection.find({_id: this._id}).fetch();

		var message_owner = current_message[0].poster;

		var username = id_to_username(message_owner);

		return username;
	},

	selectedMatch: function(){
		var this_match = matchesCollection.find({post: Session.get('post_id')});
	},

	isClosed: function(){
		var post_has_match = matchesCollection.find({post: Session.get('post_id')}).fetch();
		if(post_has_match == ''){
			return false;
		} else {
			return true;
		}
	}
});

// winning_bid template

Template.winning_bid.helpers({
	winning_bid: function(){
		return matchesCollection.find({message_id: message_id});
	},

	winningMessage: function(){
			var match = matchesCollection.find({post: Session.get('post_id')}).fetch();
		if (match != ''){
			var message_id = match[0].message_id;
			var message = messagesCollection.find({_id: message_id});

			return message;
		}
	},

	username: function(){
		var current_message = messagesCollection.find({_id: this._id}).fetch();

		var message_owner = current_message[0].poster;

		var username = id_to_username(message_owner);

		return username;
	}
});