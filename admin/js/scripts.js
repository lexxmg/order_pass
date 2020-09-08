$(function() {

  const list = $('.list');

  const listEmpty = $(`
                      <li class="list__item item ">
                        <h2 class="item__title item__title--list-none">Список пуст</h2>
                      </li>
                    `);


  $.getJSON('php/read.php', res => {
    console.log(res);
    console.log(oftype res);

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

            <time class="item__time">${obj.dat}</time>

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

    if (list.children().length > 1) {
      listEmpty.remote();
    }
  });

  if (list.children().length === 0) {
    list.prepend(listEmpty);
  }

  list.on('click', event => {
    const target = event.target;
    // const abonentCard = target.closest('.list__item');
    // const abonentCardTitle = abonentCard.querySelector('.item__title');
    // const abonentCardBody = abonentCard.querySelector('.item__body');

    if ( event.target.classList.contains('buttons__del') ) {
      const abonentCard = target.closest('.list__item');
      const abonentCardTitle = abonentCard.querySelector('.item__title');
      const titleContent = abonentCardTitle.innerHTML;
      const abonentCardBody = abonentCard.querySelector('.item__body');

      if( confirm('Задача будет удалена') ) {
        $.get('php/delete.php', {'firm': titleContent}, res => {
          //console.log(res);
        }).done( () => {
          $(abonentCard).fadeOut(600, () => {
            abonentCard.remove();

            if (list.children().length === 0) {
              list.prepend(listEmpty);
            }
          });
        });
      }
    }

    if ( event.target.classList.contains('buttons__done') ) {
      const abonentCard = target.closest('.list__item');
      const abonentCardTitle = abonentCard.querySelector('.item__title');
      const titleContent = abonentCardTitle.textContent;

      $.getJSON('php/read.php', res => {
        for (let obj of res) {
          if (obj.firm === titleContent) {
            if (obj.done === 'true') {
              $.get('php/edit.php', {'firm': titleContent, 'done': false}, res => {
                //console.log(res);
              }).done(() => {
                abonentCard.classList.remove('item--done');
              });
            } else {
              $.get('php/edit.php', {'firm': titleContent, 'done': true}, res => {
                //console.log(res);
              }).done(() => {
                abonentCard.classList.add('item--done');
              });
            }
          }
        }
      });
    }

    if ( event.target.classList.contains('item__btn-close') ) {
      const abonentCard = target.closest('.list__item');
      const abonentCardBody = abonentCard.querySelector('.item__body')

      if ( $(target).attr('aria-expanded') === 'true') {
        $(abonentCardBody).slideUp(400, () => {
          $(target).attr('aria-expanded', 'false');
        });
      } else {
        $(abonentCardBody).slideDown(400, () => {
          $(target).attr('aria-expanded', 'true');
        });
      }
    }
  });
});
