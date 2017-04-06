
/* Problem # 1 :
    Select the top 10 most occurring birthdays in our company ordered from greatest to least. Show the birthday and the number of employees that share that birthday.
*/    
    db.employees.aggregate([
        {
            $group:
            {
                _id: "$birth_date",
                count: {$sum: 1}
                
            }
        },
        {
            $sort:
            {
                'count': -1
            }
        },
        
        {$limit: 10}
        ]).pretty();
        
/* Problem # 2
Select the first 10 employees (ordered by employee number) and show employee number, first name, last name, and current salary from our company.

HINTS:

There are multiple salaries recorded for each employee in the salary table... How can you pick just one from it?
You can use the javascript value for 'new Date()' to return the current date/time.
Mongodb 3.2 has a new alternative way to do this and significantly improve performance - 5 bonus points for anyone who can show the use of a new Mongodb 3.2 method without using $unwind. Because you don't have Mongodb 3.2, you will likely have to write this pipeline without testing it.
*/

db.employees.aggregate([    
    {$limit: 100}, 
     
    {
        $sort: 
        {
            emp_no: 1
        }
    },
    
    {$unwind: "$salaries"},
    
    {
        $match:
        {
            "salaries.to_date": {$gte: new Date()}
        }
    },
    
    {
        $project:
        {
            _id: 0,
            emp_no: 1,
            first_name: 1,
            last_name: 1,
            salaries: 1
        }
    },
    
    {$limit: 10}

]).pretty();

/* #Problem3
 What is the average salary for all employees (also show the number of active employees used for the average)?

HINT:

Very similar to #2 - not much you can do about performance unless using Mongodb > v. 3.2
*/

db.employees.aggregate([
    
    {$unwind: "$salaries"},
    
    { 
        $match:
        {
            "salaries.to_date": {$gte: new Date()}
        }
    },
    
    {
        $group:
        {
            _id: null,
            averageSalary: {$avg: "$salaries.salary"},
            count: {$sum: 1} 
        }
    }
    
]);

/* Problem # 4
Select the first 10 employees and show employee number, first name, and last name whose current salary is greater than the average salary of all employees.  Order it by salaries and then employee number.  DO NOT copy paste 72012.2359... thats too easy.

HINTS:

You will need to do this in 2 separate queries (neat how the mongo command environment can store variables):
The first is the query from Q3 and will store the average salary in a variable
ex - var avgSalary = db.employee.aggregate([.....]).????.????
For the ???? you will need to use a cursor operation to go to the next (first) result and retrieve the name of the field from your projection that represents the average salary
The second query can then use avgSalary inside the next queries pipeline operators
You've already pretty much written part of this pipeline twice now... although you may need to adjust the order

Step #1
 $unwind: salaries, 
 $match: date, 
 $group: _id: null and average salaries 
var avgSalary = db.employees.aggregate([...]).next().avgSalary 
*/

var avgSalary = db.employees.aggregate([
    
    {$unwind: "$salaries"},
    
    {
        $match:
        {
            "salaries.to_date": {$gte: new Date()}
        }
    },
    
    {
        $group:
        {
            _id: null,
            averageSalary: {$avg: "$salaries.salary"}
        }
    }

]).next().averageSalary;
    

/*Step: # 2
$unwind: salaries, 
$match: {"salaries.to_date": {gte: new Date()}{...}], 
$sort: {"salaries.to_date": 1}, {emp_no: 1}, 
$project 
$limit: 10 
*/
db.employees.aggregate([
    
    {$unwind: "$salaries"},

    {
        $match: 
        {
            "salaries.to_date": {$gte: new Date()},
            "salaries.salary": {$gt: avgSalary} 
        }        
    },
    
    {
        $sort:
        {
            "salaries.salary": 1,
            emp_no: 1
        }
    },
    
    {
        $project:
        {
            _id: 0,
            emp_no: 1,
            first_name: 1,
            last_name: 1,
            salaries: 1
        }
    },
    
    {$limit: 10}

],{allowDiskUse: true}).pretty();

/* Problem # 5
Now select the first 20 employees and show employee no, first name, last name, the current department they work for and their current salary.

HINTS:

You've done this before but now you need the department
So, you will need to $unwind 2 times in the pipeline

$limit 100 
$sort by emp_no 
$unwind salaries 
$unwind departments 
$match salaries.to_date, departments.to_date 
$limit 20 
$project {fields} 
*/   
db.employees.aggregate([    
    {$limit: 100}, 
     
    {
        $sort: 
        {
            emp_no: 1
        }
    },
    
    {$unwind: "$salaries"},
    
    {$unwind: "$departments"},
    
    {
        $match:
        {
            "salaries.to_date": {$gte: new Date()},
            "departments.to_date": {$gte: new Date()}
        }
    },
    
    {
        $project:
        {
            _id: 0,
            emp_no: 1,
            first_name: 1,
            last_name: 1,
            departments: 1,
            salaries: 1
        }
    },
    
    {$limit: 20}

]).pretty();


/* Problem # 6
Select the department and the average current salary for all the employees in it.  Order it by the avg salary in increasing order.

HINTS:

You will still need to deconstruct the documents as you just did!
You just need to add some more stages to group and sort the data


 $unwind: salaries
 $unwind department
 $match salaries.to_date, departments.to_date 
 $group by _id: $departments.dept_name, average salaries
 $sort by 'avg_salary': 1
*/

db.employees.aggregate([
    
    {$unwind: "$salaries"},
    
    {$unwind: "$departments"},
    
    {
        $match:
        {
            "salaries.to_date": {$gte: new Date()},
            "departments.to_date": {$gte: new Date()}
        }
    },
    
    {
        $group:
        {
            _id: "$departments.dept_name",
            avg_salary: {$avg: "$salaries.salary"}
        }
    },
    
    {
        $sort:
        {
            'avg_salary': 1
        }
    }
    
]);