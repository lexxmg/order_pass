'use strict';

var form = document.querySelector('.form'),
    btn = document.querySelector('.form__button');
form.addEventListener('focusout', function (event) {
  var target = event.target;
  var valid = target.validity.valid;
  //console.log(target);

  if (!valid) {
    target.value = '';
  }
});
form.addEventListener('submit', function (event) {
  event.preventDefault();
  btn.setAttribute('disabled', 'disabled');
  var data = urlEncoded(form); //data += ('&key=passs');

  post(form.action, data, function (res) {
    if (res === 'ok') {
      popup('Заявка успешно получена', 3000, function () {
        form.reset();
        btn.removeAttribute('disabled');
      });
    } else if (res == 'err') {
      popup('Ошибка сервера, повторите попытку', 3000, function () {
        btn.removeAttribute('disabled');
      });
    }
  }, function (stat) {
    if (stat !== 200) {
      popup('Сервер не отвечает', 3000, function () {
        btn.removeAttribute('disabled');
      });
    }
  });
});

function popup(text, time, collback) {
  scrollOff(true);
  var div = document.createElement('div');
  div.innerHTML = "\n    <div class=\"popup-container\">\n      <div class=\"popup-container__inner\">\n        <h3 class=\"popup-container__title\">".concat(text, "</h3>\n\n        <button class=\"popup-container__btn btn-close-popup\"\n                aria-label=\"\u0437\u0430\u043A\u0440\u044B\u0442\u044C\">\n        </button>\n      </div>\n    </div>\n  ");
  div.addEventListener('click', function (event) {
    var target = event.target;

    if (target.classList.contains('popup-container__btn')) {
      div.remove();
      scrollOff(false);
      collback();
    }

    if (!target.closest('.popup-container__inner')) {
      div.remove();
      scrollOff(false);
      collback();
    }
  });
  document.body.append(div);

  if (time) {
    setTimeout(function () {
      div.remove();
      scrollOff(false);
      collback();
    }, time);
  }
}

function scrollOff(bul) {
  var width = document.documentElement.clientWidth;

  if (bul) {
    document.documentElement.style.overflow = 'hidden';

    if (width !== document.documentElement.clientWidth) {
      var padding = document.documentElement.clientWidth - width;
      document.body.style.paddingRight = padding + 'px';
    }
  } else {
    document.documentElement.style.overflow = '';
    document.body.style.paddingRight = '';
  }
}

function post(url, data, response, status) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', url);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.addEventListener('readystatechange', function () {
    if (xhr.readyState != 4) return;
    status(xhr.status);
    response(xhr.responseText);
  });
  xhr.send(data);
}

function urlEncoded(form) {
  var arr = [];

  for (var i = 0; i < form.elements.length; i++) {
    if (form.elements[i].type !== 'submit') {
      arr[i] = form.elements[i].name + '=' + encodeURIComponent(form.elements[i].value);
    }
  }

  return arr.join('&');
}

try {
  $(function(){

    $.datepicker.regional['ru'] = {
    	closeText: 'Закрыть',
    	prevText: 'Предыдущий',
    	nextText: 'Следующий',
    	currentText: 'Сегодня',
    	monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
    	monthNamesShort: ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек'],
    	dayNames: ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'],
    	dayNamesShort: ['вск','пнд','втр','срд','чтв','птн','сбт'],
    	dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
    	weekHeader: 'Не',
    	dateFormat: 'dd.mm.yy',
    	firstDay: 1,
    	isRTL: false,
    	showMonthAfterYear: false,
      changeMonth: true,
      changeYear: true,
    	yearSuffix: ''
    };

    $.datepicker.setDefaults($.datepicker.regional['ru']);

  	$('.form__input[name="date"]').datepicker();

    $.mask.definitions['~'] = "[78]";
    //$.mask.definitions['%'] = '[А-Я]?';

    $('.form__input[name="tel"]').mask('+~ (999) 999-99-99');

    // if (valid) {
    //   $('.form__input[name="contract"]').mask('-999999/99-99');
    // }
    //$('.form__input[name="count"]').mask('99?');
  });

} catch(e) {
  alert('В этом браузере сайт работает не корректно!!!' + ' ' + e);
}
