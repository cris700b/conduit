
import angular from 'angular';

// create the home module where our functionality can attach to
let authModule = angular.module('app.auth', []);

// include our ui-router config settings
import authConfig from './auth.config';

// include the auth controllers
import AuthCtrl from './auth.controller';

authModule.config(authConfig);
authModule.controller('AuthCtrl', AuthCtrl);

export default authModule;
