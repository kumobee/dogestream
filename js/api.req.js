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
           $.getJSON( '/video', function(data){
                viewUpdate.updateViewField('videoList', data );
           });
       },
       getVideo         : function(title){
           console.log("video title "+title);
            $.getJSON( '/video/title/'+title, function(data){
                viewUpdate.updateViewField('videoDetail', data );
                viewUpdate.updateViewField('videoShow', true );
                videojs("vid"+title, {}, function(){

                });
            });
       },
       deleteVideo      : function(title){
           $.ajax({
               type     : 'DELETE',
               url      : '/video/title/'+title,
               success  : function(data){

               }
           })
       },
       putVideo         : function(){

       },
       getCategory      : function(category){
            $.getJSON( '/video/category/'+category, function(){

            });
       },
       getCategoryList  : function(){
            $.getJSON('/video/category', function(){

            })
       },
       getVideoMeta     : function(title){
            $.getJSON( '/play/title/'+title, function(){

            } );
       }
   }
});