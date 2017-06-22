var canvas = new fabric.Canvas('c');

$(document).ready(function () {

    $(window).resize(function () {
        //updateContainer();
        resize();
    });

    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    });

    $("#btnSendToBack").click(function () {
        var activeObj = canvas.getActiveObject();
        if (activeObj) {
            canvas.sendToBack(activeObj);
            UpdateZindex();
        }
    });

    $("#btnSendBackwards").click(function () {
        var activeObj = canvas.getActiveObject();
        if (activeObj) {
            canvas.sendBackwards(activeObj);
            UpdateZindex();
        }
    });

    $("#btnBringForward").click(function () {
        var activeObj = canvas.getActiveObject();
        if (activeObj) {
            canvas.bringForward(activeObj);
            UpdateZindex();
        }
    });

    $("#btnBringToFront").click(function () {
        var activeObj = canvas.getActiveObject();
        if (activeObj) {
            canvas.bringToFront(activeObj);
            UpdateZindex();
        }
    });



    //canvas events starts here

    canvas.on('object:selected', function () {
        ResetControls();
        SetControls();
        SetValues();
    });

    canvas.on('object:modified', function (options) {
        ResetControls();
        ResetValues();
        console.log('object:modified');
        canvas.getActiveObject().align = '';
        SetControls();
        SetValues();

    });

    canvas.on('selection:cleared', function () {
        ResetControls();
        ResetValues();
    });

    //canvas events ends here

    //textbox events starts here

    $("#txtLeft").keyup(function () {
        var activeObj = canvas.getActiveObject();
        if (activeObj) {
            activeObj.left = parseFloat($("#txtLeft").val());
            activeObj.align = '';
            activeObj.setCoords();
        }
        canvas.renderAll();
    });

    $("#txtTop").keyup(function () {
        var activeObj = canvas.getActiveObject();
        if (activeObj) {
            activeObj.top = parseFloat($("#txtTop").val());
            activeObj.setCoords();
            //vertical align
            //activeObj.valign = '';
        }
        canvas.renderAll();
    });

    $("#txtScale").keyup(function () {
        var activeObj = canvas.getActiveObject();
        if (activeObj) {
            activeObj.scaleX = parseFloat($("#txtScale").val());
            activeObj.scaleY = parseFloat($("#txtScale").val());
            activeObj.setCoords();
        }
        canvas.renderAll();
    });

    $("#txtAngle").keyup(function () {
        var activeObj = canvas.getActiveObject();
        if (activeObj) {
            activeObj.angle = parseFloat($("#txtAngle").val());
            activeObj.setCoords();
        }
        canvas.renderAll();
    });

    $("#txtText").keyup(function () {
        var activeObj = canvas.getActiveObject();
        if (activeObj) {
            activeObj.text = $("#txtText").val();
            activeObj.setCoords();
        }
        canvas.renderAll();
    });

    $("#txtFontSize").keyup(function () {
        var activeObj = canvas.getActiveObject();
        if (activeObj) {
            activeObj.fontSize = parseInt($("#txtFontSize").val());
            activeObj.setCoords();
            canvas.setActiveObject(activeObj);
            canvas.renderAll();
        }
        
    });

    //textbox events ends here


    $('.picker').spectrum({
        showPaletteOnly: false,
        preferredFormat: "hex",
        showPalette: true,
        //color: defcolor,
        showInput: true,
        hideAfterPaletteSelect: true,
        change: function (color) {
            if (this.id == 'txtForeColor') {
                UpdateFont(color);
            }
            else if (this.id == 'txtBackgroundColor') {
                UpdateBg(color);
            }
        }
    });

    $("#divType :input").change(function () {
        if (this.id == 'image') {
            $("#divImage").css('display', 'block');
            $("#divText").css('display', 'none');
        }
        else {
            $("#divImage").css('display', 'none');
            $("#divText").css('display', 'block');
        }
    });

    $("#divTextDec :input").change(function () {
        textDecoration(this.id);
        console.log(this);
    });

    $("#divAlign :input").change(function () {
        Align(this.id);
        console.log(this);
    });

    $("#divVAlign :input").change(function () {
        VAlign(this.id);
        console.log(this);
    });

    $("#divStyle :input").change(function () {
        console.log(this);
    });

    $("#divEdit :input").change(function () {
        console.log(this);
    });

    $("#btnAdd").click(function () {
        Add();
    });

    $('#bold').change(function () {
        bold($('#bold').prop('checked'));
    });

    $('#italic').change(function () {
        italic($('#italic').prop('checked'));
    });

    $("#btnFlipX").click(function () {
        FlipX();
    });

    $("#btnFlipY").click(function () {
        FlipY();
    });
});

