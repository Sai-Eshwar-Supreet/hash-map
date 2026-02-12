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
        for(let i = 0; i < this.#capacity; i++){
            this.#buckets[i] = new LinkedList();
        }

        console.log(`Initalized with capacity: ${this.#capacity}`);
    }

    hash(key){
        let hashCode = 0;
        const primeNumber = 31;

        for(let i = 0; i< key.length; i++){
            hashCode = primeNumber * hashCode + key.charCodeAt(i);

            hashCode %= this.#capacity;
        }

        return hashCode;
    }

    #isExpansionNeeded(){
        const totalEntries = this.#buckets.reduce((prev, cur) => {
            return prev + cur.size();
        }, 0);

        const loadFactor =  totalEntries / this.#capacity;

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

                this.set(entry.key, entry.value);
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

    set(key, value){
        const bucket = this.#getBucket(key);
        const index = bucket.findIndex(key, (item) => item.key);

        if(index !== -1){
            bucket.updateAt(index, {key, value});
        }
        else{
            bucket.append({key, value});
            this.#length++;
        }

        this.#checkAndGrow();
    }

    get(key){
        const bucket = this.#getBucket(key);

        const index = bucket.findIndex(key, item => item.key);

        return index !== -1? bucket.at(index).value: null;
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
}

export { HashMap }