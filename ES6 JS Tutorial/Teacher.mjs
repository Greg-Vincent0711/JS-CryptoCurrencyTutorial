/**
 * Following a tutorial on ES6 tutorials
 * and modules
 */

 import Person from './Person.mjs';
 export default class Teacher extends Person{
     constructor(name,degree){
         super(name); //refers to the original class
         this.degree = degree;
     }
     teach(){
         console.log("teaching from another class");
     }
 }