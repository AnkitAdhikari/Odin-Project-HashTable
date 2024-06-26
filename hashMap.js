class HashMap {
    #loadfactor = 0.75;
    #bucket = [...Array(16)].map(() => []);
    #capacity = this.#bucket.length;
    #entries = 0;

    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
            hashCode = hashCode % this.#capacity;
        }
        return hashCode;
    }

    set(key, value) {
        if (this.#entries / this.#capacity >= this.#loadfactor) {
            this.grow();
        }
        let index = this.hash(key);
        let bucket = this.#bucket[index];
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket[i][1] = value;
                return;
            }
        }
        bucket.push([key, value]);
        this.#entries++;
    }

    get(key) {
        let index = this.hash(key);
        let bucket = this.#bucket[index];
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                return bucket[i][1];
            }
        }
        return null;
    }

    has(key) {
        let index = this.hash(key);
        let bucket = this.#bucket[index];
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                return true;
            }
        }
        return false;
    }

    remove(key) {
        let index = this.hash(key);
        let bucket = this.#bucket[index];
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket.splice(i, 1);
                this.#entries--;
                return true;
            }
        }
        return false;
    }

    length() {
        return this.#entries;
    }

    clear() {
        this.#bucket = [...Array(this.#capacity)].map(() => []);
        this.#entries = 0;
    }

    values() {
        let valuesArray = [];
        for (let bucket of this.#bucket) {
            for (let [key, value] of bucket) {
                valuesArray.push(value);
            }
        }
        return valuesArray;
    }

    keys() {
        let keysArray = [];
        for (let bucket of this.#bucket) {
            for (let [key, value] of bucket) {
                keysArray.push(key);
            }
        }
        return keysArray;
    }

    entries() {
        let entriesArray = [];
        for (let bucket of this.#bucket) {
            for (let [key, value] of bucket) {
                entriesArray.push([key, value]);
            }
        }
        return entriesArray;
    }

    grow() {
        let oldBucket = this.#bucket;
        this.#bucket = [...Array(this.#capacity * 2)].map(() => []);
        this.#capacity = this.#bucket.length;
        this.#entries = 0;
        for (let bucket of oldBucket) {
            for (let [key, value] of bucket) {
                this.set(key, value);
            }
        }
    }
}