function FlipX() {
    var activeObj = canvas.getActiveObject();
    activeObj.set('flipX', !(activeObj.flipX));
    activeObj.setCoords();
    canvas.renderAll();
}

function FlipY() {
    var activeObj = canvas.getActiveObject();
    activeObj.set('flipY', !(activeObj.flipY));
    activeObj.setCoords();
    canvas.renderAll();
}

function SetValues() {
    var activeObj = canvas.getActiveObject();
    if (activeObj) {
        $("#txtLeft").val(activeObj.left);
        $("#txtTop").val(activeObj.top);
        $("#txtWidth").val(activeObj.width);
        $("#txtHeight").val(activeObj.height);
        $("#txtScale").val(activeObj.scaleX);
        $("#txtAngle").val(activeObj.angle);
        $("#txtForeColor").spectrum("set", activeObj.fill);
        //$("#txtBackgroundColor").spectrum("set", activeObj.bg);
        $("#txtText").val(activeObj.text);
        $("#txtFont").val(activeObj.fontFamily);
        $("#txtFontSize").val(activeObj.fontSize);
        //activeObj.align = ;
    }
}

function ResetValues() {

    $("#txtLeft").val('');
    $("#txtTop").val('');
    $("#txtWidth").val('');
    $("#txtHeight").val('');
    $("#txtScale").val('');
    $("#txtAngle").val('');
    $("#txtForeColor").spectrum("set", 'Black');
    //$("#txtBackgroundColor").spectrum("set", activeObj.bg);
    $("#txtText").val('');
    $("#txtFont").val('');
    $("#txtFontSize").val('');

}

function SetControls() {
    var activeObj = canvas.getActiveObject();
    if (activeObj) {
        if (activeObj.fontStyle == 'italic') {
            $("#italic").prop('checked', true);
            $("#italic").parent().addClass('active');
        }

        if (activeObj.fontWeight == 'bold') {
            $("#bold").prop('checked', true);
            $("#bold").parent().addClass('active');
        }

        if (activeObj.textDecoration != null && activeObj.textDecoration.toString().indexOf('line-through') > -1) {
            $("#line-through").prop('checked', true);
            $("#line-through").parent().addClass('active');
        }
        else if (activeObj.textDecoration != null && activeObj.textDecoration.toString().indexOf('underline') > -1) {
            $("#underline").prop('checked', true);
            $("#underline").parent().addClass('active');
        }
        else if (activeObj.textDecoration != null && activeObj.textDecoration.toString().indexOf('overline') > -1) {
            $("#overline").prop('checked', true);
            $("#overline").parent().addClass('active');
        }
        else {
            $("#no-dec").prop('checked', true);
            $("#no-dec").parent().addClass('active');
        }

        if (activeObj.align == 'center') {
            $("#center").prop('checked', true);
            $("#center").parent().addClass('active');
        }
        else if (activeObj.align == 'left') {
            $("#left").prop('checked', true);
            $("#left").parent().addClass('active');
        }
        else if (activeObj.align == 'right') {
            $("#right").prop('checked', true);
            $("#right").parent().addClass('active');
        }

        if (activeObj.valign == 'middle') {
            $("#middle").prop('checked', true);
            $("#middle").parent().addClass('active');
        }
        else if (activeObj.valign == 'top') {
            $("#top").prop('checked', true);
            $("#top").parent().addClass('active');
        }
        else if (activeObj.valign == 'bottom') {
            $("#bottom").prop('checked', true);
            $("#bottom").parent().addClass('active');
        }

        $("#picker").spectrum("set", activeObj.fill);
        $("#fontsize").val(activeObj.fontSize);
    }
}


