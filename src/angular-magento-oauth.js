//(function () {

'use strict';

/**
 * angular-magento-oauth service
 *
 */
var app = angular.module('angular-magento-oauth', []).service('oauth', function ($q, $http, utility) {

    var authObj;
    var oauth_callback = 'http://localhost/notused';
    var oauth_signature_method = 'HMAC-SHA1';
    var oauth_version = '1.0';

    var initiate = function () {

        var request_data = {
            method: 'GET',
            url: authObj.server + '/oauth/initiate',
            data : {
                oauth_callback: oauth_callback,
                oauth_version: oauth_version
            }
        };

        var oauth = window.OAuth({
            consumer: {
                public: authObj.consumerKey,
                secret: authObj.consumerSecret
            },
            signature_method: oauth_signature_method
        });

        var req = {
            method: request_data.method,
            url: request_data.url,
            headers: oauth.toHeader(oauth.authorize(request_data))
        };

        $http(req).success(function (data) {
            console.log('success=', data);
        }).error(function (data) {
            console.log('error=', data);
        });

        return $q;
    };

    this.getRequestToken = function (authObject) {
        authObj = authObject;
        initiate();
    };
});

app.service('utility', function () {
    //init
    this.createTimestamp = function () {
        return Math.round((new Date()).getTime() / 1000.0);
    }

    this.createNonce = function () {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < 32; i++) {
            text += possible.charAt(Math.floor(Math.random() * 32));
        }
        return text;
    };
});
