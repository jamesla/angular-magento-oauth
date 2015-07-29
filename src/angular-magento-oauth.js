//(function () {

'use strict';

/**
 * angular-magento-oauth service
 *
 */
var app = angular.module('angular-magento-oauth', []).service('oauth', function ($q, $http, utility) {

    var authObj;
    var callbackUrl = 'http://localhost/notused';
    var signatureMethod = 'HMAC-SHA1';
    var oauthVersion = '1.0';

    var initiate = function () {

        var reqObj = {
            httpMethod: 'GET',
            url: '/oauth/initiate',
            parameters: {
                'oauth_callback': callbackUrl,
                'oauth_consumer_key': authObj.consumerKey,
                'oauth_nonce': utility.createNonce(),
                'oauth_signature_method': signatureMethod,
                'oauth_timestamp': utility.createTimestamp(),
                'oauth_version': oauthVersion
            },
        };

        var sig = oauthSignature.generate(reqObj.httpMethod, reqObj.url, reqObj.parameters, authObj.consumerSecret);
        console.log('sig=',sig);

        var req = {
            method: reqObj.httpMethod,
            url: authObj.server + reqObj.url,
            headers: {
                'Authorization': 'OAuth oauth_callback="' + reqObj.parameters.oauth_callback + '", oauth_consumer_key="' + reqObj.parameters.oauth_consumer_key + '", oauth_nonce="' + reqObj.parameters.oauth_nonce + '", oauth_signature="' + sig + '", oauth_signature_method="' + reqObj.parameters.oauth_signature_method + '", oauth_timestamp="' + reqObj.parameters.oauth_timestamp + '", oauth_version="' + reqObj.parameters.oauth_version + '"',
                'Content-type': 'text/plain'
            }
        };

        console.log('header=', req.headers.Authorization);


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
