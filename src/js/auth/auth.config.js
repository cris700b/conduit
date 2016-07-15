
function AuthConfig($stateProvider, $httpProvider){

  'ngInject';

  // define the routes
  $stateProvider.state('app.login', {

    url: '/login',
    controller: 'AuthCtrl as $ctrl',
    templateUrl: 'auth/auth.html',
    title: 'Sign in',
    resolve: {

        auth: function(User){

            return User.ensureIsAuth(false);
        }
    }
  })
  .state('app.register', {

    url: '/register',
    controller: 'AuthCtrl as $ctrl',
    templateUrl: 'auth/auth.html',
    title: 'Sign up',
    resolve: {

        auth: function(User){

            return User.ensureIsAuth(false);
        }
    }
  });

}

export default AuthConfig;
