
function EditorConfig($stateProvider){

    'ngInject';

    $stateProvider.state('app.editor', {

        url: '/editor/:slug',
        controller: 'EditorCtrl',
        controllerAs: '$ctrl',
        templateUrl: 'editor/editor.html',
        title: 'Editor',
        resolve: {

            auth: function(User){

                return User.ensureIsAuth(true);
            },
            article: function($state, $stateParams, User, Articles){

                // if we're trying to edit an article
                if($stateParams.slug){

                    return Articles.get($stateParams.slug)
                                    .then((article) => {

                                        // if the current user is the author,
                                        // resolve the article data
                                        if(User.current.username === article.author.username){

                                            return article;
                                        }

                                        // otherwise, redirect them to the home page
                                        else{

                                            $state.go('app.home');
                                        }
                                    },

                                    // if there is an error (article does not exist), redirect to the home page
                                    (err) => {

                                        $state.go('app.home')
                                    })
                }

                // if thise is a new article, then just return null
                else{

                    return null;
                }
            }
        }
    })
};

export default EditorConfig;
