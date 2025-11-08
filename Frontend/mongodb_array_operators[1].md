# MongoDB Array Operators

| Operator              | Type   | Description                                                           | Syntax Example                                                                                  |
| --------------------- | ------ | --------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| **$all**              | Query  | Matches if the array contains **all** specified elements              | `{ tags: { $all: ["red", "cotton"] } }`                                                         |
| **$elemMatch**        | Query  | Matches array elements that satisfy multiple conditions               | `{ scores: { $elemMatch: { $gt: 80, $lt: 90 } } }`                                              |
| **$size**             | Query  | Matches arrays with a specific length                                 | `{ tags: { $size: 3 } }`                                                                        |
| **$in**               | Query  | Matches if the array contains **any** of the specified values         | `{ colors: { $in: ["red", "blue"] } }`                                                          |
| **$nin**              | Query  | Matches if the array contains **none** of the specified values        | `{ colors: { $nin: ["black", "white"] } }`                                                      |
| **$push**             | Update | Adds a value to the array (can use `$each`, `$position`, `$slice`)    | `{ $push: { tags: "newTag" } }` <br> `{ $push: { scores: { $each: [85, 90] }}}`                 |
| **$addToSet**         | Update | Adds a value only if it does **not already exist** in the array       | `{ $addToSet: { tags: "uniqueTag" } }`                                                          |
| **$pull**             | Update | Removes all instances of a value that matches a condition             | `{ $pull: { tags: "oldTag" } }` <br> `{ $pull: { scores: { $lt: 60 } } }`                       |
| **$pullAll**          | Update | Removes all matching values from the array                            | `{ $pullAll: { tags: ["red", "blue"] } }`                                                       |
| **$pop**              | Update | Removes the **first** (`-1`) or **last** (`1`) element from the array | `{ $pop: { tags: 1 } }` → removes last <br> `{ $pop: { tags: -1 } }` → first                    |
| **$set** (with index) | Update | Updates a specific element in the array by index                      | `{ $set: { "tags.0": "updatedTag" } }`                                                          |
| **$[]**               | Update | Updates **all** elements in an array                                  | `{ $set: { "scores.$[]": 100 } }` (set every score to 100)                                      |
| **$[<identifier>]**   | Update | Updates elements that match a condition (array filters)               | `{ $set: { "scores.$[elem]": 100 } }`, with options `{ arrayFilters: [{ elem: { $lt: 50 } }] }` |

# MongoDB CRUD Operations

| Operation                          | Query Required? | Syntax                                         | Description                    | Example                                                                  |
| ---------------------------------- | --------------- | ---------------------------------------------- | ------------------------------ | ------------------------------------------------------------------------ |
| **insertOne()**                    | ❌ No           | `db.collection.insertOne(document)`            | Insert a single document       | `db.users.insertOne({ name: "Eva", age: 29 })`                           |
| **insertMany()**                   | ❌ No           | `db.collection.insertMany([doc1, doc2])`       | Insert multiple documents      | `db.users.insertMany([{ name: "Mark" }, { name: "Sara" }])`              |
| **find()**                         | ✅ Yes          | `db.collection.find(query, projection)`        | Find multiple documents        | `db.users.find({ age: { $gt: 25 } }, { name: 1 })`                       |
| **findOne()**                      | ✅ Yes          | `db.collection.findOne(query, projection)`     | Find first matching document   | `db.users.findOne({ name: "Alice" })`                                    |
| **findById()** (Mongoose)          | ❌ No           | `Model.findById(id)`                           | Find by `_id`                  | `User.findById("66a1f3...")`                                             |
| **updateOne()**                    | ✅ Yes          | `db.collection.updateOne(query, update)`       | Update first matching document | `db.users.updateOne({ name: "Alice" }, { $set: { age: 26 } })`           |
| **updateMany()**                   | ✅ Yes          | `db.collection.updateMany(query, update)`      | Update all matching documents  | `db.users.updateMany({ role: "Engineer" }, { $set: { role: "Senior" }})` |
| **findByIdAndUpdate()** (Mongoose) | ❌ No           | `Model.findByIdAndUpdate(id, update, options)` | Update doc by `_id`            | `User.findByIdAndUpdate("66a1f3...", { age: 30 }, { new: true })`        |
| **deleteOne()**                    | ✅ Yes          | `db.collection.deleteOne(query)`               | Delete first matching document | `db.users.deleteOne({ name: "Bob" })`                                    |
| **deleteMany()**                   | ✅ Yes          | `db.collection.deleteMany(query)`              | Delete all matching documents  | `db.users.deleteMany({ role: "Intern" })`                                |
| **findByIdAndDelete()** (Mongoose) | ❌ No           | `Model.findByIdAndDelete(id)`                  | Delete by `_id`                | `User.findByIdAndDelete("66a1f3...")`                                    |
| **findByIdAndRemove()** (Mongoose) | ❌ No           | `Model.findByIdAndRemove(id)`                  | Same as above (older syntax)   | `User.findByIdAndRemove("66a1f3...")`                                    |

