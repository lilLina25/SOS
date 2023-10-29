"use strict";

//<Скрипты для шапки>

//Импорт языков
import langs from './languages.js';
//<Реализация заполнения списка языка>
const btns = ['eng','rus','fra','deu'];
let langLinks = document.querySelectorAll('.choseeLang');
//Задаем английский язык по умолчанию
if(localStorage.getItem('lastLang') === null){
		localStorage.setItem('lastLang', btns[0]);
}
//Заполняем языковую кнопку до первого щелчка по списку
for(let i = 0; i<4; i++){
	langLinks[i].innerHTML = btns[i];
	if(localStorage.getItem('lastLang') !== null){
		langLinks[0].innerHTML = localStorage.getItem('lastLang');
	}
	if(langLinks[0].innerHTML === langLinks[i].innerHTML && langLinks[i] !== langLinks[0]){
		langLinks[i].innerHTML = btns[0];
	}
}
//Показывать/скрывать список при наведении мыши
let langArea = document.querySelector('.header__language');
let langList = document.querySelector('.header__langlist');
langArea.addEventListener('mouseover',showList);
langArea.addEventListener('mouseout',hideList);
function showList(){
		langList.classList.remove('hidden');
};
function hideList(){
		langList.classList.add('hidden');
};

//<Скрипт для переключения листа языков после клика по списку языков>
let dataBtns = document.querySelectorAll("[data-btn]");
let langBtn = document.querySelector('.langBtn');

for(let dataBtn of dataBtns){
	let langItem = '';
	dataBtn.addEventListener('click',function(){
		langItem = dataBtn.innerHTML;
		dataBtn.innerHTML = langBtn.innerHTML;
		langBtn.innerHTML = langItem;
		changeLanguage(langBtn.innerHTML);
		localStorage.setItem('lastLang', langBtn.innerHTML);
	});
}

//<Функция для смены языка на всей странице>
let dataLangs = document.querySelectorAll("[data-lang]");

function changeLanguage(props){
	if(props === undefined){
		props = localStorage.getItem('lastLang');;
	}
	for(let elem in langs){
		let subObj = langs[elem];
		for(let lang in subObj){
			for(let dataElem of dataLangs){
				if(elem === dataElem.getAttribute("data-lang") && lang === props){
					dataElem.innerHTML = subObj[lang];
				}
			}
		}
	}
};

//Вызов функции при первом включении для автозаполнения
changeLanguage();
//Реализация меню-бургера
let headerMenu = document.querySelector('.menu-header__menu');
let headerBtn = document.querySelector('.menu-header__icon');
let links = document.querySelectorAll('.menu-header__link');
headerBtn.addEventListener('click',function(){
		headerMenu.classList.toggle('active__menu');
		headerBtn.classList.toggle('active');
		document.body.classList.toggle('overflow');
	});
for(let link of links){
	link.addEventListener('click', function(){
		headerMenu.classList.remove('active__menu');
		headerBtn.classList.remove('active');
		document.body.classList.remove('overflow');
	});
}
//Настройка swiper
let main_slides = document.querySelectorAll('.main__swiper-slide');
let main_next = document.querySelector('.main__next');
let main_prev = document.querySelector('.main__prev');
new Swiper('.main', {
	//Инициализация
	on:{
		init: function(){
			main_prev.classList.add('hidden');
		}
	},
	//Автопрокрутка
	autoplay:{
		delay:3000,
	},
	//Стрелки
	navigation:{
		nextEl: '.main__next',
		prevEl: '.main__prev'
	},
	//Буллеты, пагинация
	pagination:{
		el:'.main__pagination',
	},
});
let mainHide = hideBtn(main_prev, main_next, main_slides);
main_prev.addEventListener('click',mainHide);
main_next.addEventListener('click',mainHide);

//<About block>
let about_slides = document.querySelectorAll('.about__img');
let swiper_wrapper = document.querySelector('.about__wrapper');
let about_next = document.querySelector('.about__next');
let about_prev = document.querySelector('.about__prev');
let progressbar = document.querySelector('.progressbar');
let bullets = document.querySelector('.about__swiper').getElementsByClassName('swiper-pagination-bullet');

