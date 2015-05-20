//client/service.js

Handlebars.registerHelper('isOwner', function(){
		var current_post = postsCollection.find({_id: Session.get('post_id')}).fetch();
		var current_owner = current_post[0].owner;
		return current_owner == Meteor.userId();
});

Handlebars.registerHelper('isTrusted', function(user_id){
    return !!Meteor.users.findOne({_id: user_id, trusted: true});
});