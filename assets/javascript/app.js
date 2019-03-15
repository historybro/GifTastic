//I reall should comment my code more
//Create global variables
var searchArray = ["crying jordan", "kermit", "office monkey"];
var baseURL = "https://api.giphy.com/v1/gifs/search?q=";
var apiKey = "&api_key=HcXrD49KlaAfa24HDb3DIwcjswYZlicr";
var results = [];
//janky fix for the more button
i = 0;

//Function sections
//=====================================================================
//Creates the initial buttons from the Array
function creatBtn() {
    $("#btnRow").empty();
    for (i = 0; i < searchArray.length; i++) {
        var buttonBuild = $("<button>")
        buttonBuild.addClass("getGiphy btn btn-primary");
        buttonBuild.attr("data-name", searchArray[i]);
        buttonBuild.text(searchArray[i]);
        $("#btnRow").append(buttonBuild);
    }
}

//Generic clear function to remove all GIFS
function clear() {
    $("#gifRow").empty();
}

//function that creates the divs/etc to hold called gifs
function gifDivs() {
    var gifDiv = $("<div>");
    var storage = $("<div class='row'>");
    var gifImg = $("<img>");
    var fav = $("<button>")
    var p = $("<p>");
    gifDiv.addClass("gifDiv");
    p.addClass("col-md-6 rating");
    storage.addClass("storage");
    gifImg.attr('src', results[i].images.fixed_width_still.url);
    gifImg.attr('data-still', results[i].images.fixed_width_still.url);
    gifImg.attr('data-state', 'still');
    fav.attr("data-numb", i);    
    gifImg.addClass('gif');
    gifImg.attr('data-animate', results[i].images.fixed_width.url);
    fav.addClass("col-md-2 favBtn btn btn-danger");
    fav.html("<i class='far fa-heart'></i>");
    p.html("Rating: " + results[i].rating);
    gifDiv.attr('title', "Title: " + results[i].title);
    gifDiv.append(gifImg);
    storage.append(p);
    storage.append(fav);
    gifDiv.append(storage);
    $('#gifRow').prepend(gifDiv);
}

//function that runs ajax calls
function ajax() {
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (response) {
        console.log(response);
        results = response.data;
        for (i = 0; i < 10; i++) {
            gifDivs();
            $("#tenMore").show();
        }
    });
}

//function that clears the row, sets gif category, builds full URl then perfomrs ajax call
function createGifs() {
    clear();
    var category = $(this).attr("data-name");
    queryURL = baseURL + category + apiKey;
    ajax();

}

//function that creates divs etc for favorited gifs
function favGifs() {
    for (i = 0; i < favorites.length; i++) {
        var gifDiv = $("<div>");
        var storage = $("<div class='row'>");
        var gifImg = $("<img>");
        var fav = $("<button>")
        var p = $("<p>").text("Rating: " + favorites[i].rate);
        gifDiv.addClass("gifDiv");
        p.addClass("col-md-8 rating");
        storage.addClass("storage");
        gifImg.attr('src', favorites[i].url);
        gifImg.attr('data-still', favorites[i].still);
        gifImg.attr('data-state', 'still');
        gifImg.addClass('gif');
        gifImg.attr('data-animate', favorites[i].anim);
        gifDiv.attr('title', "Title: " + favorites[i].title);
        fav.addClass("col-md-3 deleteBtn btn btn-danger");
        fav.html("<i class='far fa-trash-alt'></i>");
        fav.attr("data-numb", i);
        gifDiv.append(gifImg);
        storage.append(p);
        storage.append(fav);
        gifDiv.append(storage);
        $('#gifRow').prepend(gifDiv);
    }
}

//OnClick Section
//=====================================================================


//search button on click, creates button with user input, also ajax calls that input and builds gifrow
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
    clear();
    queryURL = baseURL + userInput + apiKey;
    ajax();
});


//created button on click that calls createGifs
$(document).on("click", ".getGiphy", createGifs);

//More gifs button on click that creates more gifs
$(document).on("click", "#tenMore", function () {
    if (i < 11) {
        for (var j = i + 10; i < j; i++) {
            gifDivs();
        }
    } else {
        for (var j = 25; i < j; i++) {
            gifDivs();
            $("#tenMore").hide();
        }
    }
});

//gif on click that sets state from still to animated, and vice-versa
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

//Favorites button on click that clears the gifrow and calls favorited gifs
$(document).on('click', '#favorite', function () {
    clear();
    $("#tenMore").hide();
    favGifs();
});

//Favorite button on click, pushes gif and information to favorites
$(document).on('click', '.favBtn', function () {
    var numb = $(this).data("numb");
    var stop = results[numb].images.fixed_width_still.url;
    var src = results[numb].images.fixed_width_still.url;
    var animate = results[numb].images.fixed_width.url;
    var rating = results[numb].rating;
    var gifTitle = results[numb].title;

    var fav= {
        url: src,
        still: stop,
        anim: animate,
        rate: rating,
        title: gifTitle
    }
    favorites.push(fav);
    localStorage.setItem("Favorites", JSON.stringify(favorites));


});

//delete button on click removes gif from favorites
$(document).on('click', '.deleteBtn', function () {
    var numb = $(this).data("numb");
    favorites.splice(numb, 1);
    localStorage.setItem("Favorites", JSON.stringify(favorites));
    favorites = JSON.parse(localStorage.getItem("Favorites"));
    clear();
    favGifs();
});

//image should download on click...


//hides the more button until there are gifs, and creates the intial array buttons
creatBtn();
$("#tenMore").hide();
favorites = JSON.parse(localStorage.getItem("Favorites"));
console.log("'I'd just like to interject for a moment. What you’re referring to as Linux, is in fact, GNU/Linux, or as I’ve recently taken to calling it, GNU plus Linux. Linux is not an operating system unto itself, but rather another free component of a fully functioning GNU system made useful by the GNU corelibs, shell utilities and vital system components comprising a full OS as defined by POSIX. Many computer users run a modified version of the GNU system every day, without realizing it. Through a peculiar turn of events, the version of GNU which is widely used today is often called “Linux”, and many of its users are not aware that it is basically the GNU system, developed by the GNU Project. There really is a Linux, and these people are using it, but it is just a part of the system they use. Linux is the kernel: the program in the system that allocates the machine’s resources to the other programs that you run. The kernel is an essential part of an operating system, but useless by itself; it can only function in the context of a complete operating system. Linux is normally used in combination with the GNU operating system: the whole system is basically GNU with Linux added, or GNU/Linux. All the so-called “Linux” distributions are really distributions of GNU/Linux.' - Richard Stallman");
