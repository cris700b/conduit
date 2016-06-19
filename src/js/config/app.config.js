
// import the auth interceptor
import authInterceptor from './auth.interceptor';

function AppConfig($httpProvider, $stateProvider, $locationProvider, $urlRouterProvider) {
  'ngInject';

    /*
    If you don't want hashbang routing, uncomment this line.
    Our tutorial will be using hashbang routing though :)
    */
    // $locationProvider.html5Mode(true);

    // push our auth interceptor for auth
    $httpProvider.interceptors.push(authInterceptor);

    $stateProvider
    .state('app', {

        abstract: true,
        templateUrl: 'layout/app-view.html',
        resolve: {

            auth: function(User){

                return User.verifyAuth();
            }
        }
    });

    $urlRouterProvider.otherwise('/');
}

export default AppConfig;
