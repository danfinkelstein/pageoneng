var GM_SPN = {
    'sites' : {
        //v1.0
        'nytimes.com' : 'pagewanted=all',
        'newyorker.com' : 'currentPage=all',
        'vanityfair.com' : 'currentPage=all',
        'theatlantic.com' : [ /\/archive\//, '/print/' ],
        'gourmet.com' : 'printable=true',
        'details.com' : 'printable=true',
        'slate.com' : [ /(\/id\/\d+\/)($|pagenum\/\d+.*)/, '$1pagenum/all/'],
        'wired.com' : [ /(\/\d{4}\/\d{2}\/[^\/]+\/)(\d+[^\?]*)?(\?.+)?$/, '$1all/1$3' ],
        'observer.com' : 'show=all',

        //v1.1
        'thenation.com' : 'page=full',
        'businessweek.com' : [ 
            /businessweek.com\/(magazine\/.+?)(_page_\d+)?\.html/,
            'businessweek.com/printer/$1.html'
            ],
        'tnr.com' : [ /tnr.com\/article\//, 'tnr.com/print/article/' ],
        'rollingstone.com' : 'print=true',
        'washingtonpost.com' : [ /_story[.]html/, '_print.html' ],
        'laphamsquarterly.org' : 'page=all',
        'outsideonline.com' : 'page=all',
        'gq.com' : 'currentPage=all',
        'moreintelligentlife.com' : 'page=full',
        'foreignpolicy.com' : 'page=full',
        'villagevoice.com' : [ /(\/\d{4}\-\d{2}\-\d{2}\/[^\/]+\/[^\/]+\/)(\d+[^\?]*)?(\?.+)?$/, '$1all$3/' ],
        'cjr.org' : 'page=all'
    },
    'domains' : '',
    'rq' : /^.*?\?(.*)/
}

for (var i in GM_SPN.sites) {
    GM_SPN.domains += GM_SPN.domains == '' ? i : '|' + i;
}
GM_SPN.r = new RegExp('^https?://([^/]+.)?(' + GM_SPN.domains + ')/(.*)','i');

GM_SPN.newurl =function(url) {
    var m = url.match(GM_SPN.r);
    if ( m && m[3]) { //matching non-homepage link
        var qs = GM_SPN.sites[m[2]];
        
        if (typeof(qs) == 'object') { // replacement
            var newURL = url.replace(qs[0], qs[1]);
            return url == newURL ? null : newURL;
        }
        
        //otherwise, add query string
        
        var qm = url.match(GM_SPN.rq);
        if (qm) { // has a query string
            if ( qm[1].match( new RegExp(qs) ) ) {
                return; //already has the single-page string
            }
            else {
                return url + '&' + qs;
            }
        }
        else {
            return url + '?' + qs;
        }
    }
    return;
};

//check/update current location
if (parent.location.href==window.location.href) {
    var newURL = GM_SPN.newurl(document.location.href,'nytimes.com');
    if (newURL) {
        document.location.replace(newURL);
    }
}