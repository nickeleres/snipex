//server/publications/posts.js

Meteor.publish('postsCollection', function(){
	return postsCollection.find();
});