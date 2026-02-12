import { HashMap  } from "./hash-map.js";
import { HashSet } from "./hash-set.js";

// const map = new HashMap();

// console.log("The map object: ", map);
// console.log("The prototype object: ", Object.getPrototypeOf(map));

// // Test the hash map here

// map.set("Carlos", "I am the old value");
// map.set("Carlos", "I am the new value");
// map.set("Sita", "I am Sita");
// map.set("Sita", "I am a woman");
// map.set("Rama", "I am Rama");
// map.set("Rama", "I am a man");
// map.set("Carlos", "I am another new value");

// console.log("Sita: ", map.get("Sita"));
// console.log("Gara: ", map.get("Gara"));
// console.log("Carlos: ", map.get("Carlos"));

// console.log("Has Sita: ", map.has("Sita"));
// console.log("Has Naruto: ", map.has("Naruto"));

// map.remove("Sita");
// console.log("Has Sita: ", map.has("Sita"));

// map.set("Sita", "New Sita entry");
// console.log("Has Sita: ", map.has("Sita"));

// console.log("Length: ", map.length());

// console.log("Keys: ", map.keys());
// console.log("Values: ", map.values());
// console.log("Entries: ", map.entries());

// map.clear();


// Another test

// const test = new HashMap()

// test.set('apple', 'red')
// test.set('banana', 'yellow')
// test.set('carrot', 'orange')
// test.set('dog', 'brown')
// test.set('elephant', 'gray')
// test.set('frog', 'green')
// test.set('grape', 'purple')
// test.set('hat', 'black')
// test.set('ice cream', 'white')
// test.set('jacket', 'blue')
// test.set('kite', 'pink')
// test.set('lion', 'golden')


// test.set("ice cream", "choco");

// test.set('moon', 'silver')


// console.log("Entries: ", test.entries());


const set = new HashSet();

set.set("Carlos");
set.set("Carlos");
set.set("Sita");
set.set("Sita");
set.set("Rama");
set.set("Rama");
set.set("Carlos");

console.log("Has Sita: ", set.has("Sita"));
console.log("Has Naruto: ", set.has("Naruto"));

set.remove("Sita");
console.log("Has Sita: ", set.has("Sita"));

set.set("Sita");
console.log("Has Sita: ", set.has("Sita"));

console.log("Length: ", set.length());
console.log("Entries: ", set.entries());

set.clear();
console.log("Entries: ", set.entries());