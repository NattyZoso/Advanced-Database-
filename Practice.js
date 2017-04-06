/*Q1: Select the top 10 most occurring birthdays in our company ordered from greatest to least. Show the birthday and the number of employees that share that birthday.

HINT:

Use the $limit ## at the END of the aggregate pipeline to limit results. i.e. {$limit: 10}
*/
/*  $group: birth_date
    $sort: descending
    $limit: 10

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
        
/*Select the first 10 employees (ordered by employee number) and show employee
number, first name, last name, and current salary from our company.

$limit:100
$sort: 1
$project: id:0, em_no:1, first_name:1, last_name:1, salaries.todate:1
$unwind: salaries
$match: salaries.to_date
$limit: 10
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

$unwind: $salaries
$match: date
$group: avg salary, count
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
    
    ]).pretty();