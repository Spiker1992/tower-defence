
export class Towers {
    protected data = []
    private static instance: Towers;

    public static getInstance(): Towers {
        if (!Towers.instance) {
            Towers.instance = new Towers();
        }
        return Towers.instance;
    }

    public static deleteInstance(): void {
        Towers.instance = null
    }

    public add(key, element): void {
        this.data[key] = element
    }

    public remove(key): void {
        delete this.data[key]
    }

    public all() {
        return this.data
    }
}