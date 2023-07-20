## Node.js REST API.

Сервер задеплоєно на: https://nodejs-rest-api-mc1f.onrender.com

Використані технології: [Node.js, Postman, Nodemon, Express, Morgan, CORS, Joi, REST API, MongoDB, MongoDB Compass, Mongoose, Bcrypt, Jsonwebtoken, Gravatar, Jimp, Nodemailer, Jest]

Для валідації отриманих з Фронтенд даних відповідає бібліотека Joi.
Для валідації даних перед відправкою в базу даних відповідає Mongoose schema.

Для засолювання паролів використовується Bcrypt.

Для створення токена використовується бібліотека Jsonwebtoken.

Для обробки аватара користувача використовується бібліотека Jimp.

За відправлення електронних листів відповідає Nodemailer.

Маршрути:

- Автентифікація:
  
  1. @ POST /api/auth/register - отримує body в форматі {name, email, password}.
     Якщо відсутнє якесь поле - повертає помилку 400.
     Якщо пошта вже була зареєстрована, повертає json з ключем "message": "Email in use" і статусом 409.
     Якщо пошта не використовувалась раніше - хешуєм пароль / повертає об'єкт {email, subscription}
     При реєстрації нового користувача, йому відразу згенеровується аватар по email / створюється verificationToken, відправляється лист на email з посиланням для верифікації.
     
  2. @ POST /api/auth/login - Отримує body в форматі {email, password}.
     Якщо відсутнє якесь поле - повертає помилку 400.
     Якщо email або password не вірні повертає "message": "Email or password is wrong" і статусом 401.
     !user.verify && "message": "Email not verified", статус 401
     Якщо дані збігаються - створюється токен / повертає об'єкт {token, user: {email, subscription}}
     
  3. @ POST /api/auth/logout - бере токен з заголовків Authorization, перевіряє токен на валідність.
     Користувач існує ? (видаляє токен у поточного юзера, повертає статус 204) : (повертає помилку Unauthorized).
     
  4. @ GET /api/auth/current - бере токен з заголовків Authorization, перевіряє токен на валідність.
     Користувач існує ? (повертає об'єкт {email, subscription}, статус 200) : (повертає помилку Unauthorized)
     
  5. @ PATCH /api/auth - бере токен з заголовків Authorization, перевіряє токен на валідність / отримує body в форматі {subscription}.
      Повертає json формату {"message": "Your subscription has been changed to ${subscription}"}.
     
  6. @ PATCH /api/auth/avatars - бере токен з заголовків Authorization, перевіряє токен на валідність / отримує в body form-data з ключем avatar та value з вибраним аватаром
     Запит успішний ? (обробляє аватарку пакетом jimp, зберігає локально на пк, повертає json з ключем "avatarURL" та посиланням на файл) : (повертає json з ключем "message": "Not authorized" і статусом 401)

  7. @ POST /api/auth/verify - Отримує body в форматі {email}.
     Користувач не існує && "message": "User not found", статус 404.
     user.verify && "message": "Verification has already been passed", статус 400.
     Якщо з body все добре, виконуємо повторну відправку листа з verificationToken на вказаний email.

  8. @ GET /api/auth/verify/:verificationToken - отримує параметр verificationToken.
     Користувач існує ? (встановлюємо verificationToken в null, а поле verify ставимо рівним true в документі користувача, message: 'Verification successful') : (повертає json з ключем "message": "User not found" і статусом 404).

- Контакти:
  
  1) @ GET /api/contacts - бере токен з заголовків Authorization, перевіряє токен на валідність / повертає масив всіх контактів даного користувача в json-форматі зі статусом 200.

  2) @ GET /api/contacts/:id - бере токен з заголовків Authorization, перевіряє токен на валідність / не отримує body / отримує параметр id/
     id ? (повертає об'єкт контакту в json-форматі зі статусом 200) : (повертає json з ключем "message": "Not found" і статусом 404)

  3) @ POST /api/contacts - бере токен з заголовків Authorization, перевіряє токен на валідність / отримує body в форматі {name, email, phone} (усі поля обов'язкові).
     Обов'язкові поля ? (додає унікальний ідентифікатор в об'єкт контакту) : (повертає json з ключем {"message": "missing required name field"} і статусом 400).
     Зберігає контакт в базі даних даного користувача.
     Повертає об'єкт {id, name, email, phone} і статусом 201.

  4) @ DELETE /api/contacts/:id - бере токен з заголовків Authorization, перевіряє токен на валідність / не отримує body / Отримує параметр id
     id ? (видалає контакт з бази даних,  повертає json формату {"message": "contact deleted"} і статусом 200) :  (повертає json з ключем "message": "Not found" і статусом 404)

  5) @ PUT /api/contacts/:id - бере токен з заголовків Authorization, перевіряє токен на валідність / отримує параметр id / Отримує body в json-форматі c оновленням будь-яких полів name, email и phone.
     body ? (оновлює об'єкт контакту) :  (повертає json з ключем {"message": "missing fields"} і статусом 400).
     За результатом роботи функції повертає оновлений об'єкт контакту і статусом 200. В іншому випадку, повертає json з ключем "message": "Not found" і статусом 404.

  6) @ PATCH / api / contacts /: contactId / favorite - бере токен з заголовків Authorization, перевіряє токен на валідність / отримує параметр contactId / Отримує body в json-форматі c оновленням поля favorite.
     body ? (оновлює об'єкт контакту) :  (повертає json з ключем {"message": "missing field favorite"}і статусом 400).
     За результатом роботи функції повертає оновлений об'єкт контакту і статусом 200. В іншому випадку, повертає json з ключем " message ":" Not found " і статусом 404.
 

  

### Команди:

- `npm start` &mdash; старт сервера в режимі production
- `npm run start:dev` &mdash; старт сервера в режимі розробки (development)
- `npm run lint` &mdash; запустити виконання перевірки коду з eslint, необхідно виконувати перед кожним PR та виправляти всі помилки лінтера
- `npm lint:fix` &mdash; та ж перевірка лінтера, але з автоматичними виправленнями простих помилок
- `npm test` &mdash; старт тестування контроллера login.
