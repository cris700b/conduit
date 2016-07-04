
export default class Articles{

    constructor($http, $q, AppConstants){

        'ngInject';

        this._http = $http;
        this._q = $q;
        this._AppConstants = AppConstants;
    }

    // create an article
    save(article){

        let request = {};
        request.data = {article: article};
        request.url = this._AppConstants.api + '/articles';

        // if there's a lug, perform an update via PUT
        if(article.slug){

            request.url += '/' + article.slug;
            request.method = 'PUT';

            // delete the slug from the article to ensure the server updates the slug,
            // wich happens if the title of the article has changed
            delete article.slug;
        }

        // otherwise, this is a new article POST request
        else{

            request.method = 'POST';
        }

        return this._http(request).then((res) => res.data.article)
    }

    // retrieve a single article
    get(slug){

        let deffered = this._q.defer();

        // check for blank title
        if(!slug.replace(" ", "")){

            deffered.reject("Article slug is empty");
            return deffered.promise;
        }

        this._http({

            url: this._AppConstants + '/articles' + slug,
            method: 'GET'
        })
        .then(
            (res) => deffered.resolve(res.data.article),
            (err) => deffered.reject(err)
        );

        return deffered.promise;
    }
}
