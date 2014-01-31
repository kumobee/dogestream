/**
 * this class is the invoker of the API on the backend. This will fire off the ajax
 * request to the backend
 */
define([
    'zepto',
    'viewUpdate'
],function($,viewUpdate){
   return {
       getAllVideos     : function(){
           $.getJSON( '/api/video', function(data){
                viewUpdate.updateViewField('videoList', data );
           });
       },
       getVideo         : function(title){
           console.log("video title "+title);

            $.getJSON( '/api/video/title/'+title, function(data){
                var seed =  Math.floor(Math.random()*1000);
                data.seed = seed;
                viewUpdate.updateViewField('videoDetail', data );
                viewUpdate.updateViewField('videoShow', true );
                viewUpdate.updateViewField('categoryShow',false);
                videojs("vid"+title+seed, {}, function(){

                });
            });
       },
       deleteVideo      : function(title){
           $.ajax({
               type     : 'DELETE',
               url      : '/api/video/title/'+title,
               success  : function(data){

               }
           })
       },
       putVideo         : function(){

       },
       getCategories      : function(){
            $.getJSON( '/api/video/category/', function(data){
                $("#list").empty();
                viewUpdate.updateViewField('categoryShow',false);
                viewUpdate.updateViewField('videoShow',false);
                viewUpdate.updateViewField('categoryList', data);
            });
       },
       getCategory  : function(category){
            $.getJSON('/api/video/category/'+category, function(data){
                viewUpdate.updateViewField( 'categoryDetail', data );
                viewUpdate.updateViewField('categoryShow',true);
                viewUpdate.updateViewField('videoShow',false);
                viewUpdate.updateViewField( 'currentCategory' );
            });
       },
       getVideoMeta     : function(title){
            $.getJSON( '/api/play/title/'+title, function(){

            } );
       }
   }
});