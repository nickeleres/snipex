//client/accounts.js

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_EMAIL'
});

Template.layoutTemplate.onCreated = function() {
  console.log('layoutTemplate created');
  if (Accounts._verifyEmailToken) {
    Accounts.verifyEmail(Accounts._verifyEmailToken, function(err) {
      if (err != null) {
        if (err.message = 'Verify email link expired [403]') {
          console.log('Sorry this verification link has expired.')
        }
      } else {
        console.log('Youre vefified, way to go');
      }
    });
  }
};