function bold(a) {
    var activeObj = canvas.getActiveObject();
    if (a == true) {
        activeObj.fontWeight = 'bold';
    }
    else {
        activeObj.fontWeight = 'normal';
    }
    activeObj.setCoords();
    canvas.renderAll();
}

function italic(a) {
    var activeObj = canvas.getActiveObject();
    if (a == true) {
        activeObj.fontStyle = 'italic';
    }
    else {
        activeObj.fontStyle = '';
    }
    activeObj.setCoords();
    canvas.renderAll();
}

function Align(a) {
    var activeObj = canvas.getActiveObject();
    if (activeObj != null) {
        if (a == 'center') {
            canvas.centerObjectH(activeObj);
            activeObj.align = 'center';
        }
        else if (a == 'left') {
            activeObj.left = 0;
            activeObj.align = 'left';
        }
        else if (a == 'right') {
            activeObj.left = canvas.width - (activeObj.width * activeObj.scaleX);
            activeObj.align = 'right';
        }
        activeObj.setCoords();
        canvas.renderAll();
    }
}


function VAlign(a) {
    var activeObj = canvas.getActiveObject();
    if (activeObj != null) {
        if (a == 'middle') {
            canvas.centerObjectV(activeObj);
            activeObj.top = activeObj.top - (activeObj.height / 2);
            activeObj.valign = 'middle';
        }
        else if (a == 'top') {
            activeObj.top = 0;
            activeObj.valign = 'top';
        }
        else if (a == 'bottom') {
            activeObj.top = canvas.height - (activeObj.height * activeObj.scaleY);
            activeObj.valign = 'bottom';
        }
        activeObj.setCoords();
        canvas.renderAll();
    }
}

function textDecoration(a) {
    var activeObj = canvas.getActiveObject();
    if (activeObj != null) {
        if (a == 'underline') {
            activeObj.textDecoration = 'underline';
        }
        else if (a == 'line-through') {
            activeObj.textDecoration = 'line-through';
        }
        else if (a == 'overline') {
            activeObj.textDecoration = 'overline';
        }
        else {
            activeObj.textDecoration = '';
        }
        activeObj.setCoords();
        canvas.renderAll();
    }
}



