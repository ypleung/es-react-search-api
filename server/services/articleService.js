  const elasticsearch = require('elasticsearch');
  const esClient = new elasticsearch.Client({
    host: '127.0.0.1:9200',
    log: 'error'
  });

   exports.article_service = function(req, res, next) {
      var qterm = req.query.term;
      var term = req.params.term || qterm;
  
      if ((typeof(term) !== 'undefined') && (term.length > 0)) {
        search_simple('library', term + "").then(function(results, err) {
            if (err) { return next(err); }
            res.send(JSON.stringify(results.hits.hits));
          });
      } else {
        list_all()
          .then(function(results, err) {
            if (err) { return next(err); }
            res.send(JSON.stringify(results.hits.hits));
          });
      }
    };
  
    exports.article_page = function(req, res, next) {
      var qterm = req.query.term;
      var term = req.params.term || qterm;
  
      if ((typeof(term) !== 'undefined') && (term.length > 0)) {
        search_simple('library', term + "").then(function(results, err) {
            if (err) { return next(err); }
            res.render('article_list', { title: 'Article List', article_list: results.hits.hits });
          });
      } else {
        list_all()
          .then(function(results, err) {
            if (err) { return next(err); }
            res.render('article_list', { title: 'Article List', article_list: results.hits.hits });
          });
      }
    };


 const list_all = function list_all() {
   let body = {
      size: 20,
      from: 0,
      query: {
        match_all: {}
      }
   };
   return search('library', body);
 };

 const search_simple = function search_simple(index, term) {
    let body = {
      size: 20,
      from: 0,
      query: {
        match: {
          title: {
            query: '',
            minimum_should_match: 1,
            fuzziness: 1
          }
        }
      }
    };
    body.query.match.title.query = term
    return search('library', body)
  };

  const search = function search(index, body) {
    return esClient.search({index: index, body: body});
  };
