//Object to get and hold gifs
var gifApiReturn = {
    queryURL: "",
    queryURLTypeTrending: "trending",
    queryURLTypeSearch: "search",
    apiKey: "api_key=gOMoKMxetAwahMVySpLTNNM5nOv2LI9R",
    limit: 10,
    gifArray: {},

    getGifs: function(queryURL) {
        
        $.ajax({
            url: queryURL,
            method: "GET"
            }).then(function(response) {
                console.log(response);

                gifApiReturn.gifArray = response.data;

        // Display all the gifs returned in the object that are now in the array
                for (i = 0; i < gifApiReturn.gifArray.length; i++) {
                    var gifsDiv = $("<div class='gifDiv'>");
                    var ratingText = $("<p>");
                    var gifs = $("<img class='gifs'>");
                //set the attributes for the url so it's still when first display but user can click to animate
                    gifs.attr("src", gifApiReturn.gifArray[i].images.fixed_height_still.url)
                    gifs.attr("data-still",gifApiReturn.gifArray[i].images.fixed_height_still.url);
                    gifs.attr("data-animate",gifApiReturn.gifArray[i].images.fixed_height.url);
                    gifs.attr("data-state", "still");

                //put the gifDiv divs in the main div that has flex box style
                    ratingText.text("Rating: " + gifApiReturn.gifArray[i].rating)
                    gifsDiv.append(ratingText);
                    gifsDiv.append(gifs);
                    $("#gifDisplay").append(gifsDiv);
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
            return gifApiReturn.queryURL;
        }
    }

};

// object for holding the returned data and associated functions
var userData = {
    userTopics: [],

    saveTopic: function(topic) {
        var topicMenuItem = $("<button class='dropdown-item' type='button'>");

        if (userData.userTopics.indexOf(topic) === -1) {
            $("#topicMenu").append(topicMenuItem);
            topicMenuItem.text(topic);   
            userData.userTopics.push(topic);
        }

        //logging to the console for troubleshooting purposes
        console.log("topic " + topic + " saved")
        userData.userTopics.forEach(element => {
            console.log(element);
        });
    }


};

$(document).ready(function() {
    $("#retrieveGifs").on("click", function() {
        $("#gifDisplay").empty();
        var searchTerm = $("#searchTerm").val();
        var builtQueryURL = gifApiReturn.buildQueryString(searchTerm,gifApiReturn.queryURLTypeSearch,gifApiReturn.limit);
        gifApiReturn.getGifs(builtQueryURL);
    });

    $("#clearGifs").on("click",function() {
        $("#gifDisplay").empty();
        $("#searchTerm").val('');
    });

    $("#saveTopic").on("click",function() {
        userData.saveTopic($("#searchTerm").val());
    });

    $("#topicMenu").on("click",function(event) {
        var menuItemText = $(event.target).text()
        $("#searchTerm").val(menuItemText).trim();
        $("#gifDisplay").empty();
        var builtQueryURL = gifApiReturn.buildQueryString(menuItemText,gifApiReturn.queryURLTypeSearch,gifApiReturn.limit);
        gifApiReturn.getGifs(builtQueryURL);
    });

    $(document.body).on("click", ".gifs", function() {
        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });
});



