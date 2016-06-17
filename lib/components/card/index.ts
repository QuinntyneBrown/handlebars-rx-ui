/// <reference path="../../store/index.d.ts" />

export default class CardComponent {
    constructor() {
        store.dispatch(this.storeOnChanges);
    }
    
    storeOnChanges(state:any){
        
    }

}