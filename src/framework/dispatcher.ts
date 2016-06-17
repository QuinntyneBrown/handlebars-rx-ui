/// <reference path="../../node_modules/rx/ts/rx.all.d.ts" />


export default class Dispatcher<T> extends Rx.Subject<T> {
    constructor() { super() }

    dispatch = action => this.onNext(action);

}