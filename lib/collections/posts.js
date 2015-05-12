//lib/collections/posts.js

postsCollection = new Mongo.Collection('posts');

Meteor.methods({
	addPost: function(new_post_data){
		if(!Meteor.userId()){
			throw new Meteor.Error('not-authorized');
		}

		postsCollection.insert({
			post_title: new_post_data.post_title_field,
			post_body: new_post_data.post_text_field,
			post_value: new_post_data.post_value_field,
			tag_1: new_post_data.tag_1,
			tag_2: new_post_data.tag_2,
			tag_3: new_post_data.tag_3,
			needed_by: new_post_data.needed_by_field,
			created: new_post_data.created,
			owner: Meteor.userId(),
			contractor: '',
			date_created: new_post_data.date_created

		});
	},

	delete_post_and_messages: function(post_id){
		postsCollection.remove(post_id);
		messagesCollection.remove({post_id: post_id});
	}

});