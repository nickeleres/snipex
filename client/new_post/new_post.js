//client/new_post/new_post.js

Router.route('new_post', {
	path: '/new_post',
	layoutTemplate: 'layoutTemplate',
	template: 'new_post_template',
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

Template.new_post_template.events({
	'click #submit_button': function(ev, template){
		ev.preventDefault();

		if(! Meteor.userId()){
			Session.set('single_post_not_logged_in', Session.get('post_id'));
			Router.go('/login');
		}

		var today = new Date();

		var new_post_fields = {
			post_title_field : template.$('#new_post_input').val(),
			post_text_field : template.$('#new_post_textarea').val(),
			post_value_field : template.$('#new_post_value').val(),
			tag_1: template.$('#select_one').val(),
			tag_2: template.$('#select_two').val(),
			tag_3: template.$('#select_three').val(),
			needed_by_field: template.$('#completion_date').val(),
			created: today.toDateString(),
			date_created: today
		}

		var user = Meteor.users.find({_id: Meteor.userId()}).fetch();

		var verified_status = user[0].emails[0].verified;

		if (user == ''){
			alert('you must be looged in to post');

			return false;

		} else if (verified_status == false){
			alert('you must verify your email address before you can post.  check your inbox.');

			return false;
			
		} else {
			Meteor.call('addPost', new_post_fields, function(err, id){
			Router.go('/post/' + id);
			});
		}
	}
});