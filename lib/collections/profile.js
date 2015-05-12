//lib/collections/profile.js

Meteor.methods({
	updateBio: function(user_id, bio_data){
		Meteor.users.update({_id: user_id}, {$set : {"bio" : bio_data}});
	}
})