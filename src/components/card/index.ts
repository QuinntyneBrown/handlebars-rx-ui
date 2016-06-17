import { Component } from "../../framework";

export default class CardComponent extends Component<any> {
    constructor(store) {
        super(store)
    }
    
    public render(state: any) {

    }

    shouldComponentUpdate(): boolean {
        return true;
    }

}