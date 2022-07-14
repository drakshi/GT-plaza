/*Select2*/

$('#country').select2({
    placeholder: "Select"
});
$('#state').select2({
    placeholder: "Select"
});
$('#user_type').select2({
    minimumResultsForSearch: -1,
    placeholder: "Select"
});
$('#category,#topic-post').select2({
    placeholder: "Select"
});

$('#shipping_term'). select2({

    placeholder: "Select"
});

$('#sub-category').select2({

    placeholder: "Select"
});

$('#child-category').select2({
    placeholder: "Select"

});

$('#child-category-1').select2({
    placeholder: "Select"

});

$('#unit1').select2({
    placeholder: "Select"

});

$('#product-country1').select2({
    placeholder: "Select"

});

$('#pack_unit_id').select2({
    placeholder: "Select"

});

$('#pack_unit_id1').select2({
    placeholder: "Select"

});

$('#product_sub_category').select2({
    placeholder: "Select"

});

$('#product_sub_category-1').select2({
    placeholder: "Select"

});

$('#location-post').select2({placeholder: "Select"});
$('#state-post').select2({
    placeholder: "Select"

});
$('#city-post').select2({
    placeholder: "Select"

});

$('#category-post').select2({
    placeholder: "Select"

});

$('#prod-categories').select2({
    placeholder: "Select"

});

$('#prod-categories-edit').select2({
    placeholder: "Select"

});

$('#category-post-1').select2({
    placeholder: "Select"

});

$('#payment_terms').select2({

    placeholder: "Select"

});

$('#unit-post').select2({
    placeholder: "Select"

});

$('#business_type_id').select2({
    placeholder: "Select"

});

$('#business_type_id1').select2({
    placeholder: "Select"

});

$('#primary_business').select2({
    placeholder: "Select business type"

});

$('#secondary_business').select2({
    placeholder: "Select business type",

});

$('#industry').select2({
    placeholder: "Select"

});
$('#ownership').select2({
    placeholder: "Select ownership type"

});

$('#market').select2({
    placeholder: "Select markets"

});

$('.business_category').select2({
    placeholder: "Select category"
});

$('#days').select2({
    placeholder: "Select working days"

});

$('#package').select2({
    placeholder: "Select"

});
$('#package1').select2({
    placeholder: "Select"

});
$('#unit-pack').select2({
    placeholder: "Select unit"

});
$('#unit-pack1').select2({
    placeholder: "Select unit"

});

$('#office_location').select2({
    placeholder: "Select location"

});

$('.office_location').select2({placeholder: "Select location"});

$('#office_state').select2({
    placeholder: "Select"

});
$('#factory_location').select2({placeholder: "Select"});
$('#factory_size').select2({
    placeholder: "Select"

});
$('#capacity').select2({
    placeholder: "Select"

});
$('#lead_time').select2({placeholder: "Select"});

$('#lead_time1').select2({
    placeholder: "Select"

});

$('#revenue').select2({placeholder: "Select"});
$('#registration_location').select2({placeholder: "Select"});
$('#product-group').select2({
    placeholder: "Select"

});

$('#product-country').select2({
    placeholder: "Select"

});
$('#unit').select2({
    placeholder: "Select"

});

$('#sub-category-post').select2({
    placeholder: "Select"

});

$('#supply-unit').select2({
    placeholder: "Select"

});

$('#supply-unit1').select2({
    placeholder: "Select"

});


/*Owl carousel*/
$('.owl-home').owlCarousel({
    autoplay: false,
    autoplayTimeout:20000000,
    autoplayHoverPause:true,
    loop: true,
    margin: 10,
    dots: false,
    nav: false,
    responsive: {
        0:{
            items: 1,
            margin: 10
        },
        500:{
            items: 2,
            margin: 25
        },
        600: {
            items: 2,
            margin: 25
        },
        992: {
            items: 3,
            margin: 25
        },
        1160: {
            items: 3,
            margin: 25
        },
        1200: {
            items: 4,
            margin: 25
        }
    }
});
/*Owl carousel*/
$('#owl-related').owlCarousel({
    loop:false,
    margin:15,
    autoplay:true,
    autoplayTimeout:2500,
    lazyLoad:true,
    autoplayHoverPause:true,
    nav:false,
    dots:false,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:3
        },
        1000:{
            items:5
        }
    }
});

$(".otp-list input").keyup(function(){
    var key = event.keyCode || event.charCode;
    if( key == 48 || key == 49 || key == 50 || key == 51 || key == 52 || key == 53 || key == 54 || key == 55 || key == 56 || key == 57 || key == 96 || key == 97 || key == 98 || key == 99 || key == 100 || key == 101 || key == 102 || key == 103 || key == 104 || key == 105 ){
        $(this).next("input[type='text']").focus();
    }
    if( key == 8 ){
        $(this).prev("input[type='text']").focus();
    }
    if ( key == 48 || key == 49 || key == 94 ) {
        event.preventDefault();
    }
    $('.otp-list input').on("wheel", function (e) {
        $(this).blur();
    });
});

$(document).ready(function(){
    var owl = $('.singleProduct-owl');
    owl.owlCarousel({
        loop:true,
        margin:10,
        nav:false,
        items: 1,
    });

    // Custom Button
    $('.customNextBtn').click(function() {
        owl.trigger('next.owl.carousel');
    });
    $('.customPreviousBtn').click(function() {
        owl.trigger('prev.owl.carousel');
    });

});

// /*AOS*/
AOS.init({
    duration: 600,
});

$(document).ready(function() {
    $('#videoModal').on('hidden.bs.modal', function() {
        var $this = $(this).find('iframe'),
            tempSrc = $this.attr('src');
        $this.attr('src', "");
        $this.attr('src', tempSrc);
    });
});

$(document).ready(function() {
    $('.filter-button').click(function() {
        $('#filter-main').toggleClass('filterMenu');
        $('.menu-backdrop').toggle();
        $('body').toggleClass('no-scroll');
    });
    $('.filter-icon').click(function() {
        $('#filter-main').toggleClass('filterMenu');
        $('.menu-backdrop').toggle();
        $('body').toggleClass('no-scroll');
    });
});

// var div = $('.data-list');
// setInterval(function(){
//     var pos = div.scrollTop();
//     div.scrollTop(pos + 1);
// }, 20)
$(document).ready(function() {
    $('iframe').css('right','0 !important');
})
