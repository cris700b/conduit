
import angular from 'angular';

// include our UI-Router config settings
import AuthConfig from './auth.config';

// include the auth controllers
import AuthCtrl from './auth.controller';

// create the home module
// where our functionality can attach to
let authModule = angular.module('app.auth', []);

authModule.config(AuthConfig)
          .controller('AuthCtrl', AuthCtrl);

export default authModule;
