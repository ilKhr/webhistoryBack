http://localhost:3000/exhibits/

GET"/exhibits/?limit=#&offset=#" get `limit` page `offset`
GET"/exhibits/:uid" get exhibit



DELETE"/exhibits/:uid" delete exhibit

POST"/exhibits/" body :{ uid, name, description, category + 2 image, size < 1MB}



НЕ РАБОТАЕТ Update, как реализовать - ХЗ, потратил 4 дня


