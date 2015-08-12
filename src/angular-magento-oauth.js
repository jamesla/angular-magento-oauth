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
    var oauth_token;
    var oauth_token_secret;
    var form_key;

    var initiate = function () {

        var request_data = {
            method: 'GET',
            url: authObj.server + '/oauth/initiate',
            data: {
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


        return $http(req);

    };

    var authorize = function () {
        var request_data = {
            method: 'GET',
            url: authObj.server + '/oauth/authorize?oauth_token=' + oauth_token + '&auth_verifier=' + oauth_token_secret
        };

        var req = {
            method: request_data.method,
            url: request_data.url
        };


        return $http(req);

    };

    var login = function () {
        var request_data = {
            method: 'POST',
            url: authObj.server + '/customer/account/loginPost',
            data: {
                'login[username]': authObj.username,
                'login[password]': authObj.password,
                form_key: form_key,
                oauth_token : oauth_token
            }
        };

        var req = {
            method: request_data.method,
            url: request_data.url,
            data : request_data.data,
            //withCredentials: true
        };


$.ajax(req)
  .always(function( data, a, b, c ) {
    console.log('jquery call', a, b, c);
    console.log('getAllHeaders', b.getAllResponseHeaders())
  });


        return $http(req);
    };

    this.getRequestToken = function (authObject) {
        authObj = authObject;
        //initiate().then(authorize());

        var x = initiate().success(function (data) {
            oauth_token = data.split('&')[0].split('=')[1];
            oauth_token_secret = data.split('&')[1].split('=')[1];
            console.log('oauth_token1=', oauth_token);

            authorize().success(function (data) {
                form_key = $('<div></div>').append(data).find('input[name=form_key]')[0].value;

                login()
                .success(function(data, a, b, c, d){
                    console.log('here', data, a, b, c, d);
                })
                .error(function(data, a, b, c, d){
                    console.log('error', data, a, b, c, d);
                })
            });
        });
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
