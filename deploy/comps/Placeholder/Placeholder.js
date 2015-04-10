(function(b,a){b(["JC.BaseMVC"],function(){JC.Placeholder=d;JC.f.addAutoInit&&JC.f.addAutoInit(d);function d(h){h&&(h=$(h));if(d.isSupport){h&&h.is("[xplaceholder]")&&h.attr("placeholder",h.attr("xplaceholder"));return}if(d.getInstance(h)){return d.getInstance(h)}d.getInstance(h,this);this._model=new d.Model(h);this._view=new d.View(this._model);this._init();JC.log("Placeholder:",new Date().getTime())}d.getInstance=function(h,i){if(typeof h=="string"&&!/</.test(h)){h=$(h)}if(!(h&&h.length)||(typeof h=="string")){return}typeof i!="undefined"&&h.data(d.Model._instanceName,i);return h.data(d.Model._instanceName)};d.init=function(i){var j=[],h;d.update();i=$(i||document);if(i&&i.length&&(h=i.prop("nodeName").toLowerCase())){if(h=="text"||h=="textarea"){if(d.isSupport){i.is("[xplaceholder]")&&i.attr("placeholder",i.attr("xplaceholder"))}else{i.is("[placeholder]")&&j.push(new d(i))}}else{i.find(["input[type=text][placeholder]","textarea[placeholder]","input[type=text][xplaceholder]","textarea[xplaceholder]"].join(",")).each(function(){var k=$(this);if(d.isSupport){k.is("[xplaceholder]")&&k.attr("placeholder",k.attr("xplaceholder"))}else{j.push(new d(k))}})}}return j};d.update=function(){var h=$(JC.f.printf("#{0} > div",d.Model._boxId));if(!h.length){return}h.each(function(){var i=$(this),j=i.data("CPHIns");if(!j){return}j.update()})};d.className="xplaceholder";d.isSupport="placeholder" in $('<input type="text" />')[0];d.prototype={_beforeInit:function(){},_initHanlderEvent:function(){var h=this;h._model.selector().on("focus",function(i){h._view.hide()});h._model.selector().on("blur",function(i){h._view.show()});h._model.selector().on("placeholder_remove",function(i){h._model.placeholder().remove();d.Model._removeTm&&clearTimeout(d.Model._removeTm);d.Model._removeTm=setTimeout(function(){d.update()},1)});h.on("CPHUpdate",function(i){h._view.update()});h.on("CPHInitedPlaceholder",function(i){var j=h._model.placeholder();j.on("click",function(k){h._model.selector().trigger("focus");g(h._model.selector()[0],h._model.selector().val().length)});j.data("CPHIns",h)})},_inited:function(){var h=$(this);h.trigger("CPHUpdate")},update:function(){this._view.update()}};BaseMVC.buildModel(d);d.Model._instanceName="Placeholder";d.Model._boxId="XPlaceHolderBox";d.Model.prototype={init:function(){},className:function(){var h=this.attrProp("cphClassName")||d.className;return h},text:function(){var h=this.attrProp("xplaceholder")||this.attrProp("placeholder")||"";return h},placeholder:function(){if(!this._placeholder){this._placeholder=$(JC.f.printf('<div class="{0}" style="display:none;"></div>',this.className())).appendTo(this.placeholderBox());$(this).trigger("TriggerEvent",["CPHInitedPlaceholder"])}this._placeholder.html(this.text());return this._placeholder},placeholderBox:function(){var h=$("#"+d.Model._boxId);if(!(h&&h.length)){h=$(JC.f.printf('<div id="{0}"></div>',d.Model._boxId)).appendTo(document.body)}return h}};BaseMVC.buildView(d);d.View.prototype={init:function(){},update:function(){var h=this,j=h._model.selector().val().trim(),l=h._model.placeholder();if(j||!h.selector().is(":visible")){l.hide();return}var i=h._model.selector().offset(),k=h._model.selector().prop("offsetHeight"),m=l.prop("offsetHeight");l.css({left:i.left+"px",top:i.top+1+"px"});l.show()},hide:function(){var h=this;h._model.placeholder().hide()},show:function(){var h=this,i=h._model.selector().val().trim();if(i){return}this.update();h._model.placeholder().show()}};BaseMVC.build(d);$.event.special.placeholder_remove={remove:function(h){if(h.handler){h.handler()}}};$(window).on("resize",function(){d.update()});function g(h,p){if(h.setSelectionRange){h.focus();h.setSelectionRange(p,p)}else{if(h.createTextRange){var q=h.createTextRange();var k=p;var n=p;var j=0;var l=0;var r=h.value;for(var m=0;m<r.length&&m<k;m++){var o=r.charAt(m);if(o!="\n"){j++}}for(var m=r.length-1;m>=n&&m>=0;m--){var o=r.charAt(m);if(o!="\n"){l++}}q.moveStart("character",j);q.moveEnd("character",-l);q.select();h.focus()}}}var c=$.fn.show,e=$.fn.hide,f=$({});$.fn.show=function(){var i=c.apply(this,arguments),h=this;setTimeout(function(){f.trigger("show")},1);return i};$.fn.hide=function(){var i=e.apply(this,arguments),h=this;setTimeout(function(){f.trigger("hide")},1);return i};f.on("show hide",function(){f.data("timer")&&clearTimeout(f.data("timer"));f.data("timer",setTimeout(function(){d.update()},100))});$(document).ready(function(){var h=0;d.autoInit&&(h=d.init())});return JC.Placeholder})}(typeof define==="function"&&define.amd?define:function(b,a,c){typeof b=="function"&&(c=b);typeof a=="function"&&(c=a);c&&c()},window));