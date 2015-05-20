//server/accounts.js

//set contents of email going to newly created user

Meteor.startup(function() {
  // By default, the email is sent from no-reply@meteor.com. If you wish to receive email from users asking for help with their account, be sure to set this to an email address that you can receive email at.
  Accounts.emailTemplates.from = 'Nick <nick.bucheleres@gmail.com>';

  // The public name of your application. Defaults to the DNS name of the application (eg: awesome.meteor.com).
  Accounts.emailTemplates.siteName = 'Snipex';

  // A Function that takes a user object and returns a String for the subject line of the email.
  Accounts.emailTemplates.verifyEmail.subject = function(user) {
    return 'Snipex: Confirm Your Email Address';
  };

  // A Function that takes a user object and a url, and returns the body text for the email.
  // Note: if you need to return HTML instead, use Accounts.emailTemplates.verifyEmail.html
  Accounts.emailTemplates.verifyEmail.text = function(user, url) {
    return 'click on the following link to verify your email address on snipex.com: ' + url;
  };
});


//send verify email once user account is created

Accounts.onCreateUser(function(options, user) {
  user.profile = {};

  // we wait for Meteor to create the user before sending an email
  Meteor.setTimeout(function() {
    console.log(user._id, 'user_.id');
    Accounts.sendVerificationEmail(user._id);
  }, 2 * 1000);

  return user;
});

//require users to verify email before logging in

// Accounts.validateLoginAttempt(function(attempt){
//   if (attempt.user && attempt.user.emails && !attempt.user.emails[0].verified ) {
//     alert('check you email for a link to verify your account');

//     console.log('check your email sukka');

//     return false; // the login is aborted
//   }
//   return true;
// }); 