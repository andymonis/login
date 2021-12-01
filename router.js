let Router = {
    current: ko.obserable("/"),
    route: function(path){
        debugger
        this.current(path);
    }
}

export default Router;