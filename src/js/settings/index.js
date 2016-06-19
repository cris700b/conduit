
import angular from 'angular';

// include our UI-Router config settings
import SettingsConfig from './settings.config';

// include our controller;
import SettingsCtrl from './settings.controller';

// create the settings module
// where our functionality can attach to
let settingsModule = angular.module('app.settings', []);

settingsModule.config(SettingsConfig)
              .controller('SettingsCtrl', SettingsCtrl);

export default settingsModule;
