//server/publications/users.js

Meteor.publish('users', function(){
	return Meteor.users.find({},
		{fields:
				{owner: 1, emails: 1, bio: 1, username: 1, name: 1, verified: 1, trusted: 1}});
});

