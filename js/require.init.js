/**
 * Load the require components into the page by definition of this config.
 *
 **/
require.config({
    baseUrl : './',
    shim: {
        davis : {
            exports : 'Davis',
            deps    : ['zepto']
        }
    },
    paths : {
        knockout    : 'js/libs/knockout-3.0.0',
        pace        : 'js/libs/pace.min',
        davis       : 'js/libs/davis.min',
        videojs     : 'js/libs/video_js/video',
        zepto       : 'js/libs/zepto.min'
    }
});
//start on load page logic
requirejs([
    'pace',
    'zepto',
    'davis'
],function(pace){
    pace.start({
        document: false
    });
    $(document).on('ready',function(){
        //loads up Zepto instead of jQuery for the selector lib
        window.Davis.$ = window.Zepto;
        //setup our routing shit
        var Application = Davis(function(){
            this.get('/testing',function(context){

            });
        });
        Application.start();
    });

});