'use strict';
/*
try {
  $(function(){
    const form = $('.form'),
          btn = $('.form__button');


    form.on('focusout', event => {
      const target = event.target;
      const valid = target.validity.valid;

      if (!valid) {
        target.value = '';
      }
    });

    form.on('submit', event => {
      event.preventDefault();

      btn.attr('disabled', true);

      const data = form.serializeArray();
      data.push({name: 'key', value: 'passs'});

      $.post('data-rec.php', data, res => {
        if (res === 'ok') {
          popup('Заявка успешно получена', 3000, () => {
            form[0].reset();
            btn.attr('disabled', false);
          });
        } else if (res == 'err') {
          popup('Ошибка сервера, повторите попытку', 3000, () => {
            btn.attr('disabled', false);
          });
        }
      }).fail( () => {
        popup('Сервер не отвечает', 3000, () => {
          btn.attr('disabled', false);
        });
      });
    });

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

  function popup(text, time, collback) {
    scrollOff(true);
    const div = document.createElement('div');

    div.innerHTML = `
      <div class="popup-container">
        <div class="popup-container__inner">
          <h3 class="popup-container__title">${text}</h3>

          <button class="popup-container__btn btn-close-popup"
                  aria-label="закрыть">
          </button>
        </div>
      </div>
    `;

    div.addEventListener('click', (event) => {
      const target = event.target;
      if ( target.classList.contains('popup-container__btn') ) {
        div.remove();
        scrollOff(false);
        collback();
      }

      if ( !target.closest('.popup-container__inner') ) {
        div.remove();
        scrollOff(false);
        collback();
      }
    });

   document.body.append(div);

    if (time) {
      setTimeout( () => {
        div.remove();
        scrollOff(false);
        collback();
      }, time);
    }
  }

  function scrollOff(bul) {
    const width = document.documentElement.clientWidth;
    if (bul) {
      document.documentElement.style.overflow = 'hidden';
      if (width !== document.documentElement.clientWidth) {
        const padding = document.documentElement.clientWidth - width;
        document.body.style.paddingRight = padding + 'px';
      }
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.paddingRight = '';
    }
  }
} catch(e) {
  alert('В этом браузере сайт работает не корректно!!!' + ' ' + e);
}

*/

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++=

'use strict';

const form = document.querySelector('.form');

//let formData = new FormData(form);

form.addEventListener('submit', (event) => {
  event.preventDefault();
  console.log(this);

  let xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://192.168.0.15/echo.php');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  xhr.addEventListener('readystatechange', () => {
    //if (xhr.redyState != 4) return;
    console.log(xhr.redyState);

    console.log(xhr.responseText);
  });


  let formData = '';

  for (var i = 0; i < form.elements.length; i++) {
    if (form.elements[i].name !== '') {
      formData += form.elements[i].name + '=' + encodeURIComponent(form.elements[i].value) + '&';
    }
  }

  formData += 'name=key&value=passs';

  xhr.send(formData);


  //console.log( formData );
});
