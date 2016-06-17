export class Ruler {

    constructor(private documentRef: Document, private rectangle) { }

    public measure = (element: HTMLElement): Promise<any> => {
        //var deferred = this.$q.defer();        
        //if (this.documentRef.body.contains(element)) {
        //    deferred.resolve(this.rectangle.createInstance({ clientRect: element.getBoundingClientRect() }));
        //} else {

        //    setTimeout(() => {
        //        this.documentRef.body.appendChild(element);
        //        var clientRect = element.getBoundingClientRect();
        //        element.parentNode.removeChild(element);
        //        deferred.resolve(this.rectangle.createInstance({ clientRect: clientRect }));
        //    }, 0, false);
        //}
        //return deferred.promise;
    }
}