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

                for (i = 0; i < gifApiReturn.gifArray.length; i++) {
                    var gifDiv = $("<div class='item'>");
                    var gif = $("<img class='gif'>");
                    gif.attr("src", gifApiReturn.gifArray[i].images.fixed_height_still.url)
                    gif.attr("data-still",gifApiReturn.gifArray[i].images.fixed_height_still.url);
                    gif.attr("data-animate",gifApiReturn.gifArray[i].images.fixed_height.url);
                    gif.attr("data_state", "still");
                    gifDiv.append(gif);
                    $("#gifDisplay").append(gifDiv);
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
        $("#topicMenu").append(topicMenuItem);
        topicMenuItem.text(topic);
        userData.userTopics.push(topic);

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
        console.log(menuItemText);
        $("#searchTerm").val(menuItemText);
        $("#gifDisplay").empty();
        var builtQueryURL = gifApiReturn.buildQueryString(menuItemText,gifApiReturn.queryURLTypeSearch,gifApiReturn.limit);
        gifApiReturn.getGifs(builtQueryURL);
    });

    $(".gif").on("click", function() {
        var state = $(this).attr("data-state");
        console.log("gif on click");
        alert("test");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
            console.log("animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
            console.log("still");
        }
    });
});



