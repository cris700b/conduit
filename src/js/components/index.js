import angular from 'angular';

<<<<<<< HEAD
//import the list-errors component
import ListErrors from './list-errors.component';

// import the show-auth directive
import ShowAuthed from './show-authed.directive';

let componentsModule = angular.module('app.components', []);

// the list of available components
componentsModule.component('listErrors', ListErrors);

// the list of available directives
componentsModule.directive('showAuthed', ShowAuthed);
=======
let componentsModule = angular.module('app.components', []);

>>>>>>> origin/master

export default componentsModule;
