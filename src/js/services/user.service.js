
<<<<<<< HEAD
export default class User{

    constructor($http, $state, $q, AppConstants, JWT){

        'ngInject';

        this._http = $http;
        this._state = $state;
        this._q = $q;

        this._AppConstants = AppConstants;
        this._JWT = JWT;

        this.current = null;
    }

    attemptAuth(type, creds){

        let route = (type === 'login') ? '/login' : '';

        return this._http({

            url: this._AppConstants.api + '/users' + route,
            method: 'POST',
            data: {
                user: creds
            }
        })
        .then(

            // on success
            (res) => {

                // save the jwt token
                this._JWT.save(res.data.user.token);

                // store the user's info for easy lookup
                this.current = res.data.user;

                return res;
            }
        );
    }

    logout(){

        // delete the jwt token
        this._JWT.destroy();

        // delete the current user
        this.current = null;

        // refresh all states
        this._state.go(this._state.$current, {}, {reload: true});
    }

    verifyAuth(){

        let deffered = this._q.defer();

        // check for the JWT token first
        if(!this._JWT.get()){

            deffered.resolve(false);
            return deffered.promise;
        }

        // if there's a JWT & user is alredy set
        if(this.current){

            deffered.resolve(true);
        }

        // if the current user isn't set, get it from the server
        // if server doesn't 401, set the current user & resolve the promise
        else{

            this._http({

                url: this._AppConstants.api + '/user',
                method: 'GET'
            })
            .then(

                // success callback
                (res) => {

                    this.current = res.data.user;
                    deffered.resolve(true);
                },

                // if an error happens,
                // that means the user's token was invalid
                (err) => {

                    deffered.resolve(false);
                }

                // reject automatically handled by auth interceptor
                // will redirect them to the homepage
            );
        }

        return deffered.promise;
    }

    // this method will be used by UI-Router resolves
    ensureIsAuth(isLoggedIn){

        let deffered = this._q.defer();

        this.verifyAuth()
            .then(
                (authValid) => {

                    // if it's the opposite, redirect home
                    if(authValid !== isLoggedIn){

                        this._state.go('app.home');
                        deffered.resolve(false);
                    }
                    else {

                        deffered.resolve(true);
                    }
                }
            );

        return deffered.promise;
=======
export default class User {

    constructor($http, AppConstants){

        'ngInject';

        // reference to teh http and the AppConstants
        // to be used outside of the counstruct function
        this._AppConstants = AppConstants;
        this._http = $http;

        // objectto store the current user propertoes
        this.current = null;
>>>>>>> origin/master
    }
}
