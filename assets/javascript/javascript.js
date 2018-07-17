//Object to get and hold gifs
var gifApiReturn = {
    queryURL: "",
    queryURLTypeTrending: "trending",
    queryURLTypeSearch: "search",
    apiKey: "api_key=gOMoKMxetAwahMVySpLTNNM5nOv2LI9R",
    limit: 5,
    gifArray: {},

    getGifs: function(queryURL) {
        
        $.ajax({
            url: queryURL,
            method: "GET"
            }).then(function(response) {
                for (i = 0; i < response.length; i++) {
                    gif = $("<img>").attr("src", response.data[i].embed_url)
                    holder.append(gif);
                }
            });
    },

    buildQueryString: function(searchParameter,queryURLType,limit) {
        if (queryURLType == "trending") {
            gifApiReturn.queryURL = "https://api.giphy.com/v1/gifs/" + queryURLType + "?" + 
                gifApiReturn.apiKey;
            return gifApiReturn.queryURL;
        } else if (queryURLType == "search") {
            queryURL = "https://api.giphy.com/v1/gifs/" + queryURLType + "?q=" + searchParameter +
                gifApiReturn.apiKey + "&limit=" + limit;
            return gifApiReturn.queryURL;
        }
    }

};

// object for holding the returned data and associated functions
var userData = {
    
}


$(document).ready(function() {
    var test1 = "laugh";
    var builtQueryURL = gifApiReturn.buildQueryString(test1,gifApiReturn.queryURLTypeTrending,gifApiReturn.limit);
    // var returnedGifs = gifApiReturn.getGifs(builtQueryURL);
    // displayGifs(returnedGifs);
    // console.log(returnedGifs);

});


// function displayGifs(returnedGifs) {
//     var holder = $("<div>")
//     var gif;
//     for (i = 0; i < returnedGifs.length; i++) {
//         gif = $("<img>").attr("src", returnedGifs.data[i].embed_url)
//         holder.append(gif);
//     }
// }


