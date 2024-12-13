export class EnemyNotFound extends Error {
    constructor(message: string) {
        super(message);
        this.name = "EnemyNotFound";
    }
}

class MaxHeap {
    heap: [number, number][] = [];
    positions: { [key: number]: number } = {};
    
    constructor() {
        this.heap = [];
        this.positions = {};
    }

    public peek(): [number, number] {
        return this.heap[0];
    }

    public length(): number {
        return this.heap.length;
    }

    public pop(): number {
        const enemy_id = this.peek()[0]
        
        return this.deleteEnemy(enemy_id)
    }

    protected deleteAtIndex(index: number): number {
        this.swap(index, this.length() - 1);
        const result = this.heap.pop();
        delete this.positions[result[0]];

        this.bubbleDown(index);

        return result[0]
    }

    public hasEnemy(enemy_id: number): boolean {
        return enemy_id in this.positions;
    }

    public deleteEnemy(enemy_id: number): number {
        if (enemy_id in this.positions) {
            const index = this.positions[enemy_id];
            return this.deleteAtIndex(index)
        }

        throw new EnemyNotFound("Enemy is not found in the heap")
    }

    protected bubbleDown(index: number): void {
        while (index < this.length() ) {
            const leftChildIndex = 2 * index + 1;
            const rightChildIndex = 2 * index + 2;

            const leftVal = this.heap[leftChildIndex] ? this.heap[leftChildIndex][1] : -Infinity;
            const rightVal = this.heap[rightChildIndex] ? this.heap[rightChildIndex][1] : -Infinity;

            const targetIndex = leftVal > rightVal ? leftChildIndex : rightChildIndex;
            const target = this.heap[targetIndex]

            if (target && target[1] > this.heap[index][1]) {
                this.swap(targetIndex, index);
                index = targetIndex;
            } else{
                break
            }
        }
    }

    public insertOrUpdate(enemy_id: number, distanceTravelled: number): void {
        const id = enemy_id;
        
        if (id in this.positions) {
            const index = this.positions[id];
            this.heap[index] = [enemy_id, distanceTravelled];

            this.bubbleUp(index); 
        } else {
            const array_length = this.heap.push([enemy_id, distanceTravelled]);
            const index = array_length - 1;
            this.positions[id] = index;
            
            this.bubbleUp(index);
        }
    }

    protected bubbleUp(index: number): void {
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

    protected swap(index1: number, index2: number): void {
        [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]];
        
        this.positions[this.heap[index2][0]] = index2
        this.positions[this.heap[index1][0]] = index1
    }
}

export default MaxHeap;

