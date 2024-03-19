export class Enemy {
    private currentPosition: { col: number; row: number };
    private prevPosition: { col: number; row: number };
    private path: { col: number; row: number }[];
    public speed: number = 1000
    public size: number = 20
    public element: Element
    public id: number
    public life: number = 2

    constructor(path: { col: number; row: number }[], id: number) {
        this.path = path;
        this.prevPosition = null
        this.currentPosition = null
        this.id = id
    }

    public reduceLife(damage: number): void  {
        this.life -= damage
        
        if (this.life <= 0) {
            this.element.remove()
        }
    }

    public isDead(): boolean {
        return !this.life
    }

    public move(): void {
        this.prevPosition = this.currentPosition
        this.currentPosition = this.path.shift()

        const enemyMoved = new CustomEvent("enemyMoved", {
            detail: {
              enemy: this,
            },
        });
        window.dispatchEvent(enemyMoved);
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
    
    public setDomElement(element: Element): void {
        this.element = element
    }
}