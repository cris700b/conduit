
class SettingsCtrl {

    constructor(User) {

        'ngInject';

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


};

export default SettingsCtrl;
