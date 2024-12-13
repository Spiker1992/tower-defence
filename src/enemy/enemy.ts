export class Enemy {
    private currentPosition: { col: number; row: number };
    private prevPosition: { col: number; row: number };
    private path: { col: number; row: number }[];
    public speed: number = 1000
    public distanceTraveled: number = 0
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
            this.remove()
        }
    }

    public remove(): void {
        this.element.remove()

        const event = new CustomEvent("enemyRemoved", {
            detail: {
              enemy: this,
            },
        });
        window.dispatchEvent(event);
    }

    public isDead(): boolean {
        return !this.life
    }

    public move(): void {
        const max = (this.speed / 500) 
        let step = 1
        
        const notification = setInterval(() => {
            if (step > max) {
                clearInterval(notification)
                return
            }

            this.distanceTraveled += 500/max

            const enemyMoved = new CustomEvent("enemyMoved", {
                detail: {
                  enemy: this,
                },
            });
            window.dispatchEvent(enemyMoved);


            step += 1
        }, 500)
        
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
    
    public setDomElement(element: Element): void {
        this.element = element

        window.dispatchEvent(new CustomEvent("enemySpawned", { detail: this}))
    }
}