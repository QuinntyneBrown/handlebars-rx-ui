/// <reference path="../../node_modules/rx/ts/rx.all.d.ts" />

class LocalStorageManager {
    constructor() {
        try {
            window.onbeforeunload = () => localStorage.setItem(this.id, JSON.stringify(this.items))
        } catch (e) {

        }
    }

    private id = "2fcfe918-dc2c-42db-9e88-ee62417651de";

    private _items = null;

    private get items() {
        if (this._items === null) {
            var storageItems = localStorage.getItem(this.id);
            if (storageItems === "null") {
                storageItems = null;
            }
            this._items = JSON.parse(storageItems || "[]");
        }

        return this._items;
    }

    private set items(value: Array<any>) {
        this._items = value;
    }

    public get = (options: any) => {
        var storageItem = null;
        for (var i = 0; i < this.items.length; i++) {
            if (options.name === this.items[i].name)
                storageItem = this.items[i].value;
        }
        return storageItem;
    }

    public put = (options: any) => {
        var itemExists = false;

        this.items.forEach((item: any) => {
            if (options.name === item.name) {
                itemExists = true;
                item.value = options.value
            }
        });

        if (!itemExists) {
            var items = this.items;
            items.push({ name: options.name, value: options.value });
            this.items = items;
            items = null;
        }
    }

    public clear = () => {
        this._items = [];
    }
}

export class Store<T> extends Rx.BehaviorSubject<T> {
    constructor(initialState: T,
        private localStorageManager: LocalStorageManager, public reducers: any[]) {
        super(initialState || {} as T);
        this.state = initialState || {} as T;
    }

    dispatch = (action) => {
        this.state = this.state || this.localStorageManager.get({ name: "state"}) || {} as T;
        this.state = this.setLastTriggeredByActionId(this.state, action);
        for (var i = 0; i < this.reducers.length; i++) {
            this.state = this.reducers[i](this.state, action);
        }
        this.localStorageManager.put({ name: "state", value: this.state });
        this.onNext(this.state);
    }

    setLastTriggeredByActionId = (state, action) => {
        state.lastTriggeredByActionId = action.id;
        state.lastTriggeredByAction = action;
        state.lastTriggeredByActionType = (action as any).constructor.type;
        
        return state;
    }
    
    state: T;
}


var store = new Store(null, null, []);


