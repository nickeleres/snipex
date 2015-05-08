//server/publications/messagesCollection.js

Meteor.publish('messages', function(current_post_id){
	return messagesCollection.find({post_id: current_post_id});
});