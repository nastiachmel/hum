$('.js-slider').slick({
  dots:false,
  slidesToShow: 1,
  arrows:true,
  responsive: [
    {
    breakpoint: 780,
    settings: {
    arrows:false,
    dots:true
    } 
  }]
});

let show = true;
let position = $('.about').offset().top;
let tabGrid = $('.amazing-work__tabs-list').offset().top;
let positionSkill = $('.skill').offset().top;
let positionFact = $('.fact').offset().top;
$(window).scroll(function(){
    var windowScroll = $(window).scrollTop() + $(window).height();  
    if (position < windowScroll) {
      $.each($('.about__list-item'), function(i, el) {
        setTimeout(function() {
          $(el).addClass("animated ");
        }, 500 + (i * 500));
      });
    }
    if (tabGrid < windowScroll) {
      $('.tab-grid').addClass("animated fadeIn");
    }   

    if (positionSkill < windowScroll) {
      $(".skills").each(function(i){
        $(this).find(".skill-bar").animate({
          width: $(this).attr("data-percent") 
        },500+ (i * 1000))
      })
    }

    if (!show) return false; 
    if (positionFact < windowScroll) {
      $('.fact__count').css('opacity', '1');
      $('.fact__count').delay(500).spincrement({
        thousandSeparator: "",
        duration: 5000
      });
      show = false;
    }
});


function active( link) {
  // let list = document.querySelectorAll('.nav__item-link');
  $('.nav').removeClass('menu_state_open');
  $('.menu').removeClass('menu_state_open');
  $('.menu__icon').css("display",'block')
  var position = $(link).offset().top;
  $("HTML, BODY").animate({scrollTop: position}, 8000, 'linear');
}

$('.nav__close').click(function(){
  $('.nav').removeClass('menu_state_open');
  $('.menu').removeClass('menu_state_open');
  $('.menu__icon').css("display",'block');
})


const featureList = [
  {
    icon:' 0px 165px',
    title:'Retina Ready',
    description:'All our modules are built with the possi bility to thse choose between different design and you change.'
  },
  {
    icon:'0px 200px',
    title:'Creative Blog Style',
    description:'All our modules are built with the possi bility to thse choose between different design and you change.'
  },
  {
    icon:'-35px 163px',
    title:'Icon Fonts',
    description:'All our modules are built with the possi bility to thse choose between different design and you change.'
  },
  {
    icon:'-35px 200px',
    title:'Parallax Effects',
    description:'All our modules are built with the possi bility to thse choose between different design and you change.'
  },
  {
    icon:'0px 235px',
    title:'Amazing Interface',
    description:'All our modules are built with the possi bility to thse choose between different design and you change.'
  },
  {
    icon:'-35px 235px',
    title:'SEO Optimized',
    description:'All our modules are built with the possi bility to thse choose between different design and you change.'
    },
  {
    icon:'-63px 163px',
    title:'Creative Solutions',
    description:'All our modules are built with the possi bility to thse choose between different design and you change.'
    },
  {
    icon:'-65px 200px',
    title:'Mega Menus',
    description:'All our modules are built with the possi bility to thse choose between different design and you change.'
    },
  {
    icon:'-65px 235px',
    title:'Custom Backgrounds',
    description:'All our modules are built with the possi bility to thse choose between different design and you change.'
    }
]

for(let feature of featureList){
  let item = `<li class="grid__item wow fadeInLeft" data-wow-duration="2s">`;
  item += `<div class="grid__item-title">`;
  item += `<div class="grid__item-icon" style="background-position: ${feature.icon}"> </div>`;
  item+= `${feature.title} </div>`;
  item += ` <div class="grid__item-description">${feature.description} </div>`;
  item+= `</li>`;

  document.querySelector('.grid').innerHTML +=item;
}

$(document).ready(function(){  
  $('.nav__icon').click(function(){
    $('.nav__search').toggle();
  })

  $(".nav__icon").click(function(){
    let a = "";
    let b = "0";
    $('body').removeHighlight();
    a = $('.nav__search').attr('value');
    if($('.nav__search').val() == ""){
      return false;
    }else{
      $('body').highlight( a );
      b = $("span.highlight").length;
      if(b == 0){
        alert('not found');
      }else{
      $('html, body').animate({
        scrollTop: parseInt($('.highlight').offset().top)
      }, 2000);
    }
      $('.nav__search').val('');
      return false;  
    }  
  });      
});

$( ".about-company__tabs" ).tabs({ active: 2 });

  //
$('.menu__icon').on('click', function() {
  $(this).closest('.menu').toggleClass('menu_state_open');
  if($('.menu_state_open')){
    $('.menu__icon').css("display",'none');
  }
  $('.nav').addClass('menu_state_open');
});

getData = (url)=> {
  return  fetch(url).then(function(result){
    return result.json();
  });
}
    
