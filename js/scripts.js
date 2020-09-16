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
    //console.log(data);
    //console.log($.(this));

    $.post('data-rec.php', data, res => {
      if (res === 'ok') {
        popup('Заявка успешно получена');
        form[0].reset();
        btn.attr('disabled', false);
      } else if (res == 'err') {
        popup('Ошибка сервера, повторите попытку');
        btn.attr('disabled', false);
      }
    }).fail( () => {
      popup('Сервер не отвечает');
      btn.attr('disabled', false);
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

function popup(text) {
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

  document.body.append(div);

  const btnClose = document.querySelector('.popup-container__btn');
  console.log(btnClose);

  btnClose.addEventListener('click', () => {
    div.remove();
  });

  setTimeout( () => {
    div.remove();
  }, 3000);
}
