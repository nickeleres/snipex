//client/service.js

Handlebars.registerHelper('isOwner', function(){
		var current_post = postsCollection.find({_id: Session.get('post_id')}).fetch();
		var current_owner = current_post[0].owner;
		return current_owner == Meteor.userId();
});

Handlebars.registerHelper('isTrusted', function(user_id){
		var user = Meteor.users.find({_id: user_id}).fetch();
		
		if(user[0].trusted == true){
			return true;
		} else {
			false;
		}
		
});