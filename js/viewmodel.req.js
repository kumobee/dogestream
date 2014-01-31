// Main viewmodel class
define(['knockout'], function(ko) {
    var viewModel
    return {
        setView : function(){
            viewModel = {
                videoList       : ko.observableArray([]),
                categoryList    : ko.observableArray([]),
                categoryDetail  : ko.observableArray([]),
                categoryShow    : ko.observable(false),
                currentCategory : ko.observable(""),
                videoShow       : ko.observable(false),
                videoDetail     : ko.observable({
                    path : "",
                    title : "",
                    duration:"",
                    category : "",
                    description : "",
                    seed : ko.observable("")
                }),

            };
            ko.applyBindings( viewModel );
        },
        getView : function(){
            return viewModel;
        }
    };
});