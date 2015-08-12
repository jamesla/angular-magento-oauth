var app = angular.module('app', ['angular-magento-oauth']).
    controller('MainCtrl', function ($scope, oauth, $element, $http) {

        $element.find('sdf');
        // var token = oauth.getRequestToken({
        //     server: 'http://jamesmagento1.cloudapp.net',
        //     consumerKey: 'd37edee925b316d784c635707c44d086',
        //     consumerSecret: '877ed82753ddc44915777915f5c13126',
        //     accessToken: '',
        //     accessTokenSecret: '',
        //     contentType: 'application/json',
        //     username: '',
        //     password: ''
        // });

var oauth_callback = 'http://localhost/notused';
    var oauth_signature_method = 'HMAC-SHA1';
    var oauth_version = '1.0';
    var oauth_token = '';
    var oauth_token_secret = '',
        server = 'http://jamesmagento1.cloudapp.net',
        consumerKey = '2e9c04e3378ff665de3534b6102a88a3',
        consumerSecret = '8a9dcccc4391a330885239dbf55f5b96',
        accessToken = '10400749510ca6f59215fdb1e5ad5ddc',
        accessTokenSecret = 'fd358cc6c6df87135a0a3e44e7ce0546';

    var token = {
        public: '10400749510ca6f59215fdb1e5ad5ddc',
        secret: 'fd358cc6c6df87135a0a3e44e7ce0546'
    };

        var request_data = {
            method: 'GET',
            url: server + '/api/rest/products',
            data: {
                oauth_callback: oauth_callback,
                oauth_version: oauth_version
            }
        };

        var oauth = window.OAuth({
            consumer: {
                public: consumerKey,
                secret: consumerSecret
            },
            signature_method: oauth_signature_method
        });

        var req = {
            method: request_data.method,
            url: request_data.url,
            headers: oauth.toHeader(oauth.authorize(request_data, token))
        };
        $http(req).success(function(data){
            console.log('request', data);
        });

    });

