import LocalStorageManager from "./local-storage-manager";
import Dispatcher from "./dispatcher";

export default class Store<T> extends Rx.BehaviorSubject<T> {
    constructor(dispatcher: Dispatcher<T>,
        initialState: T,
        private localStorageManager: LocalStorageManager, private reducers: any[]) {
        super(initialState || {} as T);
        this.state = initialState || {} as T;
        dispatcher.subscribe(action => this.onDispatcherNext(action));
    }

    onDispatcherNext = (action) => {
        this.state = this.state || {} as T;
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