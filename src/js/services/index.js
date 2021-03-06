import angular from 'angular';

// services
import UserSrv from './user.service';

// import the jwt service
import JwtService from './jwt.service';

// import the profile service
import Profile from './profile.service';

// import the article service
import Articles from './articles.service';

// Create the module where our functionality can attach to
let servicesModule = angular.module('app.services', []);

// attach the User service to the services module
servicesModule.service('User', UserSrv)
              .service('JWT', JwtService)
              .service('Profile', Profile)
              .service('Articles', Articles);


export default servicesModule;