## 2. Comparison Operators Summary

| Operator | Accepts         | Syntax Example                       | Explanation           | Example Query                                |
| -------- | --------------- | ------------------------------------ | --------------------- | -------------------------------------------- |
| `$eq`    | Single value    | `{ field: { $eq: value } }`          | Equal to              | `{ age: { $eq: 25 } }`                       |
| `$ne`    | Single value    | `{ field: { $ne: value } }`          | Not equal to          | `{ age: { $ne: 25 } }`                       |
| `$gt`    | Single value    | `{ field: { $gt: value } }`          | Greater than          | `{ age: { $gt: 20 } }`                       |
| `$gte`   | Single value    | `{ field: { $gte: value } }`         | Greater than or equal | `{ age: { $gte: 25 } }`                      |
| `$lt`    | Single value    | `{ field: { $lt: value } }`          | Less than             | `{ age: { $lt: 30 } }`                       |
| `$lte`   | Single value    | `{ field: { $lte: value } }`         | Less than or equal    | `{ age: { $lte: 25 } }`                      |
| `$in`    | Array of values | `{ field: { $in: [v1, v2, ...] } }`  | Matches any in list   | `{ role: { $in: ["Engineer", "Manager"] } }` |
| `$nin`   | Array of values | `{ field: { $nin: [v1, v2, ...] } }` | Matches none in list  | `{ role: { $nin: ["HR", "Intern"] } }`       |

---

## 3. Logical Operators Summary

| Operator | Accepts                         | Syntax Example                                             | Explanation                        |
| -------- | ------------------------------- | ---------------------------------------------------------- | ---------------------------------- |
| `$and`   | Array of query objects          | `{ $and: [ { age: { $gt: 20 } }, { role: "Engineer" } ] }` | All conditions must be true        |
| `$or`    | Array of query objects          | `{ $or: [ { role: "Manager" }, { age: { $lt: 25 } } ] }`   | At least one condition is true     |
| `$nor`   | Array of query objects          | `{ $nor: [ { role: "HR" }, { age: { $lt: 20 } } ] }`       | None of the conditions can be true |
| `$not`   | Single query object (not array) | `{ age: { $not: { $gte: 30 } } }`                          | Negates the condition              |

---

# MongoDB Array Operators

| Operator              | Type   | Description                                                           | Syntax Example                                                                                  |
| --------------------- | ------ | --------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| **$all**              | Query  | Matches if the array contains **all** specified elements              | `{ tags: { $all: ["red", "cotton"] } }`                                                         |
| **$elemMatch**        | Query  | Matches array elements that satisfy multiple conditions               | `{ scores: { $elemMatch: { $gt: 80, $lt: 90 } } }`                                              |
| **$size**             | Query  | Matches arrays with a specific length                                 | `{ tags: { $size: 3 } }`                                                                        |
| **$in**               | Query  | Matches if the array contains **any** of the specified values         | `{ colors: { $in: ["red", "blue"] } }`                                                          |
| **$nin**              | Query  | Matches if the array contains **none** of the specified values        | `{ colors: { $nin: ["black", "white"] } }`                                                      |
| **$push**             | Update | Adds a value to the array (can use `$each`, `$position`, `$slice`)    | `{ $push: { tags: "newTag" } }` <br> `{ $push: { scores: { $each: [85, 90] }}}`                 |
| **$addToSet**         | Update | Adds a value only if it does **not already exist** in the array       | `{ $addToSet: { tags: "uniqueTag" } }`                                                          |
| **$pull**             | Update | Removes all instances of a value that matches a condition             | `{ $pull: { tags: "oldTag" } }` <br> `{ $pull: { scores: { $lt: 60 } } }`                       |
| **$pullAll**          | Update | Removes all matching values from the array                            | `{ $pullAll: { tags: ["red", "blue"] } }`                                                       |
| **$pop**              | Update | Removes the **first** (`-1`) or **last** (`1`) element from the array | `{ $pop: { tags: 1 } }` → removes last <br> `{ $pop: { tags: -1 } }` → first                    |
| **$set** (with index) | Update | Updates a specific element in the array by index                      | `{ $set: { "tags.0": "updatedTag" } }`                                                          |
| **$[]**               | Update | Updates **all** elements in an array                                  | `{ $set: { "scores.$[]": 100 } }` (set every score to 100)                                      |
| **$[<identifier>]**   | Update | Updates elements that match a condition (array filters)               | `{ $set: { "scores.$[elem]": 100 } }`, with options `{ arrayFilters: [{ elem: { $lt: 50 } }] }` |
