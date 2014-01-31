// Main viewmodel changing class
define(['knockout','viewModel'], function(ko,view) {
    return {
        updateViewField : function( field, value ){
            if($.isArray( value ) ){
                $.each( value, function( index, item){
                    view[ field ].push( item );
                });
            }else{
                    view[field](value);
            }
        }
    };

});