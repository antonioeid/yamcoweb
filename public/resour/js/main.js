
(function($){ "use strict";
             
    $(window).on('load', function() {
        $('body').addClass('loaded');
    });

/*=========================================================================
    Sticky Header
=========================================================================*/ 
    $(function() {
        var header = $("#header"),
            yOffset = 0,
            headerHeight = $('.header_section').height(),
            triggerPoint = 10;
        $(window).on( 'scroll', function() {
            yOffset = $(window).scrollTop();

            if (yOffset >= triggerPoint) {
                header.addClass("fixed-top");
            } else {
                header.removeClass("fixed-top");
            }

        });
        $('.header_height').css( 'margin-top', headerHeight );
    });
             
/*=========================================================================
    Main Slider
=========================================================================*/
    var owlSlider = $('#main-slider');
    owlSlider.owlCarousel({
        items: 1,
        loop: true,
        smartSpeed: 500,
        autoplayTimeout: 3500,
        autoplay: true,
        nav: true,
        navText: ['<i class="arrow_carrot-left"></i>', '<i class="arrow_carrot-right"></i>']
    });
    // Slider animation
    owlSlider.on('translate.owl.carousel', function () {
        $('.slider_content h1, .slider_content p, .slider_content a.fs_btn').removeClass('fadeInUp animated').hide();
    });

    owlSlider.on('translated.owl.carousel', function () {
        $('.owl-item.active .slider_content h1, .owl-item.active .slider_content p, .owl-item.active .slider_content a.fs_btn').addClass('fadeInUp animated').show();
    });

			 
/*=========================================================================
	Counter Up Active
=========================================================================*/
	var counterSelector = $('.counter');
	counterSelector.counterUp({
		delay: 10,
		time: 2000
	});

/*=========================================================================
    Sponsor Carousel
=========================================================================*/
	$('#sponsor_carousel').owlCarousel({
        loop: true,
        margin: 10,
        autoplay: true,
        smartSpeed: 1000,
        nav: false,
        dots: false,
        responsive: true,
        responsive : {
		    0 : {
		        items: 3
		    },
		    480 : {
		        items: 3,
		    },
		    768 : {
		        items: 6,
		    }
		}
    }); 

/*=========================================================================
	Initialize smoothscroll plugin
=========================================================================*/
	smoothScroll.init({
		offset: 60
	});

/*=========================================================================
	Active venobox
=========================================================================*/
	var vbSelector = $('.img_popup');
	vbSelector.venobox({
		numeratio: true,
		infinigall: true
	}); 

/*=========================================================================
    Subscribe Form
=========================================================================*/
    $('.subs-btn').on('click', function (event) {
        event.preventDefault();
        var name_attr = [];
        var values = [];
        var fs_process = "";
        if($(this).closest("section").attr('id') !== undefined)
        {
            var section_id = $(this).closest("section").attr('id');
        }else{
            var section_id = $(this).closest("footer").attr('id');
        }
        var submit_loader = '<div class="loading text-blue display-inline-block ml-10" id="loading">Loading...</div>';
        $('#' + section_id).find('form').find('button').after(submit_loader);
        $('#' + section_id).find('form input').each(
            function (index) {
                
                if ($(this).is('[data-email="required"]')) {
                    var required_val = $(this).val();
                    if (required_val != '') {
                        name_attr.push($(this).attr('name'));
                        values.push($(this).val());
                        fs_process = true;
                    } else {
                        $('#loading').remove();
                        $(this).addClass('fs-input-error');
                        fs_process = false;
                    }
                }

                if (!$(this).is('[data-email="required"]')) {
                    name_attr.push($(this).attr('name'));
                    values.push($(this).val());
                }

            });
        
        if (fs_process) 
        {
            localStorage.setItem('fs-section',section_id);
            $.post("mail/process.php", {
                data: { input_name: name_attr,values:values,section_id:section_id},
                type: "POST",
            }, function (data) {
                $('#loading').remove();
                var fs_form_output = '';
                if(data) 
                {
                    if(data.type == "fs-message") 
                    {
                       $('#error-msg').remove(); 
                       $('#success-msg').remove();
                       var fs_form_output = '<div id="success-msg" class="padding-15 mt-15 bdrs-3" style="border: 1px solid green; color: green;">'+data.text+'</div>';
                    }else if (data.type == "fs_error") {
                        $('#success-msg').remove();
                        $('#error-msg').remove(); 
                        var fs_form_output = '<div id="error-msg" class="padding-15 mt-15 bdrs-3" style="border: 1px solid red; color: red;">'+data.text+'</div>';
                    }else{
                        var fs_form_output = '';
                    } 
                }

                if(fs_form_output != '')
                {
                    var section_id = localStorage.getItem('fs-section');
                    $('#'+section_id).find('form').after(fs_form_output);
                }
                $('#' + section_id).find('form input').each(function (index) {
                    $(this).val('');
                    $(this).removeClass('fs-input-error');
                });

                setTimeout(function(){
                    $('#success-msg').fadeOut();
                    $('#success-msg').remove();
                    $('#error-msg').fadeOut();
                    $('#error-msg').remove();
                    $(this).submit();
                 },5000);
                localStorage.removeItem('fs_section');
            }, 'json');
        }
        
        $('#' + section_id).find('form input').each(function (index) {
            $(this).keypress(function () {
                $(this).removeClass('fs_input_error');
            });
        });

        $('#' + section_id).find('form input').each(function (index) {
            if ($(this).is(":focus")) {
                $(this).removeClass('fs_input_error');
            }
        });

    });	
				 
/*=========================================================================
	Scroll To Top
=========================================================================*/     
    $(window).on( 'scroll', function () {
        if ($(this).scrollTop() > 100) {
            $('#scroll-to-top').fadeIn();
        } else {
            $('#scroll-to-top').fadeOut();
        }
    });
       
/*=========================================================================
Year Counter 
=========================================================================*/
var currentYear = (new Date()).getFullYear();
$(document).ready(function () {
$("#year").text(currentYear);
});
    

/*=========================================================================
	Google Map Settings
=========================================================================*/
             
google.maps.event.addDomListener(window, 'load', init);

function init() {

	var mapOptions = {
		zoom: 11,
		center: new google.maps.LatLng(34.4096, 35.9051), 
		scrollwheel: false,
		navigationControl: false,
		mapTypeControl: false,
		scaleControl: false,
		draggable: false,
		styles: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}]
	};

	var mapElement = document.getElementById('google_map');

	var map = new google.maps.Map(mapElement, mapOptions);

	var marker = new google.maps.Marker({
		position: new google.maps.LatLng(34.4096, 35.9051),
		map: map,
		title: 'Location!'
	});
}

})(jQuery);
