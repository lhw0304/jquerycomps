(function(b,a){b(["JC.BaseMVC","JC.Panel","SWFUpload"],function(){JC.AjaxUpload=c;function c(d){if(c.getInstance(d)){return c.getInstance(d)}if(!d.hasClass("js_compAjaxUpload")){return c.init(d)}c.getInstance(d,this);this._model=new c.Model(d);this._view=new c.View(this._model);JC.log("AjaxUpload init",new Date().getTime());this._init()}c.getInstance=function(d,e){if(typeof d=="string"&&!/</.test(d)){d=$(d)}if(!(d&&d.length)||(typeof d=="string")){return}typeof e!="undefined"&&d.data(c.Model._instanceName,e);return d.data(c.Model._instanceName)};c.init=function(d){var e=[];d=$(d||document);if(d.hasClass("js_compAjaxUpload")){e.push(new c(d))}else{d.find("input.js_compAjaxUpload, button.js_compAjaxUpload").each(function(){e.push(new c($(this)))})}return e};c.frameFileName="default.html";c.randomFrame=false;c._FRAME_DIR="modules/JC.AjaxUpload/0.1/frame/";b&&!b.amd&&(c._FRAME_DIR="comps/AjaxUpload/frame/");c._INS_COUNT=1;BaseMVC.build(c);JC.f.extendObject(c.prototype,{_beforeInit:function(){var d=this;JC.log("AjaxUpload _beforeInit",new Date().getTime())},_initHanlderEvent:function(){var d=this;d.on("FrameLoad",function(e){var f=d._model.frame().prop("contentWindow");if(!(f&&f.initPage)){return}f.initPage(d,d._model);if(d._model.INITED){return}d._model.INITED=true;if(d._model.cauDefaultHide()){setTimeout(function(){d._model.frame().hide();d._model.selector().hide()},1)}d._model.selector().on("show",function(g){JC.log("show")});d._model.selector().on("hide",function(g){JC.log("hide")});d._model.frame().on("show",function(g){JC.log("show")});d._model.frame().on("hide",function(g){JC.log("hide")})});d.on("ERR_FILE_EXT",function(e,f){d._view.errFileExt(f);d._view.updateChange()});d.on("BeforeUpload",function(e){d._view.beforeUpload()});d.on("UploadDone",function(f,e,g){if(g){return}JC.log(e);var j=false,i=e;try{typeof e=="string"&&(e=$.parseJSON(e))}catch(h){e={};j=true}if(j){d._view.errFatalError(i);d._view.updateChange();d._model.cauUploadErrorCallback()&&d._model.cauUploadErrorCallback().call(d,e,d._model.selector(),d._model.frame())}else{if(e.errorno){d._view.errUpload(e);d._view.updateChange()}else{d._view.updateChange(e)}d._model.cauUploadDoneCallback()&&d._model.cauUploadDoneCallback().call(d,e,d._model.selector(),d._model.frame())}});d.on("AUUpdateLayout",function(f,e,g,h){d._view.updateLayout(e,g,h)})},_inited:function(){var d=this;JC.log("AjaxUpload _inited",new Date().getTime());d._view.loadFrame();c.getInstance(d._model.frame(),d);d.trigger("AUInited")},update:function(e){var d=this;$(d._view).trigger("UpdateDefaultStatus");e&&d.trigger("UploadDone",[e]);return this}});c.Model._instanceName="AjaxUpload";JC.f.extendObject(c.Model.prototype,{init:function(){JC.log("AjaxUpload.Model.init:",new Date().getTime())},cauStyle:function(){return this.attrProp("cauStyle")},cauButtonText:function(){return this.attrProp("cauButtonText")},cauUrl:function(){return this.attrProp("cauUrl")},cauFileExt:function(){return this.stringProp("cauFileExt")},cauFileName:function(){return this.attrProp("cauFileName")||this.attrProp("name")},cauLabelKey:function(){return this.attrProp("cauLabelKey")||"name"},cauValueKey:function(){return this.attrProp("cauValueKey")||"url"},cauSaveLabelSelector:function(){var d=this.selectorProp("cauSaveLabelSelector");return d},cauStatusLabel:function(){return this.selectorProp("cauStatusLabel")},cauDisplayLabel:function(){return this.selectorProp("cauDisplayLabel")},cauDisplayLabelCallback:function(){return this.callbackProp("cauDisplayLabelCallback")},cauHideButton:function(){var d=false;this.is("[cauHideButton]")&&(d=this.boolProp(this.attrProp("cauHideButton")));return d},cauDefaultHide:function(){return this.boolProp("cauDefaultHide")},cauUploadDoneCallback:function(){return this.callbackProp("cauUploadDoneCallback")},cauUploadErrorCallback:function(){return this.callbackProp("cauUploadErrorCallback")},cauJSONPName:function(){var d=c.JSONPName;d=JC.f.getUrlParam(this.cauUrl(),"callback")||d;d=this.attrProp("cauJSONPName")||d;return d},framePath:function(){var d=this.attrProp("cauFrameFileName")||c.frameFileName,e=JC.f.printf("{0}{1}{2}",JC.PATH,c._FRAME_DIR,d);this.randomFrame()&&(e=JC.f.addUrlParams(e,{rnd:new Date().getTime()}));return e},randomFrame:function(){var d=c.randomFrame;this.selector().is("[cauRandomFrame]")&&(d=this.boolProp("cauRandomFrame"));return d},frame:function(){if(!this._iframe){var d=c.frameTpl;if(this.selector().is("[cauFrameScriptTpl]")){d=JC.f.scriptContent(JC.f.parentSelector(this.selector(),this.selector().attr("cauFrameScriptTpl")))}this._iframe=$(c.frameTpl)}return this._iframe}});JC.f.extendObject(c.View.prototype,{init:function(){JC.log("AjaxUpload.View.init:",new Date().getTime());var d=this;$(d).on("UpdateDefaultStatus",function(f){var g=d._model.cauStatusLabel(),e=d._model.cauDisplayLabel();d.updateChange();d._model.frame().show();g&&g.length&&g.hide();e&&e.length&&e.hide();(d._model.selector().attr("type")||"").toLowerCase()!="hidden"&&d._model.selector().show()});$(d).on("CAUUpdate",function(h,f){var e=d._model.cauDisplayLabel(),i="",g="";if(typeof f!="undefined"){g=f.data[d._model.cauValueKey()];i=f.data[d._model.cauLabelKey()];d._model.selector().val(g);d._model.cauSaveLabelSelector()&&d._model.cauSaveLabelSelector().val(i)}if(d._model.cauDisplayLabelCallback()){i=d._model.cauDisplayLabelCallback().call(d._model.selector(),f,i,g)}else{i=JC.f.printf('<a href="{0}" class="green js_auLink" target="_blank">{1}</a>',g,i)}e&&e.length&&e.html(i)})},loadFrame:function(){var d=this,f=d._model.framePath(),e=d._model.frame();JC.log(f);e.attr("src",f);e.on("load",function(){d.trigger("FrameLoad")});d._model.selector().before(e)},beforeUpload:function(){var d=this,e=d._model.cauStatusLabel();JC.log("AjaxUpload view#beforeUpload",new Date().getTime());this.updateChange(null,true);if(e&&e.length){d._model.selector().hide();d._model.frame().hide();e.show()}},updateChange:function(f,g){var d=this,h=d._model.cauStatusLabel(),e=d._model.cauDisplayLabel();if(h&&h.length&&!g){d._model.selector().show();d._model.frame().show();h.hide()}if(e&&e.length){e.html("")}d._model.selector().val("");d._model.cauSaveLabelSelector()&&d._model.cauSaveLabelSelector().val("");if(f&&("errorno" in f)&&!f.errorno){$(d).trigger("CAUUpdate",[f]);d._model.selector().val()&&d._model.selector().is(":visible")&&d._model.selector().prop("type").toLowerCase()=="text"&&d._model.selector().trigger("blur");if(e&&e.length){d._model.selector().hide();if(d._model.is("[cauHideButton]")){d._model.cauHideButton()&&d._model.frame().hide()}else{d._model.frame().hide()}e.show();return}}},updateLayout:function(e,f,g){if(!(e&&f)){return}var d=this;JC.log("AjaxUpload @event UpdateLayout",new Date().getTime(),e,f);d._model.frame().css({width:e+"px",height:f+"px"})},errUpload:function(e){var d=this,f=d._model.callbackProp("cauUploadErrCallback");if(f){f.call(d._model.selector(),e,d._model.frame())}else{var g=e&&e.errmsg?e.errmsg:"上传失败, 请重试!";JC.Dialog?JC.Dialog.alert(g,1):alert(g)}},errFileExt:function(f){var d=this,e=d._model.callbackProp("cauFileExtErrCallback");if(e){e.call(d._model.selector(),d._model.cauFileExt(),f,d._model.frame())}else{var g=JC.f.printf('类型错误, 允许上传的文件类型: {0} <p class="auExtErr" style="color:red">{1}</p>',d._model.cauFileExt(),f);JC.Dialog?JC.Dialog.alert(g,1):alert(g)}},errFatalError:function(e){var d=this,f=d._model.callbackProp("cauFatalErrorCallback");if(f){f.call(d._model.selector(),e,d._model.frame())}else{var g=JC.f.printf('服务端错误, 无法解析返回数据: <p class="auExtErr" style="color:red">{0}</p>',e);JC.Dialog?JC.Dialog.alert(g,1):alert(g)}}});$.event.special.AjaxUploadShowEvent={show:function(d){if(d.handler){d.handler()}}};c.frameTpl=JC.f.printf('<iframe src="about:blank" frameborder="0" class="AUIframe" style="{0}"></iframe>',"width: 84px; height: 24px;cursor: pointer; vertical-align: middle;");$(document).ready(function(){c.autoInit&&c.init()});return JC.AjaxUpload})}(typeof define==="function"&&define.amd?define:function(b,a,c){typeof b=="function"&&(c=b);typeof a=="function"&&(c=a);c&&c()},window));