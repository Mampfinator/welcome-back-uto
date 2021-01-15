var content;

$(function() {
    
    var currentSmallest;

    $.getJSON("assets/js/messagecontent.json", () => {}).done( (messages)=> {
        content = messages;

        for (const [key, value] of Object.entries(messages)) {
           
            var toAppend = $("#messages-1");
            $(".messages").children("div").each((index, value) => {
                console.log($(value))
                if (getChildrenHeightSum($(value)) < getChildrenHeightSum(toAppend)) { 
                    toAppend = $(value)
                }
            })
            console.log("------------")
            

            if (value.type == "text") {
                toAppend.append(`
                    <div class="messages-text-container" data-language-type="default">
                        <div>${value.original}</div>
                        <h3>${key}</h3>
                    </div>
                `);
            } else if (value.type == "image") {
                toAppend.append(`
                    <a href="images/fulls/${value.name}">
                        <img src="images/fulls/${value.name}" alt="" />
                        <h3>${key}</h3>
                    </a>
                `)
            }
        }
    })
})

function getChildrenHeightSum(parent) {
    var sum = 0;
    parent.children().each( (index, child) => {
        sum += $(child).height();
    })
    return sum;
}


$(".messages-text-container").click(() => {
    // add logic for translations
    this.children("div").html()
})