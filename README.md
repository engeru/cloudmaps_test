# Тестовое задание ООО "Муниципальные решения"
## Основные положения
В качестве тестового задания предлагается реализация ТЗ на доработку приложения начального уровня разработки, реализующего функционал некой геоинформационной социальной сети.

Что проверяется:
- Базовый уровень навыков web-разработки
- Умение разбираться в чужом коде
- Умение в разумные сроки разбираться в новых технологиях и компонентах
- Владение основами СУБД и SQL
- Качество и понятность кода
- Время реализации поставленной задачи

Используемые технологии и компоненты:
- Базовая платформа: [node.js](https://nodejs.org)
- Фреймворк [sails.js](http://sailsjs.org)
- СУБД [PostgreSQL](http://www.postgresql.org)
- Базовые стили и компоненты: [Bootstrap](http://getbootstrap.com)
- JavaScript на стороне клиента: [iQuery](https://jquery.com)
- Загрузка файлов: [plupload](http://www.plupload.com)
- Работа с картами: [Leaflet](http://leafletjs.com)
- web-шаблоны: [Jade](http://jade-lang.com)
- Полезные функции для использования на стороне сервера: [Lodash](https://lodash.com)

## Создание рабочего окружения
1. Установить последнюю стабильную версию [node.js](https://nodejs.org) (Если Вы работаете в Linux, то лучше устанавливать из исходников)
2. Установить глобально [sails.js](http://sailsjs.org)
3. Установить [git](https://git-scm.com)
4. Клонировать [этот репозиторий](https://github.com/alexd1971/cloudmaps_test) или [скачать его zip-архив](https://github.com/alexd1971/cloudmaps_test/archive/master.zip)
5. Установить локально СУБД [PostgreSQL](http://www.postgresql.org)
6. Создать в СУБД пользователя test с паролем test
7. Создать БД test с владельцем test
8. Создать структуру БД test с использованием прилагаемого дампа test.backup (см. корневой каталог проекта)
9. Перейти в каталог проекта.
10. Установить зависимые node.js- и sails.js-модули с помощью команды: 
  
    $ npm install

11. Запустить приложение с помощью команды:  
  
    $ sails lift

12. Приложение доступно по URL: [http://localhost:1337](http://localhost:1337)

## Техническое задание на разработку
### Функциональные требования
1. На главной странице указать имя и фамилию разработчика
2. Исправить ошибку. Авторизация нового пользователя происходит независимо от того подтвержден email пользователя или нет. Если пользователь не активирован (не подтвержден его email), то система не должна его пускать, выводя соответствующее сообщение и ссылку для отправки повторного email со ссылкой активации. (*Подсказка. Это можно реализовать с помощью [политик доступа sails.js](http://sailsjs.org/documentation/concepts/policies)*)
3. Создать и добавить к проекту favicon.
4. Добавить информацию о том, кто из пользователей в данный момент online в списке друзей, запросов в друзья и списке пользователей при поиске новых друзей. Постараться реализовать изменение статуса пользователя без необходимости перегружать страницу в браузере. Сейчас так реализована отправка запроса в друзья, подтверждение и отклонение запроса в друзья. (*Подсказка. Использовать [предоставляемые sails.js средства работы с web-сокетами](http://sailsjs.org/documentation/reference/web-sockets)*).
5. Если пользователь online, то при просмотре его профиля другим пользователем он должен видеть на карте место положения того пользователя, профиль которого в данный момент просматривается. Если пользователь offline, то отображать на карте точку его последнего пребывания. Должно быть понятно, что в данный момент отображается на карте: текущее положение или предыдущее положение пользователя. Если же по каким-то причинам не возможно установить текущее или предыдущее положения пользоввателя (например. пользователь не дал разрешение на определение его положения при запросе в браузере), то это тоже должно быть понятно. Способ реализации функционала определяет разработчик.
6. Изменить url профиля пользователя с user/<id> на user/<username>
7. Реализовать просмотр профилей друзей из списка. При попытке просмотреть профиль пользователя, не являющегося другом, путем явного указания url его профиля, необходимо выводить сообщение о невозможности просмотра данной информации.
8. Реализовать обмен сообщениями между друзьями. Глубина проработки этого функционала остается на усмотрение разработчика и зависит от возможностей и временнЫх ресурсов.

### Нефункциональные требования
1. Последовательность реализации функциональных требований не имеет значения. Чем больше получится реализовать, тем лучше.
2. После реализации каждого пункта функциональных требований необходимо делать коммит с соответствующим комментарием.
3. В конце работы сделать дамп Вашей тестовой БД в файл test.backup в корне проекта (заменить существующий) и сделать коммит с соответсвующим коментарием. Формат дампа должен быть таким. чтобы его можно было загрузить с помощью команды pg_restore
4. Создать аккаунт на [Github](https://github.com), если его еще нет.
5. Создать на github пустой репозиторий для Вашего тестового проекта.
6. Разместить Ваш локальный репозитарий тестового проекта в github.
7. Описание Вашего тестового задания на github (файл README.md) замените своим с кратким описанием того, что сделано и Вашим видением того, что можно было бы добавить в плане функциональности в данный проект.
8. Если в процессе анализа кода Вы увидели возможности его оптимизации, то сделайте это и обязательно отразите, что и как Вы оптимизировали в кратком описании к проекту (см. п.7).
9. Дизайн разработки определяется возможностями [Bootstrap](http://getbootstrap.com) и фантазией разработчика

### Дополнительные подсказки
- При отладке активации пользователя через email удобно пользоваться примитивным локальным smtp-сервером. специально предназначенным для этих целей. Для разработчиков, работающих в среде Windows это может быть например [Papercut](https://papercut.codeplex.com). Для тех же, кто работает в среде Linux или Mac можно либо настроить свой локальный smtp-сервер, либо использовать, следующий, который запускается командой:  

    sudo python -m smtpd -n -c DebuggingServer localhost:25


