export class Enemy {
    private currentPosition: { col: number; row: number };
    private prevPosition: { col: number; row: number };
    private path: { col: number; row: number }[];

    constructor(path: { col: number; row: number }[]) {
        this.path = path;
        this.prevPosition = null
        this.currentPosition = null
    }

    public move(): void {
        this.prevPosition = this.currentPosition
        this.currentPosition = this.path.shift()
    }

    public getPrevPosition(): { col: number; row: number } {
        return this.prevPosition;
    }

    public getNextPosition(): { col: number; row: number } {
        return this.path[0];
    }

    public getPosition(): { col: number; row: number } {
        return this.currentPosition;
    }
}