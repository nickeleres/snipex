//lib/collections/messages.js

messagesCollection = new Mongo.Collection('messages');

Meteor.methods({
	addMessage: function(new_message_data){
		if(!Meteor.userId()){
			console.log('user is not signed in');
			
		} else {
			messagesCollection.insert({
			content: new_message_data.body,
			poster: new_message_data.poster,
			post_id: new_message_data.post_id,
			created: new_message_data.created

			});

		}
		
		
	},

	returnUserEmail: function(owner_id){
		return Meteor.users.find();
	}
});