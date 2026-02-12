import { HashMap  } from "./hash-map.js";

const map = new HashMap();

console.log("The map object: ", map);
console.log("The prototype object: ", Object.getPrototypeOf(map));

// Test the hash map here

map.set("Carlos", "I am the old value");
map.set("Carlos", "I am the new value");
map.set("Sita", "I am Sita");
map.set("Sita", "I am a woman");
map.set("Rama", "I am Rama");
map.set("Rama", "I am a man");
map.set("Carlos", "I am another new value");

console.log("Sita: ", map.get("Sita"));
console.log("Gara: ", map.get("Gara"));
console.log("Carlos: ", map.get("Carlos"));

console.log("Has Sita: ", map.has("Sita"));
console.log("Has Naruto: ", map.has("Naruto"));

map.remove("Sita");
console.log("Has Sita: ", map.has("Sita"));

map.set("Sita", "New Sita entry");
console.log("Has Sita: ", map.has("Sita"));