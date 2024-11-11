

class MaxHeap {
    heap: [number, number][] = [];
    positions: { [key: number]: number } = {};
    
    constructor() {
        this.heap = [];
        this.positions = {};
    }

    insertOrUpdate(enemy_id: number, distanceTraveled: number) {
        const id = enemy_id;
        
        if (id in this.positions) {
            const index = this.positions[id];
            this.heap[index] = [enemy_id, distanceTraveled];

            this.bubbleUp(index); 
            // this.bubbleDown(index);
        } else {
            // Insert new enemy
            const array_length = this.heap.push([enemy_id, distanceTraveled]);
            const index = array_length - 1;
            this.positions[id] = index;
            
            // we assume that we dont need to bubble up
            // since all enemies start at 0
            this.bubbleUp(index);
        }
    }

    bubbleUp(index: number) {
        // To insert an element to a heap, we perform the following steps:

        // 2. Compare the added element with its parent; if they are in the correct order, stop.
        // 3. If not, swap the element with its parent and return to the previous step.

        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            
            if (this.heap[parentIndex][1] < this.heap[index][1]) {
                this.swap(parentIndex, index);
                index = parentIndex;
            } else{
                break
            }
            
        }
    }

    swap(index1: number, index2: number) {
        // swap enemies [1, 1.5] and positions [1 => 0, 2 => 1]
        [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]];
        // [1.5, 1]
        
        // swap enemy positions [1 => 0, 2 => 1] should be [1 => 1, 2 => 0]
        this.positions[this.heap[index2][0]] = index2
        this.positions[this.heap[index1][0]] = index1
        
    }

}

export default MaxHeap;

