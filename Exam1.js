//Problem # 1

{
        "user_id" : 155659213,
        "user_name" : "Cristiano Ronaldo",
        "user_screen_name" : "Cristiano",
        "user_location" : "Madrid",
        "user_description" : "This Privacy Policy addresses the collection and use of personal information - https://t.co/Jp6yh1T58c",
        "user_followers_count" : 50181055,
        "user_friends_count" : 95,
        "user_account_created_at" : "Mon Jun 14 19:09:20 +0000 2010",
        "tweets" : [
                {
                        "created_at" : "Tue Feb 28 11:28:34 +0000 2017",
                        "id" : 836538579421626400,
                        "text" : "🚴🏻 https://t.co/iEeVY8TnNg",
                        "source" : "Twitter for iPhone",
                        "retweet_count" : 5461,
                        "favorite_count" : 39124,
                        "lang" : "und"
                },
                {
                        "created_at" : "Mon Feb 27 08:21:15 +0000 2017",
                        "id" : 836129052217991200,
                        "text" : "@nubiasmartphone is ready  #ToMeetNewPossibilities. How about you? Go to Nubia Stand at the #MWC2017 Barcelona and… https://t.co/b9Cm5LBVfG",
                        "source" : "Twitter for iPhone",
                        "retweet_count" : 283,
                        "favorite_count" : 1418,
                        "lang" : "en"
                },
                {
                        "created_at" : "Sun Feb 26 23:03:36 +0000 2017",
                        "id" : 835988717844238300,
                        "text" : "Well done team👍👌 https://t.co/2DEr4ZYrQy",
                        "source" : "Twitter for iPhone",
                        "retweet_count" : 12869,
                        "favorite_count" : 44689,
                        "lang" : "en"
                },
                {
                        "created_at" : "Sat Feb 25 15:08:47 +0000 2017",
                        "id" : 835506836275138600,
                        "text" : "Hala Madrid 👍👌 https://t.co/B0ITdX99FD",
                        "source" : "Twitter for iPhone",
                        "retweet_count" : 7140,
                        "favorite_count" : 28983,
                        "lang" : "tl"
                },
                {
                        "created_at" : "Tue Feb 21 12:50:49 +0000 2017",
                        "id" : 834022564737466400,
                        "text" : "🏡😎☀️ https://t.co/mCrtBvFoxg",
                        "source" : "Twitter for iPhone",
                        "retweet_count" : 21601,
                        "favorite_count" : 104693,
                        "lang" : "und"
                },
                {
                        "created_at" : "Mon Feb 20 18:01:31 +0000 2017",
                        "id" : 833738366600478700,
                        "text" : "@CR7underwear shoot in 360! New designs and styles are on https://t.co/6wNnolthcq 😄 https://t.co/7fCH5U1hM9",
                        "source" : "Twitter for iPhone",
                        "retweet_count" : 616,
                        "favorite_count" : 3314,
                        "lang" : "en"
                },
                {
                        "created_at" : "Sun Feb 19 18:47:26 +0000 2017",
                        "id" : 833387533509726200,
                        "text" : "👌👌👌 https://t.co/hpJWIik14h",
                        "source" : "Twitter for iPhone",
                        "retweet_count" : 6388,
                        "favorite_count" : 46681,
                        "lang" : "und"
                },
                {
                        "created_at" : "Thu Feb 16 09:16:13 +0000 2017",
                        "id" : 832156618200666100,
                        "text" : "👍 https://t.co/bcFdNf7mdG",
                        "source" : "Twitter for iPhone",
                        "retweet_count" : 13807,
                        "favorite_count" : 65302,
                        "lang" : "und"
                }
        ]
}

//Problem #2
//Write the mongo client command to update every document and remove the oldest tweet from the tweet array. 

db.timelines.update(
    {},
    {
        $pop: {tweets: 1}
    },
    {multi: true}
);

/* Problem #3
Write the mongo client command that would select LadyGaga's (user_screen_name = 'ladygaga') document and add the following tweet to the bottom of the tweets array:

"I decided to quit performing and take Advance Database at UNA."

The tweet must be an object like the other tweets in the array with both created_at and text fields.

HINTS:

    The created_at field in this case is not a date type, but a string. You can just type the string for the current time
    Other tweet info
        id = 881000969182146600
        source = 'UNA Advance Database App'
        retweet_count = 0
        favorite_count = 0
        lang = 'en'
*/
//db.timeslines.update, {user_screen_name}, $push { info }

