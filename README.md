`http://localhost:3000/exhibits/` - пример адреса

GET `/exhibits/?limit=#&offset=#` get `limit` page `offset`
GET `/exhibits/:uid` get exhibit



DELETE `/exhibits/:uid`  delete exhibit

POST `/exhibits/`  **body**
 :{ uid, name, description, category, max 3 image, size < 1MB}
| uid                         | integer |
|-----------------------------|---------|
| multipleImage (max 3 image) | file    |
| name                        | string  |
| description                 | string  |
| categories                  | string  |

НЕ РАБОТАЕТ Update, как реализовать - ХЗ, потратил 4 дня


