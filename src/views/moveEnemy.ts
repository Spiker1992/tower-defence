import { Enemy } from "../entities/enemy";

export class MoveEnemy {
  protected enemy: Enemy
  protected movement: NodeJS.Timer
  protected speed: number = 1000
  private enemyElement: HTMLDivElement
  private enemySize: number = 20

  public constructor(enemy: Enemy) {
    this.enemy = enemy
  }

  public create(): void {
    const targetCell = document.querySelector(`#gameTable .cell[row="0"][col="0"]`);
    const { y } = this.getCenterPoint(targetCell)


    const enemy = document.createElement("div");
    enemy.className = "enemy";
    enemy.style.width = `${this.enemySize}px`
    enemy.style.height = `${this.enemySize}px`
    enemy.style.background = "red"
    enemy.style.top = `-${this.enemySize}px` // `${0-2.5}` /* Calculate the top position based on the grid cell */;
    enemy.style.left = `${y}px`  // `${y-2.5}` /* Calculate the left position based on the grid cell */;
    document.getElementById("grid").appendChild(enemy);
    this.enemyElement = enemy;
  }

  public handle(): void {
    this.movement = setInterval(() => {
      this.enemy.move();

      if (this.noMovesLeft()) {
        this.lastMove()
        return
      }

      this.completeMove()
    }, this.speed)
  }

  protected completeMove(): void {
    if (!this.enemyElement) {
      this.create()
    }

    const enemyPosition = this.enemy.getPosition();
    this.animateEnemy(this.enemyElement, enemyPosition.col, enemyPosition.row)
  }

  protected getCenterPoint(element: Element) {
    const { top, left, width, height } = element.getBoundingClientRect();
    const centerX = left + ((width-20) / 2);
    const centerY = top + ((height-20) / 2);
    return { x: centerX, y: centerY };
  }

  protected animateEnemy(enemy: HTMLDivElement, x: number, y: number): void {
    const targetCell = document.querySelector(`#gameTable .cell[row="${x}"][col="${y}"]`);

    if (targetCell) {
      const { x, y } = this.getCenterPoint(targetCell)
      this.transformElement(enemy, x, y)
    }
  }

  protected transformElement(enemy: HTMLDivElement, x: number, y: number): void {
    const correctionLeft = (parseInt(enemy.style.left)) 
    enemy.style.transition = `transform 1s linear`;
    enemy.style.transform = `translate(${x-correctionLeft}px, ${y+this.enemySize}px)`;
  }

  protected noMovesLeft(): boolean {
    return !this.enemy.getPosition()
  }

  protected lastMove(): void {
    const targetCell = document.querySelector(`#gameTable .cell[row="3"][col="4"]`);
    const { right } = targetCell.getBoundingClientRect()
    const { y } = this.getCenterPoint(targetCell)
   
    this.transformElement(this.enemyElement, right+this.enemySize, y)
    clearInterval(this.movement)

    const deleteElement = setInterval(() => {
      this.enemyElement.remove()
      clearInterval(deleteElement)
    }, this.speed)

  }
}
