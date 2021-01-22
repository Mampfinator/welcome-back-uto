var messages;
const messagesFontSize = parseFloat(getComputedStyle($(".messages").get(0)).fontSize);

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

$(document).ready(function() {

    var currentSmallest;
    $.getJSON("assets/js/messagecontent.json", (data) => {messages = data})
    .done(function() {


        for (const [key, value] of Object.entries(messages)) {
            //switch(value.type) {}
            if (value.type == "text") {
                $(".messages").append(`
                    <div class="messages-text-container${"translated" in value? " has-translation" : ""}" data-language="original">
                        <div>${value.original}</div>
                        <h3>${key}</h3>
                    </div>
                `);
            } else if (value.type == "image") {
                
                $(".messages").append(`
                    <a href="images/artworks/${value.name}" data-fancybox>
                        <img src="images/thumbs/${value.name}" alt="Image could not be loaded!"/>
                        ${"text" in value? `<div class="short-image-text">${value.text}</div>` : ""}
                        <h3>${key}</h3>
                    </a>
                `)

                // include option to add disclaimer (requested by Sans w/ a guitar)
            } else if (value.type == "embed") {
                var source;
                if (value.source == "youtube") {
                    source = `https://youtube.com/embed/${value.video_id}`
                }
                $(".messages").append(`
                <a href="https://youtu.be/${value.video_id}" data-fancybox>
                    <iframe src="${source}" frameborder="0 allow="accelerometer;clipboard-write;encrypted-media;gyroscope;" allowfullscreen>
                    </iframe> 
                    ${"text" in value? `<div class="short-image-text">${value.text}</div>` : ""}
                    <h3>${key}</h3>              
                </a>
                `)
            }
        }

        // Init Masonry with default options
        if (!isMobile() && screen.width > 1000) {
            $('.messages').masonry({itemSelector: ".messages-text-container, a", gutter: 10}).imagesLoaded().progress( function() {$($(".messages")).masonry('layout'); });
        } else { // if the device is a mobile- or pretty thin device, just display one column
            //$(".messages").children().css("margin-top", "25px")
        }

        for (const [author, message] of Object.entries(messages)) {
            if (message.type == "image") {
                $("#artist-name-container").append(`${author} / `)
            } 
        }
        $("#artist-name-container").text($("#artist-name-container").text().replace(/[\/](?=[^\/]*$)/, ""));

        // translate and animate translation switch
        $(".messages-text-container.has-translation").on("click", function() {
            $(this).attr("data-language", toggleLanguage($(this).attr("data-language")))
            var el = this;
            $($(this).children()[0]).fadeOut(250, function() {
                var authorName = $($(el).children()[1]).text();
                $($(el).children()[0]).text(messages[authorName][$(el).attr("data-language")]);
                $($(el).children()[0]).fadeIn(250);
            })
        })
    })
})

// lazy way of doing it but hey, if it works, it works
function toggleLanguage(curLang) {
    if (curLang == "original") {
        return "translated"
    } else {
        return "original"
    }
}