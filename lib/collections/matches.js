//lib/collections/matches.js

matchesCollection = new Mongo.Collection('matches');

Meteor.methods({
	addMatch: function(match_data){
		if(!Meteor.userId()){
			throw new Metor.Error('not-authorized');
		} else {
			matchesCollection.insert({
				post: match_data.post_data,
				poster: match_data.poster_data,
				poster_email: match_data.poster_email,
				contractor: match_data.contractor_data,
				contractor_email: match_data.contractor_email,
				post_title: match_data.post_title,
				message_id: match_data.message_id,
				date_matched: match_data.date_matched,
				tag_1: match_data.tag_1,
				tag_2: match_data.tag_2,
				tag_3: match_data.tag3
			});
		}
	},

	removeMatch: function(post_id){
		matchesCollection.remove({post: post_id});
	},

	matchEmail: function (to, from, subject, text) {
    	check([to, from, subject, text], [String]);

	    // Let other method calls from the same client start running,
	    // without waiting for the email sending to complete.
	    this.unblock();

	    Email.send({
	      to: to,
	      from: from,
	      subject: subject,
	      text: text
	    });
	}
})