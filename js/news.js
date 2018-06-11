var NEWS_API = 'http://api.websitedata.co/topic/topnews';
$(document).ready(function(){
	getNews();
	// getlocation();  
});

function callAjaxx(url, callback){
    if ('caches' in window) {
      /*
       * Check if the service worker has already cached this city's weather
       * data. If the service worker has the data, then display the cached
       * data while the app fetches the latest data.
       */
      caches.match(url).then(function(response) {
        if (response) {
          response.json().then(function updateFromCache(json) {
            console.log('cache', json);
            callback(JSON.stringify(json));
          });
        }
      });
    }

    var xmlhttp;
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
            console.log('network', xmlhttp.responseText);
            callback(xmlhttp.responseText);
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function getNews(){
    var url = NEWS_API;
    callAjaxx(url, function(data){
        printNews(data);
    });
}

function printNews(data){
    console.log('news', data);
}
