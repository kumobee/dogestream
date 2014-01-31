// Main viewmodel changing class
define(['knockout','viewModel'], function(ko,viewModel) {
    return {
        updateViewField : function( field, value ){
            var view = viewModel.getView();
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