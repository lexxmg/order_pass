$(function(){
  const form = $('.form');

  form.on('focusout', event => {
    const target = event.target;
    const valid = target.validity.valid;

    if (!valid) {
      target.value = '';
    }
  });

  form.on('submit', event => {
    event.preventDefault();

    const data = form.serializeArray();
    data.push({name: 'key', value: 'passs'});
    //console.log(data);
    //console.log($.(this));

    $.post('data-rec.php', data, res => {
      alert(res);
      form[0].reset();
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
  $('.form__input[name="tel"]').mask('+~ (999) 999-99-99');
  $('.form__input[name="contract"]').mask('№ 9999999');
  //$('.form__input[name="count"]').mask('99?');
});
