var i, src, extension = Modernizr.svg ? '.svg' : '.png';
var planete_rouge = $('#planete-rouge');
var planete_vie = $('#planete-vie');
var planete_rouge_circles = $('#planete-rouge-circles');
var planete_rouge_circles_circles =
        planete_rouge_circles.find('circle');
var circles_number = planete_rouge_circles_circles.length;
var planete_rouge_paths = planete_rouge_circles.find('path');
var planete_rouge_paths_number = planete_rouge_paths.length;
var planete_rouge_about_me_letters =
        $('#planete-rouge-about-me-letters').find('path');
var planete_rouge_about_me_letters_number =
        planete_rouge_about_me_letters.length;

elements = $('img');
for (i=0;i<elements.length;i++) {
    src = elements[i].getAttribute('data-svg');
    if (src) {
        elements[i].src = src + extension;
        elements[i].removeAttribute('data-svg');
    }
}

var draw_text = function(paths_selector) {
    var paths = $(paths_selector);
    var paths_length = paths.length;
    var svg_path;
    var svg_path_length;
    for(i = 0; i< paths_length; i++) {

        svg_path = paths.eq(i);
        svg_path_length = svg_path[0].getTotalLength();

        svg_path.css({"fill-opacity": 0,
                      "stroke-dasharray": svg_path_length,
                      "stroke-dashoffset": svg_path_length})
            .velocity({strokeDashoffset: 0}, {duration: 3000, delay: 600})
            .velocity({fillOpacity: [1, 0], strokeOpacity:[0,1]});
    }

};

draw_text('#hello-i-am-aurelien path');
draw_text('#planete-rouge-about-me-letters path');
draw_text('#planete-vie-contact-letters path');


$("#planete-anneaux").velocity("transition.slideDownBigIn",
                               { duration: 1500, delay: 500 });
$("#planete-rouge").velocity("transition.slideUpBigIn",
                             { duration: 1500, delay: 500 });
$("#aurelien-sur-la-lune").velocity("transition.bounceLeftIn",
                                    {duration: 1500, delay: 500});
$("#planete-rayures").velocity("transition.bounceLeftIn",
                               {duration: 1500, delay: 500});
$("#planete-vie").velocity("transition.bounceRightIn",
                           {duration: 1500, delay: 500});

var planete_vie_contact_letters =
        $('#planete-vie-contact-letters path');
var planete_vie_contact_letters_number =
        planete_vie_contact_letters.length;
var planete_vie_continents = $('#planete-vie-continents path');
var planete_vie_continents_number = planete_vie_continents.length;
planete_vie.mouseenter(function() {
    planete_vie.velocity({scaleX: 1.3, scaleY: 1.3}, {duration:
                                                      500});

    for(i=0 ;i < planete_vie_contact_letters_number; i++) {
        planete_vie_contact_letters
            .eq(i)
            .velocity({ fill: "#11ea96"},
                      {duration: 500});
    }

    for(i=0 ;i < planete_vie_continents_number; i++) {
        planete_vie_continents
            .eq(i)
            .velocity({ fill: "#11ea96"},
                      {duration: 500});
    }

}).mouseleave(function() {
    planete_vie.velocity({scaleX: 1, scaleY: 1}, {duration: 500});

    for(i=0 ;i < planete_vie_contact_letters_number; i++) {
        planete_vie_contact_letters
            .eq(i)
            .velocity({ fill: "#1b8e65"},
                      {duration: 500});
    }

    for(i=0 ;i < planete_vie_continents_number; i++) {
        planete_vie_continents
            .eq(i)
            .velocity({ fill: "#1b8e65"},
                      {duration: 500});
    }
});

planete_rouge.mouseenter(function() {

    planete_rouge.velocity({scaleX: 1.3, scaleY: 1.3}, {duration: 500});

    for(i=0 ;i < circles_number; i++) {
        planete_rouge_circles_circles
            .eq(i)
            .velocity({ fill: "#ff694d"},
                      {duration: 500});
    }
    for(i=0; i < planete_rouge_paths_number; i++) {
        planete_rouge_paths.eq(i).
            velocity({ fill: "#ff694d"},
                     {duration: 500});
    }

    for(i=0; i <planete_rouge_about_me_letters_number; i++) {
        planete_rouge_about_me_letters.eq(i).
            velocity({ fill: "#ff694d"},
                     {duration: 500});
    }
}).mouseleave(function() {

    planete_rouge.velocity({scaleX: 1, scaleY: 1}, {duration:
                                                    500});

    for(i=0 ;i < circles_number; i++) {
        planete_rouge_circles_circles
            .eq(i)
            .velocity({ fill: "#c22327"},
                      {duration: 500});
    }
    for(i=0; i < planete_rouge_paths_number; i++) {
        planete_rouge_paths.eq(i).
            velocity({ fill: "#c22327"},
                     {duration: 500});
    }
    for(i=0; i <planete_rouge_about_me_letters_number; i++) {
        planete_rouge_about_me_letters.eq(i).
            velocity({ fill: "#c22327"},
                     {duration: 500});
    }
});

$('#about-link').click(function() {
    $('#about').velocity("scroll", 1000);
    return false;
});
$('#contact-link').click(function() {
    $('#contact').velocity("scroll", 1000);
    return false;
});

var contact_points = $('#contact-points path');
var contact_points_length = contact_points.length;
var animate_contact_points = function (fill_color, delay) {
        for(i=contact_points_length; i >= 0; i--) {
        contact_points.eq(i).
            velocity({ fill: fill_color},
                     {duration: 50,
                      delay: delay + 50*(contact_points_length-i)});
    }
};

var carte_postale_points = $('#carte-postale-points path');
var carte_postale_points_length = carte_postale_points.length;


$('#contact').mouseenter(function(){
    animate_contact_points("#d7fffb", 0);
    animate_carte_postale_points();
}).mouseleave(function(){

    for(i=contact_points_length; i >= 0; i--) {
        contact_points.eq(i).velocity('stop');
        contact_points.eq(i).
            velocity({ fill: "#22252e"});
    }

});


// var menu = $('#menu');
// var about = $('#about');
// var current = 0; //0 means default planets mode => landing menu
// $(window).scroll(function(){

//     if ($(window).scrollTop() > about.offset().top) {
//         if(current == 0) {
//             // menu.addClass('fixed_menu');
//             // menu.css({display: 'none'});
//             // menu.removeClass('landing_menu');
//             // menu.velocity("stop");
//             // menu.velocity("transition.bounceLeftIn");

//             // current = 1;
//         }
//     }  else {
//         if(current == 1) {
//             // menu.velocity("stop");
//             // menu.velocity("transition.bounceLeftOut",
//             //               {complete:
//             //                function() {
//             //                    menu.css({display: 'block',
//             //                              opacity: 1});
//             //                    menu.removeClass('fixed_menu');
//             //                    menu.addClass('landing_menu');
//             //                }});

//             // current = 0;
//         }
//     }
// });
