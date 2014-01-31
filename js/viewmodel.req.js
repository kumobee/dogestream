// Main viewmodel class
define(['knockout'], function(ko) {
    var viewModel = {
        videoList       : ko.observableArray([]),
        categoryList    : ko.observableArray([]),
        videoShow       : ko.observable(false),
        videoDetail     : ko.observable({
            path : "",
            title : "",
            duration:"",
            category : "",
            description : ""
        })
    };
    ko.applyBindings( viewModel );
    return viewModel;
});