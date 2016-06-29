
class FollowBtnCtrl{

    constructor($state, User, Profile){

        'ngInject';

        this._state = $state;
        this._User = User;
        this._Profile = Profile;
    }

    submit(){

        this.isSubmitting = true;
        if(!this._User.current){

            this._state.go('app.register');
            return;
        }

        // if already following, unfollow
        if(this.user.following){

            this._Profile.unfollow(this.user.username)
                         .then(() => {

                            this.isSubmitting = false;
                            this.user.following = false;
                         })
        }

        // otherwise, follow them
        else{

            this._Profile.follow(this.user.username)
                         .then(() => {

                            this.isSubmitting = false;
                            this.user.following = true;
                         })
        }
    }
}

let FollowBtn = {

    bindings: {

        user: '='
    },
    controller: FollowBtnCtrl,
    templateUrl: 'components/buttons/follow-btn.html'
};

export default FollowBtn;
