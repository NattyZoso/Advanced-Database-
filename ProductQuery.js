
#1 
db.product.find( {}, {_id: 0, name: 1, category: 1});
//result
{ "name" : "Batman Lego Set", "category" : "Toys" }
{ "name" : "32 Piece Ratchet Set", "category" : "Tools" }
{ "name" : "Hammer", "category" : "Tools" }
{ "name" : "Toothpaste", "category" : "Health" }
{ "name" : "Floss", "category" : "Health" }
{ "name" : "Power Drill", "category" : "Tools" }
{ "name" : "120 Piece Lego Set" }
{ "name" : "Hot-wheels Car" }

#2
db.product.find( {}, {_id: 0, name: 1, category: 1});
//result
{ "name" : "Batman Lego Set", "category" : "Toys" }
{ "name" : "32 Piece Ratchet Set", "category" : "Tools" }
{ "name" : "Hammer", "category" : "Tools" }
{ "name" : "Toothpaste", "category" : "Health" }
{ "name" : "Floss", "category" : "Health" }
{ "name" : "Power Drill", "category" : "Tools" }
{ "name" : "120 Piece Lego Set" }
{ "name" : "Hot-wheels Car" }

#3
> db.product.find( {}, {_id: 0, name: 1, category: 1, company: 1});
{ "name" : "Batman Lego Set", "company" : "LEGO", "category" : "Toys" }
{ "name" : "32 Piece Ratchet Set", "company" : "Stanley", "category" : "Tools" }
{ "name" : "Hammer", "company" : "Stanley", "category" : "Tools" }
{ "name" : "Toothpaste", "company" : "Crest", "category" : "Health" }
{ "name" : "Floss", "company" : "Crest", "category" : "Health" }
{ "name" : "Power Drill", "category" : "Tools" }
{ "name" : "120 Piece Lego Set", "company" : "LEGO" }
{ "name" : "Hot-wheels Car" }

#4
 db.product.update({company: "Stanley"}, {$set: {company: "Stanley Black and Decker"}},{multi: true});
WriteResult({ "nMatched" : 2, "nUpserted" : 0, "nModified" : 2 })
> db.product.find();
{ "_id" : ObjectId("58935a62569ef01335f4a713"), "name" : "Batman Lego Set", "qty" : 1, "price" : 9.99, "company" : "LEGO", "category" : "Toys" }
{ "_id" : ObjectId("58935a62569ef01335f4a714"), "name" : "32 Piece Ratchet Set", "qty" : 2, "price" : 29.99, "company" : "Stanley Black and Decker", "category" : "Tools" }
{ "_id" : ObjectId("58935a62569ef01335f4a716"), "name" : "Toothpaste", "qty" : 1, "price" : 2.99, "company" : "Crest", "category" : "Health" }
{ "_id" : ObjectId("58935a62569ef01335f4a717"), "name" : "Floss", "qty" : 0, "price" : 0.99, "company" : "Crest", "category" : "Health" }
{ "_id" : ObjectId("58935a62569ef01335f4a718"), "name" : "Power Drill", "qty" : 5, "price" : 49.99, "category" : "Tools" }
{ "_id" : ObjectId("58935a62569ef01335f4a719"), "name" : "120 Piece Lego Set", "qty" : 1, "price" : 12.99, "company" : "LEGO" }
{ "_id" : ObjectId("58935a62569ef01335f4a71a"), "name" : "Hot-wheels Car", "qty" : 10, "price" : 0.99 }
{ "_id" : ObjectId("58935a62569ef01335f4a715"), "name" : "Hammer", "qty" : 5, "price" : 5.99, "company" : "Stanley Black and Decker", "category" : "Tools" }

#5
 db.product.find({$and:[ {category: "Tools"}, {price: {$gte: 10}}]});
{ "_id" : ObjectId("58935a62569ef01335f4a714"), "name" : "32 Piece Ratchet Set", "qty" : 2, "price" : 29.99, "company" : "Stanley Black and Decker", "category" : "Tools" }
{ "_id" : ObjectId("58935a62569ef01335f4a718"), "name" : "Power Drill", "qty" : 5, "price" : 49.99, "category" : "Tools" }

#6
 db.product.find({$and:[ {category: "Tools"}, {price: {$gte: 10}}, {company: {$nin: ["Stanley Black and Decker"]}}]});
{ "_id" : ObjectId("58935a62569ef01335f4a718"), "name" : "Power Drill", "qty" : 5, "price" : 49.99, "category" : "Tools" }

#7
db.product.update({company: "Crest"}, {$set: {company: ""}},{multi: true});
WriteResult({ "nMatched" : 2, "nUpserted" : 0, "nModified" : 2 })
> db.product.find().pretty();
{
        "_id" : ObjectId("58935a62569ef01335f4a713"),
        "name" : "Batman Lego Set",
        "qty" : 1,
        "price" : 9.99,
        "company" : "LEGO",
        "category" : "Toys"
}
{
        "_id" : ObjectId("58935a62569ef01335f4a714"),
        "name" : "32 Piece Ratchet Set",
        "qty" : 2,
        "price" : 29.99,
        "company" : "Stanley Black and Decker",
        "category" : "Tools"
}
{
        "_id" : ObjectId("58935a62569ef01335f4a716"),
        "name" : "Toothpaste",
        "qty" : 1,
        "price" : 2.99,
        "company" : "",
        "category" : "Health"
}
{
        "_id" : ObjectId("58935a62569ef01335f4a717"),
        "name" : "Floss",
        "qty" : 0,
        "price" : 0.99,
        "company" : "",
        "category" : "Health"
}
{
        "_id" : ObjectId("58935a62569ef01335f4a718"),
        "name" : "Power Drill",
        "qty" : 5,
        "price" : 49.99,
        "category" : "Tools"
}
{
        "_id" : ObjectId("58935a62569ef01335f4a719"),
        "name" : "120 Piece Lego Set",
        "qty" : 1,
        "price" : 12.99,
        "company" : "LEGO"
}
{
        "_id" : ObjectId("58935a62569ef01335f4a71a"),
        "name" : "Hot-wheels Car",
        "qty" : 10,
        "price" : 0.99
}
{
        "_id" : ObjectId("58935a62569ef01335f4a715"),
        "name" : "Hammer",
        "qty" : 5,
        "price" : 5.99,
        "company" : "Stanley Black and Decker",
        "category" : "Tools"
}
