var app = angular.module('app', ['angular-magento-oauth']).
    controller('MainCtrl', function ($scope, oauth) {

        var token = oauth.getRequestToken({
            server: 'http://jamesmagento1.cloudapp.net',
            consumerKey: 'd37edee925b316d784c635707c44d086',
            consumerSecret: '877ed82753ddc44915777915f5c13126',
            accessToken: '',
            accessTokenSecret: '',
            contentType: 'application/json'
        });
    });

