var content = {
    "Sir Eatsalot": {
        "type": "text",
        "original": "I am a test :)", 
        "translated": "[TBE]"
    },
    "Oujimaru": {
        "type":"text",
        "original": "I'm Genshin addicted. But I also love Tenshi.", 
        "translated": "[TBE]"
    },
    "Hizu": {
        "type":"image",
        "name": "test.png"
    }, 
    "Oujimaru2": {
        "type":"text",
        "original": "I'm Genshin addicted. But I also love Tenshi.", 
        "translated": "[TBE]"
    },    
    "Oujimaru3": {
        "type":"text",
        "original": "I'm Genshin addicted. But I also love Tenshi.", 
        "translated": "[TBE]"
    }
};



$(function() {


    var entryCounter = 0;

    for (const [key, value] of Object.entries(content)) {
        var $curAppend = $(`#messages-${entryCounter%3 + 1}`)
        console.log($curAppend.attr("id"));
        if (value.type == "text") {
            $curAppend.append(`
                <div class="messages-text-container">
                    <div>${value.original}</div>
                    <h3>${key}</h3>
                </div>
            `);
        } else if (value.type == "image") {
            $curAppend.append(`
                <a href="images/fulls/${value.name}">
                    <img src="images/thumbs/${value.name}" alt="" />
                    <h3>${key}</h3>
                </a>
            `)
        }

        entryCounter++;
    }

})