//Study Sheet for the test

//Creating Documents

db.users.insert (
  {
    name: "Sue Person",
    age: 26,
    status: "A",
    groups: [ "students", "honors" ]
  }
);

db.product.insert({
  name: "Batman Lego Set",
  qty: 1,
  price: 9.99,
  company: "LEGO",
  category: "Toys"
});

db.product.insert({
  name: "32 Piece Ratchet Set",
  qty: 2,
  price: 29.99,
  company: "Stanley",
  category: "Tools",
  vendors: ["Home Depot", "Lowes"]

//Retrieve Documents

db.users.find();

db.students.find({
  age : {    //search age
    $gt: 18  // > 18
  }
});

//Selects the following students either 18 or 21
db.students.find({
  age : {
    $in: [18, 21]
  }
});

//example
db.users.aggregate();




/* Comparison operators:
$gt - Greater than
$gte - Greater than or equal to
$lt - Less than
$lte - Less than or equal to
$ne - Not equal to
*/
/* Logical Operarors
$or - logical or
$and - logical and
$not - opposite
$nor - no match for both criteria
*/

//Select students named Alice and under 21.
db.students.find({
  $and : [ //an array of expressions
    {
      name: "Alice"
    },
    {
      age: { $lt : 21 }
    }
  ]
});

/* Update Operators
These field operators do not replace the entire document
$inc - Increment (positive or negative) the field by the value
$mul - Multiply the field by the value
$rename - Rename the field
$set - Set the field to the value
$unset - Unset the field entirely (removal)
$min - Set the min of existing or new value
$max - Set the max of existing or new value
$currentDate Set the current date/time

Different operators available for arrays
$ - Symbolizes the first element in the array to match query conditions
$addToSet - Add element to array but only if it doesn’t already exist
$pop - Remove first (-1) or last (1) element in the array
$pullAll - Remove all matching provided elements in the array
$pull - Removes all elements from the array matching search criteria
$push - Adds element to the end of the array
*/
//UPDATE Example
db.students.remove({_id:12345}); //remove old 

db.students.insert({_id: 12345, name: "Gary", age: 44});

db.students.update(
  { _id : 12345 }, //what doc to update
  { $set : 
    { 
      age : 45 //set the age to 45
    }
  }
);

db.students.find({_id:12345});
// { "_id" : 12345, "name" : "Gary", "age" : 45 }

 db.students.update(
  {},                  //Match all documents
  { $inc: {age:1} },   //Increment the age by one
  { multi:true }       //Update more than 1 document
);

db.students.update(
  {name: "Robson"},        //What to update
  {
    $push : {grades: 100}  //Push a 100 to grades array
  }
);
//Removal
db.students.remove({}); //Dang!

/*
Pipeline Operators
$match - filters documents
$project - reshapes documents
$group - aggregates property data
$unwind - expand properties to documents
$sort - order documents
$limit / $skip - pagenate documents
$redact - restrict access to parts of documents
$geoNear - proximity filter
$let / $map - create subexpression variables

Also cursor methods
.next() - moves to the next document
.pretty() - gives pretty JSON output
.forEach(jsfunction) -
*/
//Project and Rename
db.product.aggregate([
    {
        $project: {
            _id: 0, 
            FullName: {
                $concat: ["$company", " ", "$name"]
            }
        }
    }
]).pretty();

