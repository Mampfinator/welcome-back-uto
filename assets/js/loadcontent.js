var messages;
const messagesFontSize = parseFloat(getComputedStyle($(".messages").get(0)).fontSize);

$(document).ready(function() {
    $.getJSON("assets/js/messagecontent.json", (data) => {messages = data})
    .done(function() {
        messages.messages.forEach(message => {
            if ("image" in message) {

                var thumbLocation;
                $.ajax({
                    method: "HEAD",
                    url: `images/thumbs/${message.image}`,
                    async: false,
                    cache: true,
                    success: () => {thumbLocation = "thumbs"},
                    error: () => {thumbLocation = "artworks"; return}
                })


                $(".messages").append(`
                        <a href="images/artworks/${message.image}" data-fancybox>
                            <img src="images/${thumbLocation}/${message.image}" alt="Image could not be loaded!"/>
                            ${"text" in message? `<div class="short-image-text">${message.text}</div>` : ""}
                            <h3>${message.author}</h3>
                        </a>
                    `)
                    $("#artist-name-container").append(`${message.author} / `)
            } else if ("video_id" in message) {
                // include option to add disclaimer (requested by Sans w/ a guitar)
                var source;
                if (message.source == "youtube") {
                    source = `https://youtube.com/embed/${message.video_id}`
                }
                $(".messages").append(`
                    <a href="https://youtu.be/${message.video_id}" data-fancybox>
                        <iframe src="${source}" frameborder="0 allow="accelerometer;clipboard-write;encrypted-media;gyroscope;" allowfullscreen>
                        </iframe> 
                        ${"text" in message? `<div class="short-image-text">${message.text}</div>` : ""}
                        <h3>${message.author}</h3>              
                    </a>
                `)
                
            } else { // if it's nothing else, it's just a text message
                    $(".messages").append(`
                        <div class="messages-text-container${"translated" in message? " has-translation" : ""}" data-language="original">
                            <div>${message.text}</div>
                            <h3>${message.author}</h3>
                        </div>
                    `);


                    
            }
        });

        // Init Masonry with default options
        //if (screen.width > 736) {
        //} /*else { // if the device is a mobile- or pretty thin device, just display one column
        //}*/
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

    }).then(() => {
        $('.messages').masonry({itemSelector: ".messages-text-container, a", gutter: 10}).imagesLoaded().progress( function() {$($(".messages")).masonry('layout'); });
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