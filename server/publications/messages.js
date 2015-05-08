//server/publications/messagesCollection.js

Meteor.publish('messages', function(current_post_id){
	if(!this.userId){
		this.ready();
	} else {
		// return messagesCollection.find({post_id: current_post_id});
		return messagesCollection.find();
	}
});