function Add() {

    var activeObj = canvas.getActiveObject();
    if (activeObj != null) {
        ResetValues();
    }

    var type = $('#divType input:radio:checked').attr('id');
    var color = ($("#txtForeColor").val() != '') ? $("#txtForeColor").val() : 'Black';
    var bordercolor = ($("#txtBorderColor").val() != '') ? $("#txtBorderColor").val() : 'Black';
    var borderwidth = ($("#txtBorderWidth").val() != '') ? parseInt($("#txtBorderWidth").val()) : 0;
    var bg = $("#txtBackgroundColor").val();
    //var x = ($("#txtLeft").val() != '') ? parseInt($("#txtLeft").val()) : 20;
    //var y = ($("#txtTop").val() != '') ? parseInt($("#txtTop").val()) : 20;
    var x = ($("#txtLeft").val() != '') ? parseFloat($("#txtLeft").val()) : GetRandom(canvas.width);
    var y = ($("#txtTop").val() != '') ? parseFloat($("#txtTop").val()) : GetRandom(canvas.height);
    var width = ($("#txtWidth").val() != '') ? parseFloat($("#txtWidth").val()) : 50;
    var height = ($("#txtHeight").val() != '') ? parseFloat($("#txtHeight").val()) : 50;
    var scale = ($("#txtScale").val() != '') ? parseFloat($("#txtScale").val()) : 1.0;
    var angle = ($("#txtAngle").val() != '') ? parseFloat($("#txtAngle").val()) : 0;
    var value = ($("#txtText").val() != '') ? $("#txtText").val() : 'Hello';
    var font = ($("#txtFont").val() != '') ? $("#txtFont").val() : 'Arial';
    var size = ($("#txtFontSize").val() != '') ? parseInt($("#txtFontSize").val()) : 20;
    var align = ($('#divAlign input:radio:checked').attr('id') != null) ? $('#divAlign input:radio:checked').attr('id') : '';
    var textdec = ($('#divTextDec input:radio:checked').attr('id') != null) ? $('#divTextDec input:radio:checked').attr('id') : '';
    var radius = ($("#txtRadius").val() != '') ? parseFloat($("#txtRadius").val()) : 0;
    var bold = ($("#bold").is(":checked") == true) ? 'bold' : 'normal';
    var italic = ($("#italic").is(":checked") == true) ? 'italic' : '';;
    var edit = $("#editable").is(":checked");
    var drag = $("#draggable").is(":checked");
    var rotate = $("#rotatable").is(":checked");

    console.log(type, color, bg, x, y, width, height, scale, angle, value, font, size, align, textdec, radius, bold, italic, edit, drag, rotate);

    var obj;
    switch (type) {
        case 'text':
            obj = new fabric.IText(value, {
                fontSize: size,
                left: x,
                top: y,
                fontFamily: font,
                fill: color,
                //did: did,
                align: align,
                fontWeight: bold,
                fontStyle: italic,
                selectable: edit,
                editable: edit,
                draggable: drag,
                rotatable: rotate,
                hasBorders: edit,
                hasControls: edit,
                hasRotatingPoint: rotate,
                lockUniScaling: edit
                //stroke: bordercolor,
                //strokeWidth: borderwidth
            });
            break;
        case 'image':

            break;
        case 'line':
            width = canvas.width - 40;
            height = 2;
            x = 10;
            var points = [x, y, (parseInt(x) + parseInt(width)), y];

            obj = new fabric.Line(points, {
                strokeWidth: height,
                fill: color,
                stroke: color,
                align: align,
                selectable: edit,
                editable: edit
            });
            break;
        case 'rect':
            obj = new fabric.Rect({
                top: y,
                left: x,
                width: width,
                height: height,
                fill: color,
                stroke: bordercolor,
                strokeWidth: borderwidth,
                selectable: edit
            });
            break;
    }
    if (obj != null) {

        canvas.add(obj);
        var zidx = canvas.getObjects().indexOf(obj);
        obj.zindex = zidx;
        if (align == 'center') {
            canvas.centerObjectH(obj);
        }
        obj.setCoords();
        canvas.setActiveObject(obj);
        canvas.renderAll();
    }

}

