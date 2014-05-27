// Keyboard

var keyboard = {

    init: function() {
        $("input.btn").click(function() {
    
                //caratPos = document.getElementById("txt").selectionStart;
                keyboard.oldval = $("#txt").val();
                keyboard.newval = keyboard.oldval + $(this).data("value");
            

            //$("#txt").val(keyboard.oldval.substring(0, caratPos) + $(this).data("value") + keyboard.oldval.substring(caratPos)).focus();
            $("#txt").val(keyboard.newval);
        });

        $("button#erase").click(function() {
            keyboard.oldval = $("#txt").val();
            var oldvallength = keyboard.oldval.length;
            $("#txt").val(keyboard.oldval.substring(0, oldvallength - 1));
        });
    }


};



$(document).ready(function() {
    keyboard.init();
    $("#txt").focus();

});

ZeroClipboard.config({
    moviePath: 'assets/zeroclipboard/ZeroClipboard.swf',
    forceHandCursor: true,
    debug: false,
    hoverClass: "clipboard-hover"
});


var txtarea = new ZeroClipboard( $("#clipboard") );


txtarea.on( "load", function(txtarea)
{
    $('#copied').fadeIn();

    txtarea.on( "complete", function(txtarea, args) {
        txtarea.setText( args.text );
        $('#clipboard-copied').fadeIn();
    } );
} );

