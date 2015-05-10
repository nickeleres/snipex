//server/publications/users.js

Meteor.publish('users', function(){
	return Meteor.users.find({},
		{fields:
				{owner: 1, emails: 1}});
});