function GetRandom(max) {
    var min = 0;
    max = max - 40;
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function UpdateBg(color) {
    var activeObj = canvas.getActiveObject();
    if (activeObj && activeObj.type == 'i-text') {
        activeObj.backgroundColor = color;
        canvas.renderAll();
    }
}

function UpdateFont(color) {
    var activeObj = canvas.getActiveObject();
    if (activeObj && activeObj.type == 'image') {
        activeObj.filters[0] = new fabric.Image.filters.Tint({
            color: $("#txtForeColor").spectrum('get').toHexString()
        });

        activeObj.applyFilters(canvas.renderAll.bind(canvas));
    }
    else if (activeObj && activeObj.type == 'i-text') {
        activeObj.fill = $("#txtForeColor").spectrum('get').toHexString();
        canvas.renderAll();
    }
    else if (activeObj && activeObj.type == 'rect') {
        activeObj.fill = $("#txtForeColor").spectrum('get').toHexString();
        canvas.renderAll();
    }
    else {
        //$("#text5").css('color', $("#picker").spectrum('get').toHexString());
    }
}


function ResetControls() {
    $("#center").prop('checked', false);
    $("#left").prop('checked', false);
    $("#right").prop('checked', false);
    $("#center").parent().removeClass('active');
    $("#left").parent().removeClass('active');
    $("#right").parent().removeClass('active');
    $("#top").parent().removeClass('active');
    $("#middle").parent().removeClass('active');
    $("#bottom").parent().removeClass('active');
    $("#italic").prop('checked', false);
    $("#italic").parent().removeClass('active');
    $("#bold").prop('checked', false);
    $("#bold").parent().removeClass('active');
    $("#underline").prop('checked', false);
    $("#underline").parent().removeClass('active');
    $("#overline").prop('checked', false);
    $("#overline").parent().removeClass('active');
    $("#line-through").prop('checked', false);
    $("#line-through").parent().removeClass('active');
    $("#no-dec").prop('checked', false);
    $("#no-dec").parent().removeClass('active');
}

function UpdateZindex() {
    var activeObj = canvas.getActiveObject();
    if (activeObj) {
        var zidx = canvas.getObjects().indexOf(activeObj);
        activeObj.zindex = zidx;
        activeObj.setCoords();
        canvas.setActiveObject(activeObj);
        canvas.renderAll();
    }
}

function updateContainer() {
    //console.log($(window).width());
    var width = 400, height = 500;

    if ($(window).width() < width) {
        var sx = ($(window).width() / width);
        //canvas.width = $(window).width();
        //canvas.height = ($(window).width() * 1.25);
        var sy = sx * 1.25;
        canvas.setDimensions({ width: $(window).width(), height: ($(window).width() * 1.25) });

        console.log('sx: ' + sx + ' sy: ' + sy);

        canvas.getObjects().forEach(function (o) {
            o.left = o.left * sx;
            o.top = o.top * sy;
            o.scaleX = sx;
            o.scaleY = sy;
        });
        canvas.renderAll();
    }
    else {
        var sx = ($(window).width() / width);
        var sy = sx * 1.25;
        canvas.setDimensions({ width: 400, height: 500 });
        canvas.getObjects().forEach(function (o) {
            o.left = o.left * sx;
            o.top = o.top * sy;
            o.scaleX = sx;
            o.scaleY = sy;
        });
        canvas.renderAll();
    }
}

function GetScale(newValue, oldValue) {
    return Math.round(newValue / oldValue);
}

function resize() {
    if ($(window).width() < canvas.width) {
        zoom($(window).width());
    }
    else {
        zoom(400);
    }
}

function zoom(w) {

    //var width = 400, height = 500;
    canvas.deactivateAll();
    var scale = w / parseInt(canvas.width.toString().replace('px', ''));

    canvas.setDimensions({
        "width": w,
        "height": (w * 1.25)
    });

    canvas.calcOffset();
    var objects = canvas.getObjects();
    for (var i in objects) {
        var scaleX = objects[i].scaleX;
        var scaleY = objects[i].scaleY;
        var left = objects[i].left;
        var top = objects[i].top;

        objects[i].scaleX = scaleX * scale;
        objects[i].scaleY = scaleY * scale;
        objects[i].left = left * scale;
        objects[i].top = top * scale;

        objects[i].setCoords();
    }
    canvas.renderAll();

}

function downloadCanvas(link, filename) {
    canvas1.deactivateAll();
    canvas1.renderAll();

    var ctx = canvas1.getContext("2d");
    var myImageData = ctx.getImageData(0, 0, canvas1.width, canvas1.height);
    var buffer = document.createElement('canvas');
    var bufferCtx = buffer.getContext("2d");
    buffer.width = canvas1.width;
    buffer.height = canvas1.height;
    bufferCtx.putImageData(myImageData, 0, 0);
    //window.open(buffer.toDataURL('image/png'));


    //link.href = canvas1.toDataURL();
    link.href = buffer.toDataURL('image/png');
    link.download = filename;

}

