var messages;
const messagesFontSize = parseFloat(getComputedStyle($(".messages").get(0)).fontSize);


$(function() {
    
    var currentSmallest;

    $.getJSON("assets/js/messagecontent.json", () => {}).done( (data)=> {
        messages = data;


        

        for (const [key, value] of Object.entries(messages)) {
           
            var toAppend = $("#messages-1");
            $(".messages").children().each((index, value) => {
                if (getContentHeightSum($(value)) < getContentHeightSum(toAppend)) { 
                    toAppend = $(value)
                }
            })
            

            if (value.type == "text") {
                toAppend.append(`
                    <div class="messages-text-container${"translated" in value? " has-translation" : ""}" data-language="original">
                        <div>${value.original}</div>
                        <h3>${key}</h3>
                    </div>
                `);
            } else if (value.type == "image") {
                toAppend.append(`
                    <a href="images/artworks/${value.name}">
                        <img src="images/artworks/${value.name}" alt="" />
                        <h3>${key}</h3>
                    </a>
                `)
            }
        }
        $(".messages-text-container.has-translation").on("click", function() {
            $(this).attr("data-language", toggleLanguage($(this).attr("data-language")))
            var el = this;
            $($(this).children()[0]).fadeOut(250, function() {
                var authorName = $($(el).children()[1]).text();
                $($(el).children()[0]).text(messages[authorName][$(el).attr("data-language")]);
                $($(el).children()[0]).fadeIn(250);
            })
        })


        $(".messages").children().each((index, child) => {
            console.log($(child).height())
        })
    })
})

// .height() doesn't work correctly; best thing I could come up with in the meantime as the spacing between elements is always the same
function getContentHeightSum(parent) {
    var sum = 0;
    parent.children("a, div").each( (index, child) => {
        sum += child.getBoundingClientRect().height + 2*messagesFontSize;
        if ($($(child).find("img")[0]).is("img")) {
            var imgChild = $($(child).find("img")[0]);
            sum += imgChild.prop("naturalHeight")*((screen.width/3)/imgChild.prop("naturalWidth"))
        }
    })
    return sum;
}

// lazy way of doing it but hey, if it works, it works
function toggleLanguage(curLang) {
    if (curLang == "original") {
        return "translated"
    } else {
        return "original"
    }
}

