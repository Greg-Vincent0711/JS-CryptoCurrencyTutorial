/**
 * Learning ES6 JavaScript in preparation for React
 */

import Person from './Person.mjs';
import Teacher from './Teacher.mjs';
const person = new Person('183cm', 'Greg', '19');
// console.log(height);
person.walk();


const square = number => console.log(number*number);
square(9)

/**Array of abstract job objects. Each has an id and activity attribute */
const jobs = [
    {name: "CompSci", id: 1, isActive: true},
    {name: "Physics", id: 2, isActive: true},
    {name: "Biology", id: 3, isActive: false},
]

/**Filter method takes a complex parameter -  a function itself */
const activeJobs = jobs.filter(function(job){return job.isActive})

/**Code can be made cleaner with arrow key function */
const active = jobs.filter(job => job.isActive);

const colors = ['red', 'green', 'blue'];
/**
 * uses template literals in order to define a stirng template
 * instead of "<li> + color + </li>"
 * ${} is an argument placeholder that's dynamically rendered at runtime
 * color variable refers to each item in the array
 */
const items = colors.map(color => `<li>${color}</li>`);
console.log(items);


/**
 * Spread operator
 */
const first = [1,2,3];
const second = [4,5,6];
//instead of combined = first.concat(second)
//this allows for a greater flexibility among elements added
//some can be added before, in between or after either spread
//also allows for cloning 
const combined = [...first,'5',...second];
console.log(combined);

//spread can also be used objects
const obj = {name1: 'obj'};
//spread also has precedence, and will only log second but not obj as the name value
const secondObj = {name: 'second'};
const third = {...obj,...secondObj, location: 'Nigeria'};
console.log(third);

const teacher = new Teacher('Marshall',"Math");
teacher.teach();
const{name: Name, degree: Degree} = teacher;
console.log(Degree);
