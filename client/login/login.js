//client/login/login.js

Router.route('login', {
	path: '/login',
	layoutTemplate: 'loginLayoutTemplate',
	template: 'login_template',
	onBeforeAction: function(){
		if(Meteor.loggingIn()){
			var post_visited = Session.get('single_post_not_logged_in');
			console.log(post_visited);
			Router.go('/post/' + post_visited);
		}
		this.next();
	}
});