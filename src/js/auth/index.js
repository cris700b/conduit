
import angular from 'angular';

<<<<<<< HEAD
// include our UI-Router config settings
import AuthConfig from './auth.config';

// include AuthCtrl
import AuthCtrl from './auth.controller';

// create the home module
// where our functionality can attach to
let authModule = angular.module('app.auth', []);

authModule.config(AuthConfig);
=======
// create the home module where our functionality can attach to
let authModule = angular.module('app.auth', []);

// include our ui-router config settings
import authConfig from './auth.config';

// include the auth controllers
import AuthCtrl from './auth.controller';

authModule.config(authConfig);
>>>>>>> origin/master
authModule.controller('AuthCtrl', AuthCtrl);

export default authModule;
