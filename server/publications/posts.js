//server/publications/posts.js

Meteor.publish('posts', function(){
	return postsCollection.find();
});