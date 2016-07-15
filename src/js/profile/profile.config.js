
function ProfileConfig($stateProvider) {

  'ngInject';

  $stateProvider
  .state('app.profile', {
    url: '/@:username',
    controller: 'ProfileCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'profile/profile.html',
    resolve: {

        profile: function($state, $stateParams, Profile){

            return Profile.get($stateParams.username)
                          .then(

                              (profile) => profile,
                              (err) => $state.go('app.home')
                            );
        }
    }
  });

}

export default ProfileConfig;
