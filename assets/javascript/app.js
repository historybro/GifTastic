var searchArray = ["dog", "cat", "pig"];
var baseURL = "https://api.giphy.com/v1/gifs/api_key=HcXrD49KlaAfa24HDb3DIwcjswYZlicr&search?q=";

function buildPage() {
    $("#btnRow").empty();
    for (i = 0; i < searchArray.length; i++) {
        var buttonBuild = $("<button>")
        buttonBuild.addClass("btn btn-primary getGiphy");
        buttonBuild.attr("data-name", searchArray[i]);
        buttonBuild.text(searchArray[i]);
        $("#btnRow").append(buttonBuild);
    }
}

function clear() {
    $("#gifRow").empty();
}

$("#gifSearch").on("click", function(event) {
    event.preventDefault();
    var userInput = $("#gifInput")
        .val()
        .trim();
    if (userInput != "") {
            var newItem = userInput.toLowerCase();
            searchArray.push(newItem);
            buildPage();
            console.log("Button Added")        
    }
});

$(document).on("click", ".getGiphy", function(event){
    event.preventDefault();
    clear();
    console.log("You clicked me!");
    var category = $(this).attr("data-name");
    var queryURL = baseURL + category + "&limit=10";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        var results = response.data;
        for (var i =0; i < results.length; i++) {
            var gifDiv = $("<div>");
            var p = $("<p>").text("Rating: " + results[i].rating);
            var gifImg = $("<img>");
            gifImg.attr("src", results[i].images.fixed_heighturl);
            gifDiv.prepend(p);
            gifDiv.prepend(gifImg);
            $('#gifRow').prepend(gifDiv);
        }
        
    });
});


buildPage();
