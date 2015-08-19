var query = ["Shakespeare", "Politic", "Sport", "Music", "Movie", "President", "Theater", "Game", "Math", "Science", "Country", "Literature", "Writer", "World", "Food", "Animal", "Celebrity", "Technology", "Bible", "Comic", "Government", "American", "European", "Asian", "African", "Australian", "History", "New", "Old", "Woman", "90s", "80s", "70s", "60s", "50s", "40s", "30s", "20s", "10s", "00s"];
var showAnswer = false;
var resultGlobal;
var backgroundGifs = ["http://media.giphy.com/media/9LUyapZzDSOpa/giphy.gif", "http://media.giphy.com/media/5htLqM3YD9hXa/giphy.gif", "http://media.giphy.com/media/xGYuJ1TQt1iSs/giphy.gif", "http://media.giphy.com/media/yxQbYZ1MRmny8/giphy.gif", "http://media.giphy.com/media/5mv2ZqI95N7dm/giphy.gif", "http://media.giphy.com/media/37uW9WiwDrqqQ/giphy.gif", "http://media.giphy.com/media/SVr8qAGfkrOda/giphy.gif", "http://media.giphy.com/media/9PrG6uohPmHcc/giphy.gif", "http://media.giphy.com/media/PQjLVsdM4HURy/giphy.gif", "http://media.giphy.com/media/rDM47x7xzNynu/giphy.gif", "http://media1.giphy.com/media/zx73QLkRZ6JEs/giphy.gif", "http://media.giphy.com/media/iXo8I6bzVXx9S/giphy.gif", "http://media.giphy.com/media/L2K7sx2Mf4jok/giphy.gif", "http://media.giphy.com/media/cLmFVhmeMLJew/giphy.gif", "http://media.giphy.com/media/YpIo6PkVD66KA/giphy.gif", "http://media.giphy.com/media/lJX2tW6WgJKyQ/giphy.gif", "http://cbssports.com/images/blogs/JeopardyChamp1.gif", "http://thequizmasters.com/wp-content/uploads/2014/06/aOEWzYj.gif", "http://pb-cdn.draftkings.com.s3.amazonaws.com/wp-content/uploads/2015/05/trebak1.gif", "https://usatlife.files.wordpress.com/2015/07/gangnam.gif?w=645&h=363"];
var gifBG = true;
var showSettings = false;

$(function() {
    $("#newQ").click(function() {
        if ($("input[name='gif']:checked").val() == "on") {
            $("body").css("background-image", "url(" + backgroundGifs[Math.floor(Math.random() * backgroundGifs.length)] + ")");
        } else {
            $("body").css("background-image", "none");
        }
        $("#wrapper div").css("opacity", "0");
        getQuestions();
    });

    $("#answer").click(function() {
        showAnswer = !showAnswer;
        if (showAnswer) {
            $("#answerText").html("The correct answer is: " + resultGlobal["answer"]);
        } else {
            $("#answerText").html("Click to reveal answer");
        }
    });

    $(".gif").click(function() {
        if ($("input[name='gif']:checked").val() == "on") {
            $("body").css("background-image", "url(" + backgroundGifs[Math.floor(Math.random() * backgroundGifs.length)] + ")");
        } else {
            $("body").css("background-image", "none");
        }
    });

    $("#gear").click(function() {
        showSettings = !showSettings;
        $("#settings p").css("display", "block");
        if (showSettings) {
            $("#settings").css("display", "block");
            $("#settings p").css("display", "block");
            $("#legal p").css("display", "inline");
            $("#main").css("display", "none");
            $("#wrapper").css("width", "300px");
        } else {
            $("#main").css("display", "block");
            $("#settings p").css("display", "block");
            $("#legal p").css("display", "inline");
            $("#settings").css("display", "none");
            $("#wrapper").css("width", "200px");
        }
    });

    var getQuestions = function() {
        $.ajax({
            type: "POST",

            dataType: 'jsonp',

            url: "http://wolfewylie.com/cgi-bin/jeopardy.py",

            data: {
                question: query[Math.floor(Math.random() * query.length)]
            },

            success: function(result) {
                clueNum = Math.floor(Math.random() * result.length);
                resultGlobal = result[clueNum];
                $("p").css("display", "block");
                $("#wrapper div").css("opacity", "1");
                if (result[clueNum]["dollars"] != "None") {
                    $("#categoryText").html(result[clueNum]["category"] + " for " + result[clueNum]["dollars"]);
                } else {
                    $("#categoryText").html(result[clueNum]["category"]);
                }
                $("#clueText").html(result[clueNum]["question"]);
                if (showAnswer) {
                    $("#answerText").html("The correct answer is: " + result[clueNum]["answer"]);
                } else {
                    $("#answerText").html("Click to reveal answer");
                }
            },
            error: function(xhr, error) {
                console.log(error);
            }
        });
    }

});