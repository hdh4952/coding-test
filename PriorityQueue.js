class PriorityQueue {
    #compare = (a, b) => a - b;
    #heap = new Array(64);
    #size = 0;

    constructor(comparator) {
        if (comparator !== undefined) {
            this.#compare = comparator;
        }
    }

    get length() {
        return this.#size;
    }

    isEmpty() {
        return this.#size === 0;
    }

    push(value) {
        const heap = this.#heap;
        heap[++this.#size] = value;
        if (heap.length === this.#size)
            heap.length *= 2;

        let idx = this.#size;
        while (idx !== 1) {
            const parent = idx / 2 | 0;
            if (this.#compare(heap[parent], heap[idx]) < 0) 
                break;
            const temp = heap[parent];
            heap[parent] = heap[idx];
            heap[idx] = temp;
            idx = parent;
        }
    }

    top() {
        if (this.isEmpty()) {
            throw new Error('Error: Cannot access the element of an empty priority queue');
        }
        return this.#heap[1];
    }

    pop() {
        if (this.isEmpty()) {
            throw new Error('Error: Cannot pop from an empty priority queue');
        }
        const heap = this.#heap;
        heap[1] = heap[this.#size];
        heap[this.#size--] = undefined;

        let idx = 1;
        while (2*idx <= this.#size) {
            const left = 2*idx;
            const right = 2*idx+1;
            let minChild = left;
            if (right <= this.#size && this.#compare(heap[left], heap[right]) > 0)
                minChild = right;
            if (this.#compare(heap[idx], heap[minChild]) < 0) 
                break;
            const temp = heap[idx];
            heap[idx] = heap[minChild];
            heap[minChild] = temp;
            idx = minChild;
        }
    }
}

module.exports = PriorityQueue;