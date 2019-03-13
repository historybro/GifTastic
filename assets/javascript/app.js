var searchArray = ["dog", "cat", "pig"];
var baseURL = "https://api.giphy.com/v1/gifs/search?q=";
var apiKey = "&api_key=HcXrD49KlaAfa24HDb3DIwcjswYZlicr";
var results = [];


function creatBtn() {
    $("#btnRow").empty();
    for (i = 0; i < searchArray.length; i++) {
        var buttonBuild = $("<button>")
        buttonBuild.addClass("getGiphy");
        buttonBuild.attr("data-name", searchArray[i]);
        buttonBuild.text(searchArray[i]);
        $("#btnRow").append(buttonBuild);
    }
}

function clear() {
    $("#gifRow").empty();
}

function createGifs() {
    clear();
    var category = $(this).attr("data-name");
    var queryURL = baseURL + category + apiKey;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (response) {
        console.log(response.data);
        var results = response.data;
        for (var i = 0; i < 10; i++) {
            var gifDiv = $("<div>");
            var gifImg = $("<img>");
            var p = $("<p>").text("Rating: " + results[i].rating);
            gifDiv.addClass("col-md-3");            
            gifImg.attr('src', results[i].images.fixed_width_still.url);
            gifImg.attr('data-still', results[i].images.fixed_width_still.url);
            gifImg.attr('data-state', 'still');
            gifImg.addClass('gif');
            gifImg.attr('data-animate', results[i].images.fixed_width.url);
            //gifDiv.addClass('col-md-3');
            gifDiv.append(gifImg);
            gifDiv.append(p);
            $('#gifRow').prepend(gifDiv);
        }
    });
}

$("#gifSearch").on("click", function (event) {
    event.preventDefault();
    var userInput = $("#gifInput").val().trim();
    if (userInput != "") {
        var newItem = userInput.toLowerCase();
        searchArray.push(newItem);
        creatBtn();
        console.log("Button Added")
    }
    $("#gifInput").val("");
});

$(document).on("click", ".getGiphy",  createGifs);

// $(document).on("click", "#tenMore", function () {
//     for (var i = 10; i < 20; i++) {
//         var gifDiv = $("<div>");
//         var p = $("<p>").text("Rating: " + results[i].rating);
//         var gifImg = $("<img>");
//         gifImg.attr('src', results[i].images.fixed_width_still.url);
//         gifImg.attr('data-still', results[i].images.fixed_width_still.url);
//         gifImg.attr('data-state', 'still');
//         gifImg.addClass('gif');
//         gifImg.attr('data-animate', results[i].images.fixed_width.url);
//         gifDiv.append(gifImg);
//         gifDiv.append(p);
//         $('#gifRow').prepend(gifDiv);
//     }

// });

$(document).on('click', '.gif', function () {
    var state = $(this).attr('data-state');
    if (state == 'still') {
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    } else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    };
});

creatBtn();
$("#tenMore").hide();