getData('https://newsapi.org/v2/top-headlines?country=us&category=entertainment&apiKey=3d8b73d8e06f4b748ba94a97e994845f').then(function(result){
  if(result){
    if(result.articles.length>8){
      result.articles.length=8;
      let list= ``;
      for (let news of result.articles){
        let date = new Date(news.publishedAt);
        let newDate= date.getDate();
        let month = ("0" + (date.getMonth() + 1)).slice(-2); 

    
        list += `  <li class="news-grid__item">`;
        //if(news.urlToImage)
        console.log(news.urlToImage)
        list += `   <div class="news-grid__item-img" style="background-image:url(${news.urlToImage})">`;
        list += `   <div class="news-grid__item-data">${newDate } <br>${month}</div></div>`;
        list += `<a class="news-grid__item-title">${news.title}</a>`;
        if(news.author==null){
          news.author='Admin';
        }
        list += `<div class="news-grid__item-author">${news.author}`;
      //  list += `<div class="news-grid__item-likes" onclick="addLike(this)"><i class="far fa-heart"></i><span>0</span></div></div>`;
        list += `  </li>`;
      }  
      document.getElementsByClassName('news-grid')[0].innerHTML = list;
    }
  }
})

// addLike = (elem) => {  
//   let block= elem.childNodes[elem.childNodes.length- 1];
//   let count = +block.innerHTML;
//   block.innerHTML= ++count;
//   elem.childNodes[0].classList.remove('far');
//   elem.childNodes[0].classList.add('fas'); 
// }

//
getData("https://randomuser.me/api/?results=4").then(function(result){
  if(result){ 
    let list= ``;
    for (let team of result.results){   
      list += `  <li class="team-list__item">`;
      list += `   <div class="team-list__item-img" style="background-image:url(${team.picture.large})"></div>`;
      list += `   <div class="team-list__item-name">${team.name.first} ${team.name.last}</div>`;
      list += `<div class="block-social">`;
  
      list += ` <a href="${team.email}" class="block-social__link"><i class="block-social__icon fab fa-facebook-f"></i></a>`;
      list += ` <a href="${team.email}" class="block-social__link"><i class="block-social__icon fab fa-twitter"></i></a>`;
      list += ` <a href="${team.phone}" class="block-social__link"><i class="block-social__icon fab fa-skype"></i></a>`;
      list += ` <a href="${team.email}" class="block-social__link"><i class="block-social__icon fab fa-vimeo-v"></i></a>`;
      list += `</div>`;
      list += `</li>`;
    }

    document.getElementsByClassName('team-list')[0].innerHTML = list;
  }
})

$( ".amazing-work" ).tabs();

getData("https://newsapi.org/v2/top-headlines?country=no&category=sports&apiKey=3d8b73d8e06f4b748ba94a97e994845f").then(function(result){

  if(result){
    if(result.articles.length>12){
      result.articles.length=12;
      let list= ``;
      for (let work of result.articles){
        if(work.urlToImage==null){
          work.urlToImage='./img/notfound.png';
        }
        list += ` <li class="tab-grid__item " style="background-image:url(${work.urlToImage})"  >`;
        list += `<div class="tab-grid__item-hover"><a class="tab-grid__item-link"> <i  class=" tab-grid__item-icon fas fa-search " ></i></a> <div class="tab-grid__item-title">Web Design</div></div>`;  
        list +=`</li>`;
      }  
      document.getElementsByClassName('tab-grid')[0].innerHTML = list;
      document.getElementsByClassName('tab-grid')[2].innerHTML = list;
      document.getElementsByClassName('tab-grid')[4].innerHTML = list;
    }
  }
})

$('.btn--work').click(function(){ 
  getData("https://newsapi.org/v2/top-headlines?country=no&category=sports&apiKey=3d8b73d8e06f4b748ba94a97e994845f").then(function(result){
    if(result){
      console.log(result.articles.length);
      let list= ``;
      for (let work of result.articles){     
        if(work.urlToImage==null){
          work.urlToImage='./img/notfound.png';
        }
        list += ` <li class="tab-grid__item" style="background-image:url(${work.urlToImage})"  >`;
        list += `<div class="tab-grid__item-hover"><a class="tab-grid__item-link"> <i  class=" tab-grid__item-icon fas fa-search " ></i></a> <div class="tab-grid__item-title">Web Design</div></div>`;  
        list +=`</li>`;
      }
      document.getElementsByClassName('tab-grid')[0].innerHTML = list;
    }
  
  })
})

getData("https://newsapi.org/v2/top-headlines?country=fr&category=entertainment&apiKey=3d8b73d8e06f4b748ba94a97e994845f").then(function(result){

  if(result){
    if(result.articles.length>12){
      result.articles.length=12;
      let list= ``;
      for (let work of result.articles){ 
        if(work.urlToImage==null){
          work.urlToImage='./img/notfound.png';
        }
        list += ` <li class="tab-grid__item" style="background-image:url(${work.urlToImage})"  >`;
        list += `<div class="tab-grid__item-hover"><a class="tab-grid__item-link"> <i  class=" tab-grid__item-icon fas fa-search " ></i></a> <div class="tab-grid__item-title">Web Design</div></div>`;  
        list +=`</li>`;
      }
      document.getElementsByClassName('tab-grid')[1].innerHTML = list;
      document.getElementsByClassName('tab-grid')[3].innerHTML = list;
    }
  }
})


//map
function initMap() { 
  let map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,  
    center: {lat:40.6895341, lng:-73.9182189}
  });

  let image = 'img/marker.png';
  let marker = new google.maps.Marker({
    position: {lat: 40.6956512, lng: -73.9283756},
    map: map,
    title: 'Our office',
    icon: image
  });  
}


// wow = new WOW(
//   {
//   boxClass:     'wow',      // default
//   animateClass: 'animated', // default
//   offset:       0,          // default
//   mobile:       true,       // default
//   live:         true        // default
//  }
// )
new WOW().init();


