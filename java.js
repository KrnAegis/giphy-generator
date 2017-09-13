var gifNames = ["Dog", "cat", "Koala", "monkey", "turtle", "Bear", "tiger"];
makeBtn();
function makeBtn() {
	$(".disBtn").empty();
	for (var i = 0; i < gifNames.length; i++){
		var btns = $("<button>");
		btns.addClass("gifBtn");
		btns.attr("data-name", gifNames[i]);
		btns.text(gifNames[i]);
		$(".disBtn").append(btns);
	}
}
function pullGif(){
	// var gifInput & queryURL order matters!!
	$("#disGif").empty();
	var gifInput = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?=&q=" + gifInput + "&limit=10&api_key=1073d1edd04f4e6bac1f9f8bf6600603";
	console.log(gifInput);
	$.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
            console.log(response)
            console.log(gifInput)
            for (var i = 0; i < response.data.length; i++){
            	var gifInfo = $("<div class='info'>");
            	var gifImg = $("<img>");
            	gifInfo.prepend("<p> Rating: " + response.data[i].rating + "</p>");
            	gifImg.attr("src", response.data[i].images.downsized_still.url);
            	gifImg.attr("data-state", "still");
            	gifImg.attr("data-animated", response.data[i].images.downsized.url);
            	gifImg.attr("data-still", response.data[i].images.downsized_still.url);
            	gifImg.attr('class', "gif");
          		gifInfo.prepend(gifImg);
          		$("#disGif").append(gifInfo);
      		};
      		$(".gif").on("click", function(){
			var state = $(this).attr("data-state");
			console.log(state);
			if (state === "still") {
				var animated = $(this).attr("data-animated");
				$(this).attr("src", animated);
				$(this).attr("data-state", "animated")
			};
			if (state === "animated"){
				var still = $(this).attr("data-still");
				$(this).attr("src", still)
				$(this).attr("data-state", "still")
			};
			});
        });
};
$("#add-gif").on("click", function(){
	if ($("#gif-input").val() !== "") {
		event.preventDefault();
		gifNames.push($("#gif-input").val())
		makeBtn();
	};
	$("#gif-input").val	("");
});
$(document).on("click", ".gifBtn", pullGif);

// https://api.giphy.com/v1/gifs/search?=&q=cat&limit=10&api_key=1073d1edd04f4e6bac1f9f8bf6600603
























