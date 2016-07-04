
// include the angular lib
import angular from 'angular';

// include the ui-router config Settings
import EditorConfig from './editor.config'

// include the controller
import EditorCtrl from './editor.controller';

// create the module where our functionality can attach to
let editorModule = angular.module('app.editor', []);

editorModule.config(EditorConfig)
            .controller("EditorCtrl", EditorCtrl);

export default editorModule;
