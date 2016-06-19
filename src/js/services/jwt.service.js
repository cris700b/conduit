
export default class JWT {
    constructor($window, AppConstants) {

        'ngInject';

        this._window = $window;
        this._AppConstants = AppConstants;
    }

    save(token){

        this._window.localStorage[this._AppConstants.jwtKey] = token;
    }

    get(){

        return this._window.localStorage[this._AppConstants.jwtKey];
    }

    destroy(){

        this._window.localStorage.removeItem(this._AppConstants.jwtKey);
    }
}
