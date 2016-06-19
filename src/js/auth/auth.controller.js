
class AuthCtrl {

    constructor($state, User) {

        'ngInject';

        this._state = $state;

        // local reference to the User service
        this._User = User;

        this.title = $state.current.title;
        this.authType = $state.current.name.replace('app.', '');
    }

    submitForm(){

        this.isSubmitting = true;

        this._User.attemptAuth(this.authType, this.formData)
                .then(

                    // callback for success
                    (res) => {

                        this._state.go('app.home');
                    },

                    // callback for failure
                    (err) => {

                        this.isSubmitting = false;
                        this.errors = err.data.errors;
                    }
                );
    }
}

export default AuthCtrl;
