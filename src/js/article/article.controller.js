
// import the marked plugin
import marked from 'marked';

class ArticleCtrl {
  constructor($sce, $rootScope, article) {
    'ngInject';

    this.article = article;

    // update the title of this page
    $rootScope.setPageTitle(this.article.title);

    // transform the markdown into html
    this.article.body = $sce.trustAsHtml(marked(this.article.body, {sanitize: true}));
  }
}


export default ArticleCtrl;