db.timelines.update(
    {"user_screen_name" : "ladygaga"},
    {
        $push: {tweets:
            {
                "created_at" : "Wed Oct 13 16:00:00 +0000 2016",
                "id" : 881000969182146600,
                "text" : "I decided to quit performing and take Advance Database at UNA.",
                "source" : "UNA Advance Database App",
                "retweet_count" : 0,
                "favorite_count" : 0,
                "lang" : "en"
            }
        }
    });
    
/*


We know we have the most popular twitter accounts, but who from our list has the most friends?

Write the mongo aggregate command to find all documents in descending order of the number of friends they have, but just return the name and screen_name and number of friends.

NOTE: I do not want to see the mongodb object id.

db.timelines.aggregate([]), $sort: {user_friend_count} descending, $group:?, project: {_id: 0, user_name: 1, user_screen_name: 1, user_friends_count:1
*/
db.timelines.aggregate([
    {
        $sort: {"user_friends_count": -1}
    },
    
    {
        $project:
        {
            _id: 0,
            user_name: 1,
            user_screen_name: 1,
            user_friends_count: 1
        }
    }

]).pretty();

/*
Problem # 5
Justin Bieber is no longer popular (I wish).

Write the mongo client command that would delete Justin Bieber's document. You may use any document field you wish for matching (as long as it works).

HINTS:

    You may need to use the answer from the aggregate command in the earlier question to get his user id
    
    db.timelines.remove ({user_screen_name: "justinbieber"});??
*/
 db.timelines.remove ({user_screen_name: "justinbieber"});
/*


Problem # 6
Let's find out our most active twitter user. Our documents contain all tweets over a several week period.

Write a mongo client command that counts the number of tweets per user and displays the results in descending order by count. Only return the user_name, user_followers_count, user_friends_count and number-of-tweets.
db.timelines.aggregate([])
$unwind: {tweets}
$group: _id: "user_name", number-of-tweets: {sum: 1},
$sort: number-of-tweets: descending
$project: _id: 0, user_name: 1, user_followers_count: 1, user_friends_count: 1, number_of_tweets: 1
*/
db.timelines.aggregate([
    {$unwind: "$tweets"},
    
    {
        $group:
        {
            _id: "$user_name",
            number_of_tweets: {$sum: 1},
        }
    },
    
    {
        $sort:
        {
            'number_of_tweets': -1
        }
    },
    
    {
        $project:
        {
            _id: 1,
            followers_count: 1,
            friends_count: 1,
            number_of_tweets: 1
        }
    }

]).pretty(); 

/*
Problem #7



Now, we want to find the most popular twitter user but we are interested in how many people re-tweet their tweets. This might tell us which of our users release the most interesting tweets.

Write the mongo client command to see the twitter users in descending order based on the average re-tweet counts. Only return the user_name, user_followers_count, user_friends_count, re-tweet-average and number-of-tweets.

Hint: Use items from the previous question. The projection should be almost the same as the previous question.

db.timelines.aggregate([]);
$unwind: {tweets}
$group: retweet_count, avgRetweetCount: { $avg: "$tweets.retweet_count" },
        number-of-tweets: {sum:1}
$sort: avgRetweetCount: -1
$project: _id: 0, user_name: 1, user_followers_count: 1, user_friends_count: 1,
                avgRetweetCount: 1, number-of-tweets: 1
*/
db.timelines.aggregate([
        {$unwind: '$tweets'},
        {
                $group:
                {
                        _id: "user_name",
                        avgRetweetCount: {$avg: "$tweets.retweet_count"},
                        number_of_tweets: {sum: 1}
                }
        },
        {
                $sort:
                {
                        'avgRetweetCount': -1       
                }
        },
        {
                $project:
                {
                        _id: 1,
                        followers_count: 1,
                        friends_count: 1,
                        number_of_tweets: 1,
                        avgRetweetCount: 1
                        
                }
        }
        
        
        ]).pretty();