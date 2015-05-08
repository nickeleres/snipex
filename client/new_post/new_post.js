//client/new_post/new_post.js

Router.route('new_post', {
	path: '/new_post',
	layoutTemplate: 'layoutTemplate',
	template: 'new_post_template'
});

Template.new_post_template.events({
	'click #submit_button': function(ev, template){
		ev.preventDefault();

		var today = new Date();

		var new_post_fields = {
			post_title_field : template.$('#new_post_input').val(),
			post_text_field : template.$('#new_post_textarea').val(),
			post_value_field : template.$('#new_post_value').val(),
			tag_1: template.$('#select_one').val(),
			tag_2: template.$('#select_two').val(),
			tag_3: template.$('#select_three').val(),
			needed_by_field: template.$('#completion_date').val(),
			created: today.toDateString()
		}

		Meteor.call('addPost', new_post_fields);
	}
});