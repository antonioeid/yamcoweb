import { Component } from '@angular/core';
declare var $ :any;
declare var jQuery:any;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})  

export class HomeComponent {



  ngOnInit() {
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
  
}
}
