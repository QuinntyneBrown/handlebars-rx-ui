import Store from "./store";

export abstract class Component<T> {

    constructor(private store: Store<T>) {
        store.subscribe(this.storeOnChanges);
    }

    storeOnChanges = (state:T):any => {
        if (this.shouldComponentUpdate)
            this.render(state);
    }
    abstract shouldComponentUpdate(): boolean;

    abstract render(state:T): void;
}