/**
 * Load the require components into the page by definition of this config.
 *
 **/
require.config({
    baseUrl : './',
    shim: {
        davis   : {
            deps    : ['zepto'],
            exports : 'Davis'
        },
        zepto : {
            exports : '$'
        }
    },
    paths : {
        knockout    : 'js/libs/knockout-3.0.0',
        pace        : 'js/libs/pace.min',
        davis       : 'js/libs/davis.min',
        zepto       : 'js/libs/zepto.min',
        viewModel   : 'js/viewmodel.req',
        apiInterface: 'js/api.req',
        viewUpdate  : 'js/viewUpdate.req'
    }
});
//start on load page logic
requirejs([
    'zepto',
    'pace',
    'knockout',
    'viewModel',
    'viewUpdate',
    'apiInterface',
    'zepto',
    'davis'
],function($,pace,ko,viewModel,viewUpdate,apiInterface){
    pace.start({
        document: false
    });

    $(document).on('ready',function(){
        viewModel.setView();
        //loads up Zepto instead of jQuery for the selector lib
        window.Davis.$ = window.Zepto;
        //setup our routing shit
        var Application = Davis(function(){
            //get actions
            this.get('/home',function(context){

            });
            this.get('/video/category/:category',function(req){
                var category = req.params['category'];

            });
            this.get('/video/:title',function(req){
                var title = req.params['title'];
                apiInterface.getVideo( title );
            });
            this.get('/play/:title',function(req){
                var title = req.params['title'];
            });
            this.get('/video/new',function(){

            });
        });
        Application.start();
        //our knockout view model
        setTimeout(function(){
            apiInterface.getAllVideos();
        },1000);

    });

});