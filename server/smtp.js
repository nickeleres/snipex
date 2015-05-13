//server/smtp.js

Meteor.startup(function () {
  smtp = {
    username: 'nick.bucheleres@gmail.com',
    password: 'znwhcpbeaioqzxjr',
    server:   'smtp.gmail.com', 
    port: 465
  }

  process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;


});