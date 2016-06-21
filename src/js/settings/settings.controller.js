
class SettingsCtrl {

    constructor($state, User) {

        'ngInject';

        this._User = User;
        this._state = $state;

        this.formData = {

            email: User.current.email,
            bio: User.current.bio,
            image: User.current.image,
            username: User.current.username
        };

        // bind is required because the logout method assumes
        // the execution context is within the User object
        this.logout = User.logout.bind(User);
    }

    submitForm(){

        this.isSubmitting = true;
        this._User.update(this.formData)
                  .then(

                      // success callback
                      (user) => {

                          this._state.go('app.profile', {username: user.username});
                      },

                      // error callback
                      (err) => {

                          this.isSubmitting = false;
                          this.errors = err.data.errors;
                      }
                  );
    }

};

export default SettingsCtrl;
