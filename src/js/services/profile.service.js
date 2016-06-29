
export default class Profile {

    constructor($http, AppConstants){

        'ngInject';

        this._AppConstants = AppConstants;
        this._http = $http;
    }

    // retrieve a user profile
    get(username){

        return this._http({

            url: this._AppConstants.api + '/profiles/' + username,
            method: 'GET'
        })
        .then((res) => res.data.profile);
    }

    // follow user
    follow(username){

        return this._http({

            url: this._AppConstants.api + '/profiles/' + username + '/follow',
            method: 'POST'
        })
        .then((res) => res.data);
    }

    // unfollow user
    unfollow(username){

        return this._http({

            url: this._AppConstants.api + '/profiles/' + username + '/follow',
            method: 'DELETE'
        })
        .then((res) => res.data);
    }
}
