$(function() {

  const list = $('.list');

  $.getJSON('http://192.168.0.15/order_pass/php/read.php', res => {
    console.log(res);

    for (let obj of res) {
      let done;

      if (obj.done === 'true') {
        done = 'item--done';
      } else {
        done = '';
      }

      list.prepend(`
      <li class="list__item item ${done}">
        <div class="item__container">
          <div class="item__top">
            <h2 class="item__title">${obj.firm}</h2>

            <button class="item__btn-close btn-close"
                    aria-label="открыть"
                    aria-expanded="false"
                    aria-controls="list-data">X
            </button>
          </div>

          <div class="item__body item-body">
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
              <button class="buttons__del btn btn--red">Удалить</button>
              <button class="buttons__done btn">Сделано</button>
            </div>
          </div>
        </div>
      </li>
      `);
    }
  });

  list.on('click', event => {
    const target = event.target;

    if ( event.target.classList.contains('buttons__del') ) {
      let firm = target.closest('.item__container').querySelector('.item__title').textContent;

      if( confirm('Задача будет удалена') ) {
        $.get('http://192.168.0.15/order_pass/php/delete.php', {'firm': firm}, res => {
          console.log(res);
        }).done( () => {
          const el = target.closest('.list__item');
          $(el).fadeOut(600, "linear", () => {
            el.remove();
          });
        });
      }
    }

    if ( event.target.classList.contains('buttons__done') ) {
      let firm = target.closest('.item__container').querySelector('.item__title').textContent;
      let el = target.closest('.list__item');

      $.getJSON('http://192.168.0.15/order_pass/php/read.php', res => {
        for (let obj of res) {
          if (obj.firm === firm) {
            console.log(obj.firm);
            console.log(obj.done);
            if (obj.done === 'true') {
              $.get('http://192.168.0.15/order_pass/php/edit.php', {'firm': firm, 'done': false}, res => {
                console.log(res);
              }).done(() => {
                $(el).removeClass('item--done');
              });
            } else {
              $.get('http://192.168.0.15/order_pass/php/edit.php', {'firm': firm, 'done': true}, res => {
                console.log(res);
              }).done(() => {
                $(el).addClass('item--done');
              });
            }
          }
        }
      });
    }

    if ( event.target.classList.contains('item__btn-close') ) {
      let el = target.closest('.item__top').nextElementSibling;

      if ( $(target).attr('aria-expanded') === 'true') {
        $(el).slideUp(400, () => {
          $(target).attr('aria-expanded', 'false');
        });
      } else {
        $(el).slideDown(400, () => {
          $(target).attr('aria-expanded', 'true');
        });
      }
    }
  });
});
