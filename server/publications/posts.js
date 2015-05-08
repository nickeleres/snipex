//server/publications/posts.js

Meteor.publish('posts', function(){
	if(!this.userId){
		this.ready();	
	} else {
		return postsCollection.find();
	}
});