$(function() {

  const list = $('.list'),
        form = $('.form'),
        input = $('.form__item');

  const listEmpty = $(`
                      <li class="list__item item ">
                        <h2 class="item__title item__title--list-none">Список пуст</h2>
                      </li>
                    `);
  let responce;

  form.on('input', () => {
      searchObj = search(input.val(), responce);
      list.html('');

      createUserCard(list, searchObj);
  });

  $.getJSON('php/read.php', res => {
    responce = res;

    createUserCard(list, responce);

    if (list.children().length > 1) {
      listEmpty.remove();
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
      const abonentCardDate = abonentCard.querySelector('.item__time');
      const titleContent = abonentCardTitle.innerHTML;
      const dateContent = abonentCardDate.innerHTML;
      const abonentCardBody = abonentCard.querySelector('.item__body');

      if( confirm('Задача будет удалена') ) {
        $.get('php/delete.php', {'firm': titleContent, 'dat': dateContent}, res => {
          //console.log(res);
          $.getJSON('php/read.php', res => {
            responce = res;
          });
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
      const abonentCardDate = abonentCard.querySelector('.item__time');
      const titleContent = abonentCardTitle.textContent;
      const dateContent = abonentCardDate.innerHTML;


      $.getJSON('php/read.php', res => {
        for (let obj of res) {
          if (obj.firm === titleContent && obj.dat === dateContent) {
            if (obj.done === 'true') {
              $.get('php/edit.php', {'firm': titleContent, 'dat': dateContent, 'done': false}, res => {
                //console.log(res);
                $.getJSON('php/read.php', res => {
                  responce = res;
                });
              }).done(() => {
                abonentCard.classList.remove('item--done');
              });
            } else {
              $.get('php/edit.php', {'firm': titleContent, 'dat': dateContent, 'done': true}, res => {
                //console.log(res);
                $.getJSON('php/read.php', res => {
                  responce = res;
                });
              }).done(() => {
                abonentCard.classList.add('item--done');
                abonentCard.classList.remove('item--duplicate');
              });

              if ( confirm('Отправить оповещение?') ) {
                $.get('php/send.php', {'firm': titleContent, 'dat': dateContent}, (res) => {
                  console.log(res);
                }).done( () => alert('Сообщение отправлено.') );
              }
            }
          }
        }
      });
    }

    if ( event.target.classList.contains('item__btn-close') ) {
      const abonentCard = target.closest('.list__item');
      const abonentCardBody = abonentCard.querySelector('.item__body')

      if ( $(target).attr('aria-expanded') === 'true') {
        $(target).removeClass('rotate');
        $(abonentCardBody).slideUp(400, () => {
          $(target).attr('aria-expanded', 'false');
        });
      } else {
        $(target).addClass('rotate');
        $(abonentCardBody).slideDown(400, () => {
          $(target).attr('aria-expanded', 'true');
        });
      }
    }

    if ( event.target.classList.contains('buttons__block') ) {
      const abonentCard = target.closest('.list__item');
      const abonentCardTitle = abonentCard.querySelector('.item__title');
      const titleContent = abonentCardTitle.textContent;

      if ( confirm('отправить сообщение о блокировке?') ) {
        console.log('запрос на сервер' + titleContent);
        $.get('php/block.php', {'firm': titleContent}, (res) => {
          console.log(res);
        }).done( () => alert('Сообщение отправлено.') );
      }
    }
  });

  function search(search, arr) {
    arrObj = [];

    for (let obj of arr) {
      if ( obj.firm.toLowerCase().search( search.toLowerCase() ) >= 0 ) {
        arrObj.push(obj);
      }
    }
    return arrObj;
  }

  function createUserCard(list, searchObj) {

    for (let obj of searchObj) {
      let done;
      let duplicate = '';

      if (obj.done === 'true') {
        done = 'item--done';
      } else {
        done = '';
        if ( isDuplicateName(searchObj, obj.firm) ) {
          duplicate = 'item--duplicate';
        }
      }

      list.prepend(`
      <li class="list__item item ${done} ${duplicate}">
        <div class="item__container">
          <div class="item__top">
            <h2 class="item__title">${obj.firm}</h2>

            <time class="item__time">${obj.dat}</time>

            <button class="item__btn-close btn-close"
                    aria-label="открыть"
                    aria-expanded="false"
                    aria-controls="list-data">
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
              <span class="item-body__item">ФИО контактного лица:</span>
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

              <div class="buttons__inner">
                <button class="buttons__block btn btn--blue">Заблокировать</button>
              </div>
            </div>
          </div>
        </div>
      </li>
      `);
    }
  }

  function isDuplicateName(arr, name) {
    let count = 0;
    let firm;

    for (let obj of arr) {
      let aName = obj.firm.toLowerCase().search( name.toLowerCase() );
      let bName = name.toLowerCase().search( obj.firm.toLowerCase() );

      if (aName >= 0 || bName >=0 ) {
        count++;
        firm = obj.firm;
      }
    }

    if (count > 1) {
      return true;
    } else {
      return false;
    }
  }
});
