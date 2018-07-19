//Object to get and hold gifs
var gifApiReturn = {
    queryURL: "",
    queryURLTypeTrending: "trending",
    queryURLTypeSearch: "search",
    apiKey: "api_key=gOMoKMxetAwahMVySpLTNNM5nOv2LI9R",
    limit: 2,
    gifArray: {},

    getGifs: function(queryURL) {
        
        $.ajax({
            url: queryURL,
            method: "GET"
            }).then(function(response) {
                console.log(response);
                gifApiReturn.gifArray = response.data;

                for (i = 0; i < gifApiReturn.gifArray.length; i++) {
                    var gifDiv = $("<div class='item'>");
                    var gif = $("<img>");
                    gif.attr("src", gifApiReturn.gifArray[i].images.fixed_height.url)
                    alert(gifApiReturn.gifArray[i].images.fixed_height.url);
                    gifDiv.append(gif);
                    $("#gifDisplay").prepend(gifDiv);
                }
            });
    },

    buildQueryString: function(searchParameter,queryURLType,limit) {
        if (queryURLType == "trending") {
            gifApiReturn.queryURL = "https://api.giphy.com/v1/gifs/" + queryURLType + "?" + 
                gifApiReturn.apiKey;
            return gifApiReturn.queryURL;
        } else if (queryURLType == "search") {
            gifApiReturn.queryURL = "https://api.giphy.com/v1/gifs/" + queryURLType + "?q=" + searchParameter +
                "&" + gifApiReturn.apiKey + 
                "&limit=" + limit;
                console.log(gifApiReturn.queryURL);
            return gifApiReturn.queryURL;
        }
    }

};

// object for holding the returned data and associated functions
var userData = {
    
}


$(document).ready(function() {

    $("#retrieveGifs").click(function() {
        var searchTerm = $("#searchTerm").val();
        var builtQueryURL = gifApiReturn.buildQueryString(searchTerm,gifApiReturn.queryURLTypeSearch,gifApiReturn.limit);
        gifApiReturn.getGifs(builtQueryURL);
    });

    // var searchTerm = "seinfeld";
    // var builtQueryURL = gifApiReturn.buildQueryString(searchTerm,gifApiReturn.queryURLTypeSearch,gifApiReturn.limit);
    // gifApiReturn.getGifs(builtQueryURL);
});



