//(function () {

'use strict';

/**
 * angular-magento-oauth service
 *
 */
angular.module('angular-magento-oauth', []).service('oauth', function ($q, $http) {

    var authObj;

    //init
    var createNonce = function () {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * 32));
        }
        return text;
    }

    var createSignature = function () {
        return 'yFVvyB5ZYdHYoMleoCq4Tkzx1HY%3D';
    }

    var initiate = function () {
        //var authObject =

        var req = {
            method: 'GET',
            url: authObj.server + '/oauth/initiate',
            headers: {
                'Authorization': 'OAuth oauth_callback="http://localhost/callback", oauth_consumer_key="5ade3de48764070d3d68a0b896d51548", oauth_nonce="8LfHlJ1wUsImlHjEE7MNekI1JpcAAJxt", oauth_signature="ugX6mwIzUy5TNkWJXDUTVdpgJxY%3D", oauth_signature_method="HMAC-SHA1", oauth_timestamp="1438046924", oauth_version="1.0"',
                'Content-type' : 'text/plain'
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
})
;
