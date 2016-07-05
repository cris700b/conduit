import angular from 'angular';

//import the list-errors component
import ListErrors from './list-errors.component';

// import the show-auth directive
import ShowAuthed from './show-authed.directive';

// import the follow-btn component
import FollowBtn from './buttons/follow-btn.component';

// import the article-meta component
import ArticleMeta from './article-helpers/article-meta.component';

let componentsModule = angular.module('app.components', []);

// the list of available components
componentsModule.component('listErrors', ListErrors)
                .component('followBtn', FollowBtn)
                .component('articleMeta', ArticleMeta);

// the list of available directives
componentsModule.directive('showAuthed', ShowAuthed);


export default componentsModule;
