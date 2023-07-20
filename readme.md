## Node.js REST API.

Сервер задеплоєно на: https://nodejs-rest-api-mc1f.onrender.com

Використані технології: [Node.js, Postman, Nodemon, Express, Morgan, CORS, Joi, REST API, MongoDB, MongoDB Compass, Mongoose, Bcrypt, Jsonwebtoken, Gravatar, Jimp, Nodemailer]

Для валідації отриманих з Фронтенд частини даних відповідає бібліотека Joi.
Для валідації даних перед відправкою в базу данх відповідає Mongoose schema.

Для засолювання паролів використовується Bcrypt.

Для створення токена використовується бібліотека Jsonwebtoken.

Для обробки аватара користувача використовується бібліотека Jimp.

За відправлення електронних листів відповідає Nodemailer.

Маршрути:

- Автентифікація:
  1) @ POST /api/auth/register - Отримує body в форматі {name, email, password}
     Якщо відсутнє якесь поле - повертає помилку 400.
     Якщо пошта вже використовується кимось іншим, повертає json з ключем "message": "Email in use" і статусом 409.
     Якщо пошта не використовувалась раніше - хешуємо пароль / повертає об'єкт {email, subscription}
     При реєстрації нового користувача, йому відразу згенеровується аватар по email / створюється verificationToken, відправляється лист на email з посиланням для верифікації.
  3) @ POST /api/auth/login - Отримує body в форматі {email, password}
     Якщо відсутнє якесь поле - повертає помилку 400.
     Якщо email або password не вірні повертає json з ключем "message": "Email or password is wrong" і статусом 401
     !user.verify && "message": "Email not verified", статус 401
     Якщо дані збігаються - створюється токен / повертає об'єкт {token, user: {email, subscription}}
  5) @ POST /api/auth/logout - бере токен з заголовків Authorization, перевіряє токен на валідність
     користувач існує ? (видаляє токен у поточного юзера, повертає статус 204) : (повертає помилку Unauthorized)
  6) @ GET /api/auth/current - бере токен з заголовків Authorization, перевіряє токен на валідність
     користувач існує ? (повертає об'єкт {email, subscription}, статус 200) : (повертає помилку Unauthorized)
  7) @ PATCH /api/auth - бере токен з заголовків Authorization, перевіряє токен на валідність / отримує body в форматі {subscription}
      повертає json формату {"message": "Your subscription has been changed to ${subscription}"}
  8) @ PATCH /api/auth/avatars - бере токен з заголовків Authorization, перевіряє токен на валідність / отримує в body form-data з ключем avatar та value з вибраним аватаром
     запит успішний ? (обробляє аватарку пакетом jimp, зберігає локально на пк, повертає json з ключем "avatarURL" та посиланням на файл) : (повертає json з ключем "message": "Not authorized" і статусом 401)
  9) @ POST /api/auth/verify - Отримує body в форматі {email}
     користувач не існує && "message": "User not found", статус 404
     user.verify && "message": "Verification has already been passed", статус 400
     Якщо з body все добре, виконуємо повторну відправку листа з verificationToken на вказаний email
  10) @ GET /api/auth/verify/:verificationToken - отримує параметр verificationToken
     користувач існує ? (встановлюємо verificationToken в null, а поле verify ставимо рівним true в документі користувача, message: 'Verification successful') : (повертає json з ключем "message": "User not found" і статусом 404)

- Контакти:
  1) @ GET /api/contacts - бере токен з заголовків Authorization, перевіряє токен на валідність / повертає масив всіх контактів в json-форматі зі статусом 200
  2) @ GET /api/contacts/:id - бере токен з заголовків Authorization, перевіряє токен на валідність / не отримує body / отримує параметр id/
     id ? (повертає об'єкт контакту в json-форматі зі статусом 200) :  (повертає json з ключем "message": "Not found" і статусом 404)
  3) @ POST /api/contacts - бере токен з заголовків Authorization, перевіряє токен на валідність / отримує body в форматі {name, email, phone} (усі поля обов'язкові)
     обов'язкові поля ? (додає унікальний ідентифікатор в об'єкт контакту) : (повертає json з ключем {"message": "missing required name field"} і статусом 400)
     зберігає контакт в базі даних
     повертає об'єкт з доданим id {id, name, email, phone} і статусом 201
  4) @ DELETE /api/contacts/:id - бере токен з заголовків Authorization, перевіряє токен на валідність / не отримує body / Отримує параметр id
     id ? (видалає контакт з бази даних,  повертає json формату {"message": "contact deleted"} і статусом 200) :  (повертає json з ключем "message": "Not found" і статусом 404)
  5) @ PUT /api/contacts/:id - бере токен з заголовків Authorization, перевіряє токен на валідність / отримує параметр id / Отримує body в json-форматі c оновленням будь-яких полів name, email и phone
     body ? (оновлює об'єкт контакту) :  (повертає json з ключем {"message": "missing fields"} і статусом 400)
     За результатом роботи функції повертає оновлений об'єкт контакту і статусом 200. В іншому випадку, повертає json з ключем "message": "Not found" і статусом 404
  6) @ PATCH / api / contacts /: contactId / favorite - бере токен з заголовків Authorization, перевіряє токен на валідність / отримує параметр contactId / Отримує body в json-форматі c оновленням поля favorite
     body ? (оновлює об'єкт контакту) :  (повертає json з ключем {"message": "missing field favorite"}і статусом 400)
     За результатом роботи функції повертає оновлений об'єкт контакту і статусом 200. В іншому випадку, повертає json з ключем " message ":" Not found " і статусом 404
  8) 


     
  

### Команди:

- `npm start` &mdash; старт сервера в режимі production
- `npm run start:dev` &mdash; старт сервера в режимі розробки (development)
- `npm run lint` &mdash; запустити виконання перевірки коду з eslint, необхідно виконувати перед кожним PR та виправляти всі помилки лінтера
- `npm lint:fix` &mdash; та ж перевірка лінтера, але з автоматичними виправленнями простих помилок
