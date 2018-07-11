var scrollWidth = 0;
mineral = function(options){
    console.log(options);
    document.querySelector("body").style.fontFamily = options.config.font.family;
    document.querySelector("body").style.fontSize = options.config.font.size;
    if(options.config.scrollPercent.show){
        var div = document.createElement('div');
        div.style.backgroundColor = options.config.scrollPercent.color;
        div.style.height = options.config.scrollPercent.height;
        div.style.width= this.scrollWidth+'%';
        div.id = 'mineral-scroll-percent';
        div.style.position = 'fixed';
        if(options.config.scrollPercent.bottom)
        {
            div.style.bottom= '0';
        }
        div.style.top= '0';
        div.style.zIndex= '10000';
        document.body.appendChild(div);
        $(window).scroll(function(e){
            var scrollTop = $(window).scrollTop();
            var docHeight = $(document).height();
            var winHeight = $(window).height();
            var scrollPercent = (scrollTop) / (docHeight - winHeight);
            var scrollPercentRounded = Math.round(scrollPercent*100);

            this.scrollWidth =  scrollPercentRounded;
            repositionLabel();
            document.querySelector('#mineral-scroll-percent').style.width = scrollPercentRounded+'%';
        });

    }
    //create css statement
    var cssStatement = "";
    Object.keys(options.config.color).forEach(function(key) {
        //text color
        var textClass = "text-"+key;
        cssStatement += createStyleText(textClass,"color",options.config.color[key]);
        //background color
        var bgClass = "bg-"+key;
        cssStatement += createStyleText(bgClass,"background-color",options.config.color[key]);

    });

    //create style tag at the end of head element
    setStyles(cssStatement);
}


function createStyleText(className,attribute,style) {
    return '.'+className+'{ '+attribute+': '+style+'!important; }'
}

function setStyles(cssStatement) {
    var css = cssStatement,
        head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style');
    style.type = 'text/css';
    if (style.styleSheet){
        // This is required for IE8 and below.
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }
    head.appendChild(style);
    return 1;
}



$(window).resize(function(){
    repositionLabel();
});

function repositionLabel() {
    $('#scrollPercentLabel').css({
        position:'fixed',
        left: ($(window).width() - $('#scrollPercentLabel').outerWidth()) / 2,
        top: (($(window).height() - $('#scrollPercentLabel').outerHeight()) / 2) - $('#scrollPercentLabel').height()
    });
}

repositionLabel();