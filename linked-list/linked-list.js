import { Node } from './node.js';

class LinkedList{
    #headNode = null;
    #tailNode = null;
    #length = 0;

    #createNode(value){
        const newNode = new Node(value);

        return newNode;
    }

    append(value){
        const newNode = this.#createNode(value);

        if(!this.#headNode){
            this.#headNode = this.#tailNode = newNode;
        }
        else{
            if(!this.#tailNode){
                throw Error("Linked List corrupted tail does not exist");
            }

            this.#tailNode.nextNode = newNode;
            this.#tailNode = newNode;
        }

        this.#length++;
    }

    prepend(value){
        const newNode = this.#createNode(value);

        if(!this.#headNode){
            this.#headNode = this.#tailNode = newNode;
        }
        else{
            newNode.nextNode = this.#headNode
            this.#headNode = newNode;
        }

        this.#length++;
    }

    size(){
        return this.#length;
    }

    head(){
        if(!this.#headNode) return undefined;

        return this.#headNode.value;
    }

    tail(){
        if(!this.#tailNode) return undefined;

        return this.#tailNode.value;
    }

    #nodeAt(index){        
        let probe = 0;
        
        let temp = this.#headNode

        while(temp !== null){
            if(probe === index) return temp;
            probe++;
            temp = temp.nextNode;
        }

        return undefined;
    }

    at(index){
        const node = this.#nodeAt(index);
        return !node ? undefined: node.value;
    }

    pop(){
        if(!this.#headNode) return undefined;

        const poppedNode = this.#headNode;
        this.#headNode = poppedNode.nextNode;

        poppedNode.nextNode = null;

        this.#length--;

        if(this.#length === 0) {
            this.#headNode = this.#tailNode = null;
        }

        return poppedNode.value;
    }

    contains(value, predicate = (item) => item ){
        if(!this.#headNode) return false;

        let temp = this.#headNode;

        while(temp !== null){
            if(predicate(temp.value) === value) return true;
            temp = temp.nextNode;
        }

        return false;
    }

    findIndex(value, predicate = (item) => item){
        if(!this.#headNode) return -1;

        
        let temp = this.#headNode;
        let probe = 0;

        while(temp !== null){
            if(predicate(temp.value) === value) return probe;
            probe++;
            temp = temp.nextNode;
        }

        return -1;
    }

    toString(predicate = (item) => item){
        if(!this.#headNode) return '';

        let temp = this.#headNode;
        let output = '';

        while(temp !== null){
            output += `( ${predicate(temp.value)} ) -> `;
            temp = temp.nextNode;
        }

        output += 'null';

        return output;
    }

    #insertAfter(node, value){
        const newNode = this.#createNode(value);
        newNode.nextNode = node.nextNode;
        node.nextNode = newNode;

        this.#length++;

        return newNode;
    }

    insertAt(index, ...values){
        if(index < 0 || index > this.size()){
            throw RangeError("Index out of bounds");
        }

        if(index === 0){
            for(let i = values.length - 1; i >= 0; i--){
                this.prepend(values[i]);
            }
            return;
        }

        if(index === this.size()){
            for(let i = 0; i < values.length; i++){
                this.append(values[i]);
            }
            return;
        }

        let prevNode = this.#nodeAt(index - 1);

        for(let i = 0; i < values.length; i++){
            const newNode = this.#insertAfter(prevNode, values[i]);
            prevNode = newNode;
        }
    }
    
    updateAt(index, value){
        if(index < 0 || index > this.size()){
            throw RangeError("Index out of bounds");
        }

        const node = this.#nodeAt(index);

        node.value = value;
    }

    #removeAfter(node){
        if(node.nextNode === this.#tailNode){
            this.#tailNode = node;
        }

        node.nextNode = node.nextNode.nextNode;
        this.#length--;
    }

    removeAt(index){
        if(index < 0 || index >= this.size()){
            throw RangeError("Index out of bounds");
        }

        if(index === 0){
            this.pop();
            return;
        }
        
        let prevNode = this.#nodeAt(index - 1);

        this.#removeAfter(prevNode);

    }
}

export { LinkedList }