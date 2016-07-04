
class EditorCtrl{

    constructor($state, Articles, article){

        'ngInject';

        this._state = $state;
        this._Articles = Articles;

        if(!article){

            this.article= {

                title: '',
                description: '',
                body: '',
                tagList: ['first targ', 'seccond tag']

            };
        }
        else{

            this.article = article;
        }
    }

    addTag(){

        // control that the tag is not already in the array
        if(!this.article.tagList.includes(this.tagField)){

            this.article.tagList.push(this.tagField);
            this.tagField = '';
        }
    }

    removeTag(tagName){

        this.article.tagList = this.article.tagList.filter((slug) => slug != tagName);
    }

    submit(){

        this.isSubmitting = true;
        this._Articles.save(this.article)
                        .then((newArticle) => {

                            this._state.go('app.article', {slug: newArticle.slug})
                        },
                        (err) => {

                            this.isSubmitting = false;
                            this.errors = err.data.errors;
                        });

    }
}

export default EditorCtrl;
