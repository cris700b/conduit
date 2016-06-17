
export default class User {

    constructor($http, AppConstants){

        'ngInject';

        // reference to teh http and the AppConstants
        // to be used outside of the counstruct function
        this._AppConstants = AppConstants;
        this._http = $http;

        // objectto store the current user propertoes
        this.current = null;
    }
}
