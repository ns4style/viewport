blocks.prefooter = {
    init: function(){
        $(".prefooter__nav").click(function(){
            var curPos=$(document).scrollTop();
            var scrollTime=curPos/1.73;
            $("body,html").animate({"scrollTop":0},scrollTime);
        });
    }
};