//update all links on the page
(function(){
    var links = document.getElementsByTagName('a');
    for (i=0; i<links.length; i++){
        var u = links[i].href;
        if (!u) { continue; }
        var newURL = GM_SPN.newurl(u);
        if (newURL) {
            links[i].href = newURL;
        }
    }
    console.log('Page One extension worked its magic.')

    //don't allow printer-friendly pages to auto-print
    var onload = ( window.onload || '').toString();
    if ( onload.match(/window[.]print\s*\(\s*\)\s*;?/i) ) {
        window.onload=null;
        onload = onload.replace(/window[.]print\s*\(\s*\)\s*;?/gi, "");
        try {
            eval( onload );
            console.log('Page One extension canceled print dialog.');
        }
        catch(err) {
            console.log('Page One extension canceled print dialog but could no longer run onload event.');        
        }
    }
})();