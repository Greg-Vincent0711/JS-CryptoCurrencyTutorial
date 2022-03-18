/**
 * Following a tutorial on JS modules
 * Greg Vincent
*/

//default export 
export default class Person{
    constructor(height, name, age){
        this.height = height;
        this.name = name;
        this.age = age;
    }
    walk(){
        console.log("walking from another class");
    }
}