//Настройка Swiper
new Swiper('.about__imgblock',{
	//Стрелки
	navigation:{
		nextEl: '.about__next',
		prevEl: '.about__prev'
	},
	//Буллеты, пагинация
	pagination:{
		el:'.swiper-pagination',
	},
	//Отключение свайпа
	simulateTouch:false,
	touchRatio:0,
	//Организация ступенчатого слайдера
	on:{
		init: function(){
				about_slides[0].style = "transform:translate3d(0px,0px,0px);z-index:4";
				about_slides[1].style = "transform:translate3d(10%,0px,-60px);z-index:3";
				about_slides[2].style = "transform:translate3d(23%,0px,-150px);z-index:2";
				about_slides[3].style = "transform:translate3d(33%,0px,-200px);z-index:1";
				about_prev.classList.add('hidden');
		},
		slideChange: function(){
			swiper_wrapper.style = "transform:translate3d(0px,0px,0px)";
			for(let i=0; i<=3; i++){
				if(about_slides[i].classList.contains('swiper-slide-active')){
					if(about_slides[i+1] !== undefined && event.target === about_next){
						about_slides[i+1].style = "transform:translate3d(0px,0px,0px);z-index:4";
						about_slides[i].style = "transform:translate3d(-10%,0px,-60px);z-index:3";
						if(about_slides[i-1] !== undefined){
							about_slides[i-1].style = "transform:translate3d(-23%,0px,-150px); z-index:2";
						}
						if(about_slides[i-2] !== undefined){
							about_slides[i-2].style = "transform:translate3d(-33%,0px,-200px); z-index:1";
						}
						if(about_slides[i-3] !== undefined){
						about_slides[i-3].style.zIndex = "1";
						}
						if(about_slides[i+2] !== undefined){
						about_slides[i+2].style = "transform:translate3d(10%,0px,-60px);z-index:3";
						}
						if(about_slides[i+3] !== undefined){
							about_slides[i+3].style = "transform:translate3d(23%,0px,-150px);z-index:2";
						}
					}
					if(about_slides[i-1] !== undefined && event.target === about_prev){
						about_slides[i-1].style = "transform:translate3d(0px,0px,0px);z-index:4";
						about_slides[i].style = "transform:translate3d(10%,0px,-60px);z-index:3";
						if(about_slides[i+1] !== undefined){
							about_slides[i+1].style = "transform:translate3d(23%,0px,-150px);z-index:2";
						}
						if(about_slides[i+2] !== undefined){
							about_slides[i+2].style = "transform:translate3d(33%,0px,-200px);z-index:1";
						}
						if(about_slides[i-2] !== undefined){
						about_slides[i-2].style= "transform:translate3d(-10%,0px,-60px);z-index:3";
						}
						if(about_slides[i-3] !== undefined){
							about_slides[i-3].style = "transform:translate3d(-23%,0px,-150px); z-index:2";
						}
					}
				}
			}
		}
	}
});

function hideBtn(prev, next, item){
	return function(){
		if(item[0].classList.contains('swiper-slide-active')){
			prev.classList.add('hidden');
		}else{
			prev.classList.remove('hidden');
		}
		if(item[3].classList.contains('swiper-slide-active')){
			next.classList.add('hidden');
		}else{
			next.classList.remove('hidden');
		}
	}
}

function progress(){
 for(let i = 0; i<=3; i++){
		if(bullets[i].classList.contains('swiper-pagination-bullet-active')){
			if(i === 0){
				if(event.target.classList.contains('about__prev')){
					progressbar.style = "width:0%";
					bullets[i].style = "--swiper-pagination-bullet-inactive-opacity: 0.2";
				}
			}
			if(i === 1){
				if(event.target.classList.contains('about__next')){
					progressbar.style = "width:15%";
					bullets[i-1].style = "--swiper-pagination-bullet-inactive-opacity: 1";
				}
				if(event.target.classList.contains('about__prev')){
					progressbar.style = "width:15%";
					bullets[i].style = "--swiper-pagination-bullet-inactive-opacity: 0.2";
				}
			}
			if(i === 2){
				if(event.target.classList.contains('about__next')){
					progressbar.style = "width:27%";
					bullets[i-1].style = "--swiper-pagination-bullet-inactive-opacity: 1";
				}
				
				if(event.target.classList.contains('about__prev')){
					progressbar.style = "width:27%";
					bullets[i].style = "--swiper-pagination-bullet-inactive-opacity: 0.2";
				}
			}
			if(i === 3){
				if(event.target.classList.contains('about__next')){
					progressbar.style = "width:40%";
					bullets[i-1].style = "--swiper-pagination-bullet-inactive-opacity: 1";
				}
			}
		}		
	}	
};

let aboutHide = hideBtn(about_prev, about_next, about_slides);
about_prev.addEventListener('click',aboutHide);
about_next.addEventListener('click',aboutHide);
about_next.addEventListener('click',progress);
about_prev.addEventListener('click',progress);

//Features
let features_texts = document.querySelectorAll('.features__text');
let features_btns = document.querySelectorAll('.features__item');
let features__circles = document.querySelectorAll('.features__circle');

for(let i = 0; i<3; i++){
	features_btns[i].addEventListener('click', function(){
		for(let text of features_texts){
			if(text !== features_texts[i] && text.classList.contains('active_desc')){
				text.classList.remove('active_desc');
			}
		}
		features_texts[i].classList.toggle('active_desc');
		for(let circle of features__circles){
			if(circle !== features__circles[i] && features_texts[i].classList.contains('active_desc') || !features_texts[i].classList.contains('active_desc')){
				circle.classList.remove('active_circle');
			}else{
				circle.classList.add('active_circle');
			}
		}
	})
}
//<Newsletter>
let mail_input = document.querySelector('.newsletter__mail');
mail_input.addEventListener('blur',function(){
	if(mail_input.value === ""){
		mail_input.value = "aliciliniavopir@gmail.com";
	}
});