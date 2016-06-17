declare interface StoreStatic {
    dispatch(action);
    subscribe(onNext: Function);
}

declare var store: StoreStatic;