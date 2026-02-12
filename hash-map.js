import { LinkedList } from "./linked-list/linked-list.js";


class HashMap{
    #loadFactor = 0.75;
    #capacity = 16;
    #buckets = [];
    #length = 0;

    constructor(){
        this.#initialize();
    }

    #initialize(){
        this.#buckets = [];
        this.#length = 0;
        for(let i = 0; i < this.#capacity; i++){
            this.#buckets[i] = new LinkedList();
        }
    }

    hash(key){
        if(typeof key !== 'string'){
            throw TypeError("Expects key of type string");
        }

        let hashCode = 0;
        const primeNumber = 31;

        for(let i = 0; i< key.length; i++){
            hashCode = primeNumber * hashCode + key.charCodeAt(i);

            hashCode %= this.#capacity;
        }

        return hashCode;
    }

    #isExpansionNeeded(){
        const loadFactor =  this.#length / this.#capacity;

        return loadFactor > this.#loadFactor;
    }

    #grow(){
        const oldBuckets = this.#buckets;
        this.#capacity *= 2;
        this.#initialize();
        
        for(let i = 0; i < oldBuckets.length; i++){
            const bucket = oldBuckets[i];

            while(bucket.size() !== 0){
                const entry = bucket.pop();

                this.#setInternal(entry.key, entry.value);
            }
        }
    }

    #checkAndGrow(){
        if(this.#isExpansionNeeded()){
            this.#grow();
        }
    }

    #getBucket(key){
        const hash = this.hash(key);
        return this.#buckets[hash];
    }

    #setInternal(key, value){
        const bucket = this.#getBucket(key);

        const entry = bucket.findWith(key, item => item.key);

        if(!!entry){
            entry.value = value;
        }
        else{
            bucket.append({key, value});
            this.#length++;
        }
    }

    set(key, value){
        this.#setInternal(key, value);
        this.#checkAndGrow();
    }

    get(key){
        const bucket = this.#getBucket(key);

        const entry = bucket.findWith(key, item => item.key);

        return !!entry? entry.value: null;
    }

    has(key){
        const bucket = this.#getBucket(key);

        return bucket.contains(key, item => item.key);
    }

    remove(key){
        const bucket = this.#getBucket(key);

        const index = bucket.findIndex(key, item => item.key);

        if(index === -1) return false;

        bucket.removeAt(index);
        this.#length--;

        return true;
    }

    length(){
        return this.#length;
    }

    clear(){
        for(let bucket of this.#buckets){
            bucket.clear();
        }

        this.#length = 0;
    }

    keys(){
        const keys = [];
        for(let bucket of this.#buckets){
            keys.push(...bucket.toArray(item => item.key));
        };

        return keys;
    }

    values(){
        const values = [];
        for(let bucket of this.#buckets){
            values.push(...bucket.toArray(item => item.value));
        };

        return values;
    }

    entries(){
        const entries = [];
        for(let bucket of this.#buckets){
            entries.push(...bucket.toArray(item => [item.key, item.value]));
        };

        return entries;
    }
}

export { HashMap }