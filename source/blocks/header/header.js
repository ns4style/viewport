blocks.header = {
    init: function(){
        $('.header__top-menu-item').hover(function () {
            $(this).find('ul').stop(true, true).slideToggle('fast');
        });

        $('.header__bottom-menu-item').hover(function () {
            $(this).find('ul').stop(true, true).slideToggle('fast');
        });
    }
};