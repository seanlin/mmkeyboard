var keyboard={init:function(){$("input.btn").click(function(){keyboard.oldval=$("#txt").val(),keyboard.newval=keyboard.oldval+$(this).data("value"),$("#txt").val(keyboard.newval)}),$("button#erase").click(function(){keyboard.oldval=$("#txt").val();var oldvallength=keyboard.oldval.length;$("#txt").val(keyboard.oldval.substring(0,oldvallength-1))})}};$(document).ready(function(){keyboard.init(),$("#txt").focus()}),ZeroClipboard.config({moviePath:"assets/zeroclipboard/ZeroClipboard.swf",forceHandCursor:!0,debug:!1,hoverClass:"clipboard-hover"});var txtarea=new ZeroClipboard($("#clipboard"));txtarea.on("load",function(txtarea){$("#copied").fadeIn(),txtarea.on("complete",function(txtarea,args){txtarea.setText(args.text),$("#clipboard-copied").fadeIn()})});