"use strict";

let 
	// форма списка туду
	todoControlElem = document.querySelector('.todo__control'),
	// добовление туду листа
	headerInputElem = document.querySelector('.header__input'),
	
	// кнопка добовления туду листа
	headerButtonElem = document.querySelector('.header__button'),
	//  контейнер туду листа
	todoContainerElem = document.querySelector('.todo__container'),
	// не выполненый туду лист
	todoLisElemt = document.querySelector('.todo__list'),
	// выполненый туду лист
	todoCompletedElem = document.querySelector('.todo__completed'),
	// смена туду листа
	todoСompleteElem = document.querySelector('.todo__complete');
	console.log('headerInputElem: ', headerInputElem);

// отправть в localStorage метод 
let setState = function () {
    localStorage.setItem('todoData', JSON.stringify(todoData));
};
// получить из localStorage
let getState = function () {
	return JSON.parse(localStorage.getItem('todoData'));
};

let todoData = getState() ? getState(): [];

// рендер страницы
let render = function () {
	// очищаем строки todoLisElemt
	todoLisElemt.innerHTML = '';
	// очищаем строки todoCompletedElem
    todoCompletedElem.innerHTML = '';
    todoData.forEach(function (item, index) {
		// создаем элемент ли 
		let li = document.createElement('li');
		// присваеваем элементу ли класс todo-item
		li.classList.add('todo__item');
		// выводим в верстку элемент ли 
        li.innerHTML = 
		'<span class="text__todo">' + item.value + '</span> '+ 
		'<div class="todo__buttons">' +
		'<button  id="' + index + '"class="todo__remove"></button>' +
		'<button class="todo__complete"></button>'+
		'</div>';

		// если item.completed истина добовляеться элемент в выполненый списко туду 
        if (item.completed) {
            todoCompletedElem.append(li);
        } else {
			// если item.completed не истиа добовляеться элемент в не выполненый списко туду 
            todoLisElemt.append(li);
		}
		// смена статуса туду листа
        let todoCompleteBtn = li.querySelector('.todo__complete');
        todoCompleteBtn.addEventListener('click', function () {
			const animatePopup = () => {
				let count = 0;
				const go = () => {
					count += 10;
					li.classList.add('todo__item-is-open');
					const animate = requestAnimationFrame(go);
					if (count === 250) {
						cancelAnimationFrame(animate);
						item.completed = !item.completed;
						setState();
						render();
					}
				};
				requestAnimationFrame(go);
			};
			animatePopup();
		});
		// удаление одного из элементов туду листа
		let todoRemoveElem = li.querySelector('.todo__remove');
		todoRemoveElem.addEventListener('click', function () {
			let result = confirm('Вы уверенны?');
			if (result) {

				const animatePopup = () => {
					let count = 0;
					const go = () => {
						count += 1;
						const animate = requestAnimationFrame(go);
						li.classList.add('todo__item-is-open2');
						if (count === 30) {
	
							cancelAnimationFrame(animate);
							todoData.splice(index, 1);
							setState();
							render();
						}
					};
					requestAnimationFrame(go);
				};
				animatePopup();
			}
		});
    });
};

// добавление нового туду листа
todoControlElem.addEventListener('submit', function (event) {
	//  отмена перезагрузки страницы
	event.preventDefault();
	// услвоие для не добовления пустых дел в туду лист
    if ( headerInputElem.value ) {
		headerInputElem.classList.remove('header__input-is-open')
		headerInputElem.placeholder = 'Какие планы?';
		//  в масив todoData пуш значение headerInputElem completed-не выполенный туду лист
        todoData.push({
            value: headerInputElem.value,
			completed: false,
		});
		// очищение поле воода для туду листа после добовление их в сам туду лист 
		headerInputElem.value = '';
		// запуск функции 
		setState();
		render();
    } else {
		headerInputElem.classList.add('header__input-is-open');
		headerInputElem.placeholder = 'Поле не может быть пустым!!!';
	}
});

// запуск функции 
render();











