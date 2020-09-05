$(function() {

  const list = $('.list');

  $.getJSON('http://192.168.0.15/order_pass/php/read.php', res => {
    console.log(res);

    for (let obj of res) {
      let done;

      if (obj.done) {
        done = 'item__top--done';
      } else {
        done = '';
      }

      list.prepend(`
      <li class="list__item item">
        <div class="item__container">
          <div class="item__top ${done}">
            <h2 class="item__title">${obj.firm}</h2>

            <button class="item__btn-close">X</button>
          </div>

          <div class="item__body item__body">
            <div class="item-body__container">
              <span class="item-body__item">Номер договора:</span>
              <span class="item-body__item">${obj.contract}</span>
            </div>

            <div class="item-body__container">
              <span class="item-body__item">Дата договора:</span>
              <span class="item-body__item">${obj.date}</span>
            </div>

            <div class="item-body__container">
              <span class="item-body__item">ФИО руководителя:</span>
              <span class="item-body__item">${obj.fio}</span>
            </div>

            <div class="item-body__container">
              <span class="item-body__item">Должность:</span>
              <span class="item-body__item">${obj.post}</span>
            </div>

            <div class="item-body__container">
              <span class="item-body__item">Почта:</span>
              <span class="item-body__item">${obj.email}</span>
            </div>

            <div class="item-body__container">
              <span class="item-body__item">Телефон:</span>
              <span class="item-body__item">${obj.tel}</span>
            </div>

            <div class="item-body__container">
              <span class="item-body__item">Колличество карт:</span>
              <span class="item-body__item">${obj.count}</span>
            </div>

            <div class="item-body__buttons buttons">
              <button class="buttons__done">Сделано</button>
              <button class="buttons__del">Удалить</button>
            </div>
          </div>
        </div>
      </li>
      `);
    }
  });

  list.on('click', event => {
    const target = event.target;

    if (event.target.className === 'buttons__del') {
      let firm = target.closest('.item__container').querySelector('.item__title').textContent;

      $.get('http://192.168.0.15/order_pass/php/delete.php', {'firm': firm}, res => {
        console.log(res);
      }).done( () => target.closest('.list__item').remove());
    }

    if (event.target.className === 'buttons__done') {
      let firm = target.closest('.list__item');
      console.log(firm);
    }
  });
});
