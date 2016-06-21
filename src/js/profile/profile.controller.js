class ProfileCtrl {

    // the profile parameter
    // comes from the resolve section of the controller
    constructor(profile, User) {

        'ngInject';

        // the profile for this page resolved by the UI Router
        this.profile = profile;

        this.isUser = false;
        if(User.current){

            // show edit profile if it is the current user's profile
            this.isUser = (User.current.username === this.profile.username);
        }
    }
}


export default ProfileCtrl;
