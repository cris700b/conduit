
function authInterceptor($window, $q, JWT, AppConstants){

    'ngInject';

    return {

        // automatically attach Authorization header
        request: function(config){

            if(config.url.indexOf(AppConstants.api) === 0
                && JWT.get()){

                    config.headers.Authorization = 'Token ' + JWT.get();
            }

            return config;
        },

        // handle 401 (unauthorized requests)
        responseError: function(rejection){

            if(rejection.status=== 401){

                // clear any JWT token being stored
                JWT.destroy();

                // do a hard page refresh
                $window.location.reload();
            }

            return $q.reject(rejection);
        }
    };
}

export default authInterceptor;
