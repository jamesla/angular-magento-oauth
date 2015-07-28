var app = angular.module('app', ['angular-magento-oauth']).
    controller('MainCtrl', function ($scope, oauth) {

        var token = oauth.getRequestToken({
            server: '',
            consumerKey: '',
            consumerSecret: '',
            accessToken: '',
            accessTokenSecret: '',
            contentType: 'application/json'
        });

        //token.then(function(data){
        //    console.log('token =',data);
        //});

    });

