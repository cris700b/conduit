
import angular from 'angular';

// include our UI-Router config settings
import AuthConfig from './auth.config';

// include AuthCtrl
import AuthCtrl from './auth.controller';

// create the home module
// where our functionality can attach to
let authModule = angular.module('app.auth', []);

authModule.config(AuthConfig);
authModule.controller('AuthCtrl', AuthCtrl);

export default authModule;
