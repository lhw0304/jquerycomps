(function(b,a){b(["JC.BaseMVC","JC.Panel","SWFUpload"],function(){JC.AjaxUpload=e;function e(f){if(e.getInstance(f)){return e.getInstance(f)}if(!f.hasClass("js_compAjaxUpload")){return e.init(f)}e.getInstance(f,this);this._model=new e.Model(f);this._view=new e.View(this._model);JC.log("AjaxUpload init",new Date().getTime());this._init()}e.getInstance=function(f,g){if(typeof f=="string"&&!/</.test(f)){f=$(f)}if(!(f&&f.length)||(typeof f=="string")){return}typeof g!="undefined"&&f.data(e.Model._instanceName,g);return f.data(e.Model._instanceName)};e.init=function(f){var g=[];f=$(f||document);if(f.hasClass("js_compAjaxUpload")){g.push(new e(f))}else{f.find("input.js_compAjaxUpload, button.js_compAjaxUpload").each(function(){g.push(new e($(this)))})}return g};BaseMVC.build(e);JC.f.extendObject(e.prototype,{_beforeInit:function(){var f=this},_initHanlderEvent:function(){var f=this;f.on("ERR_FILE_EXT",function(g,h){f._view.errFileExt(h);f._view.updateChange()});f.on("BeforeUpload",function(g){f._view.beforeUpload()});f.on("UploadDone",function(i,g,j,h){if(j){return}var m=false,l=g;try{typeof g=="string"&&(g=$.parseJSON(g))}catch(k){g={};m=true}f.trigger("UploadComplete");if(m){f._view.errFatalError(l);f.trigger("UpdateDefaultStatus");f._model.cauUploadErrorCallback()&&f._model.cauUploadErrorCallback().call(f,g,f._model.selector())}else{if(g.errorno){f._view.errUpload(g);f._view.updateChange()}else{f._view.updateChange(g)}f._model.cauUploadDoneCallback()&&f._model.cauUploadDoneCallback().call(f,g,f._model.selector())}});f.on("UpdateDefaultStatus",function(i,h,g,j){JC.f.safeTimeout(function(){$(f._view).trigger("UpdateDefaultStatus",[h,g,j])},f,"RESET_STATUS",100)});f.on("UploadError",function(i,h,g,j){$(f._view).trigger("UploadError",[h,g,j])});f.on("CancelUpload",function(g){f._model.cancelUpload();f.trigger("UploadComplete")});f.on("UploadComplete",function(g,h){f._view.uploadComplete(h)});f.on("UploadProgress",function(h,g,i,j){f._view.uploadProgress(g.name,i,j)});f.on("init",function(){f._model.loadSWF(f._model.getParams())})},_inited:function(){var f=this;$(document).delegate(JC.f.printf(".AjaxUploadProgressBox_{0} .AUCancelProgress",f._model.id()),"click",function(g){f.trigger("CancelUpload")});f.trigger("init")},update:function(g){var f=this;f.trigger("UpdateDefaultStatus");g&&f.trigger("UploadDone",[g]);return this}});e.Model._instanceName="AjaxUpload";e.Model._insCount=1;if(JC.use){e.Model.FLASH_URL="/plugins/SWFUpload.swf";e.Model.PATH="/comps/AjaxUpload/"}else{e.Model.FLASH_URL="/modules/SWFUpload/2.5.0/SWFUpload.swf";e.Model.PATH="/modules/JC.AjaxUpload/0.2/"}e.Model.PROGRESS_TPL=['<span class="AUProgressBox" style="display:none;">','<button type="button" class="AUProgress"><div class="AUPercent"></div></button>','<button type="button" class="AUCancelProgress"></button>',"</span>"].join("");JC.f.extendObject(e.Model.prototype,{init:function(){this._id=e.Model._insCount++},id:function(){return this._id},cauStyle:function(){return this.attrProp("cauStyle")||"g1"},cauButtonText:function(){return this.attrProp("cauButtonText")||"上传文件"},cauUrl:function(){return this.attrProp("cauUrl")},cauFileExt:function(){var f=this.stringProp("cauFileExt")||this.stringProp("fileext")||this.stringProp("file_types");f&&(f=f.replace(/[\s]+/g,""));if(f&&!/[\*]/.test(f)){f=f.split(",");$.each(f,function(h,g){f[h]="*"+g});f=f.join(";")}return f},cauFileName:function(){return this.attrProp("cauFileName")||this.attrProp("name")||"file"},cauLabelKey:function(){return this.attrProp("cauLabelKey")||"name"},cauValueKey:function(){return this.attrProp("cauValueKey")||"url"},cauSaveLabelSelector:function(){var f=this.selectorProp("cauSaveLabelSelector");return f},cauStatusLabel:function(){return this.selectorProp("cauStatusLabel")},cauDisplayLabel:function(){return this.selectorProp("cauDisplayLabel")},cauDisplayLabelCallback:function(){return this.callbackProp("cauDisplayLabelCallback")},cauDefaultHide:function(){return this.boolProp("cauDefaultHide")},cauUploadDoneCallback:function(){return this.callbackProp("cauUploadDoneCallback")},cauUploadErrorCallback:function(){return this.callbackProp("cauUploadErrorCallback")},cauDebug:function(){return this.boolProp("cauDebug")},cauFlashUrl:function(){var f=this.attrProp("cauFlashUrl");!f&&(f=JC.PATH+e.Model.FLASH_URL);return f},cauButtonWidth:function(){var f=this.cauButtonText();return this.intProp("cauButtonWidth")||(c(f)*7+20)},cauButtonHeight:function(f){return this.intProp("cauButtonHeight")||f||22},cauButtonStyle:function(f){return this.attrProp("cauButtonStyle")||this.attrProp("button_text_style")||f||".uFont{ color:#000000; text-align: center; }"},initButtonStyle:function(h){if(!h){return}var g=this,f=g.cauStyle()||"";h.button_width=g.cauButtonWidth();h.button_height=g.cauButtonHeight();h.button_text_top_padding="2";switch(g.cauStyle()){case"g1":h.button_image_url=JC.f.printf("{0}res/default/g_61x27.png",g.cauRoot());h.button_text_style=g.cauButtonStyle(".uFont{ color:#ffffff; text-align: center; }");break;case"g2":h.button_text_top_padding="4";h.button_height=g.cauButtonHeight(26);h.button_image_url=JC.f.printf("{0}res/default/g_61x27.png",g.cauRoot());h.button_text_style=g.cauButtonStyle(".uFont{ color:#ffffff; text-align: center; }");break;case"g3":h.button_text_top_padding="6";h.button_height=g.cauButtonHeight(28);h.button_image_url=JC.f.printf("{0}res/default/g_61x27.png",g.cauRoot());h.button_text_style=g.cauButtonStyle(".uFont{ color:#ffffff; text-align: center; }");break;case"w1":h.button_text_top_padding="3";h.button_image_url=JC.f.printf("{0}res/default/w_61x27.png",g.cauRoot());h.button_text_style=g.cauButtonStyle(".uFont{ color:##000000; text-align: center; }");break;case"w2":h.button_text_top_padding="4";h.button_height=g.cauButtonHeight(26);h.button_image_url=JC.f.printf("{0}res/default/w_61x27.png",g.cauRoot());h.button_text_style=g.cauButtonStyle(".uFont{ color:#000000; text-align: center; }");break;case"w3":h.button_text_top_padding="6";h.button_height=g.cauButtonHeight(28);h.button_image_url=JC.f.printf("{0}res/default/w_61x27.png",g.cauRoot());h.button_text_style=g.cauButtonStyle(".uFont{ color:#000000; text-align: center; }");break;default:h.button_text_style=g.cauButtonStyle();break}},layoutButton:function(){var g=this,f="AjaxUpload_hl_"+g.id();if(!this._buttonLayout){g._buttonLayout=$(JC.f.printf('<button type="text" class="btn AUBtn AUBtn-{1} js_btn"><span id="{0}"></span></button>',f,g.cauStyle()));g.selector().after(this._buttonLayout)}return this._buttonLayout},cauRoot:function(){var f=this.attrProp("cauRoot");!f&&(f=JC.f.fixPath(JC.PATH+e.Model.PATH));return f},cauUploadLimit:function(){return this.intProp("cauUploadLimit")||this.intProp("file_upload_limit")||0},cauQueueLimit:function(){return this.intProp("cauQueueLimit")||this.intProp("file_queue_limit")||0},cauFileSize:function(){return this.attrProp("file_size_limit")||this.attrProp("cauFileSize")||"1024 MB"},cauCacheSwf:function(){var f=true;this.attrProp("prevent_swf_caching")&&(f=!this.boolProp("prevent_swf_caching"));this.attrProp("cauCacheSwf")&&(f=this.boolProp("cauCacheSwf"));f=!f;return f},cauHttpSuccess:function(){var g=[200,201,204],f=this.attrProp("cauHttpSuccess")||this.attrProp("http_success");f&&(g=f.replace(/[\s]+/g,"").split(","));return g},cauBatchUpload:function(){return this.boolProp("cauBatchUpload")},getParams:function(){var g=this,h={},f=g.cauFileExt();g.layoutButton();h.debug=g.cauDebug();h.flash_url=JC.f.fixPath(g.cauFlashUrl());h.upload_url=g.cauUrl();h.file_post_name=g.cauFileName();g.initButtonStyle(h);h.button_placeholder_id=g.layoutButton().find("> span[id]").attr("id");h.button_text=JC.f.printf('<span class="uFont">{0}</span>',g.cauButtonText());h.button_window_mode=SWFUpload.WINDOW_MODE.TRANSPAREN;h.button_cursor=SWFUpload.CURSOR.HAND;h.button_action=g.cauBatchUpload()?SWFUpload.BUTTON_ACTION.SELECT_FILES:SWFUpload.BUTTON_ACTION.SELECT_FILE;h.file_upload_limit=g.cauUploadLimit();h.file_queue_limit=g.cauQueueLimit();h.file_size_limit=g.cauFileSize();h.prevent_swf_caching=g.cauCacheSwf();h.http_success=g.cauHttpSuccess();f&&(h.file_types=f);h.file_dialog_start_handler=function(){JC.hideAllPopup(1)};h.file_dialog_complete_handler=function(i){if(g.beforeUploadError()){g.beforeUploadError(false);return}if(!i){return}g.trigger("BeforeUpload");this.startUpload()};h.upload_progress_handler=function(i,j,k){g.trigger("UploadProgress",[i,j,k])};h.upload_error_handler=function(j,i,k){g.trigger("UpdateDefaultStatus");g.trigger("UploadError",[j,i,k])};h.upload_success_handler=function(j,i,k){g.trigger("UploadDone",[i,false,j.name])};h.upload_complete_handler=function(i){this.setButtonDisabled(false)};h.file_queue_error_handler=function(j,i,k){g.trigger("UpdateDefaultStatus");g.trigger("UploadError",[j,i,k]);this.setButtonDisabled(false)};return h},beforeUploadError:function(f){typeof f!="undefined"&&(this._beforeUploadError=f);return this._beforeUploadError},loadSWF:function(f){this._swfu&&this._swfu.destory();this.cauParamsCallback()&&(f=this.cauParamsCallback().call(this,f));this._swfu=new SWFUpload(f)},swfu:function(){return this._swfu},cauParamsCallback:function(){return this.callbackProp("cauParamsCallback")},cancelUpload:function(){if(this._swfu){this._swfu.cancelUpload()}},cauShowProgress:function(){var f=this.boolProp("cauShowProgress");!f&&this.cauProgressBox()&&(f=this.cauProgressBox().length);return f},cauProgressBox:function(){var f=this._cauProgressBox||this.selectorProp("cauProgressBox");if(!(f&&f.length)){if(this.boolProp("cauShowProgress")){f=this._cauProgressBox=$(e.Model.PROGRESS_TPL);this.selector().after(f)}}if(f&&f.length&&!this._initedProgressBox){f.addClass("AjaxUploadProgressBox_"+this.id());this._initedProgressBox=true}return f}});JC.f.extendObject(e.View.prototype,{init:function(){var f=this;$(f).on("UpdateDefaultStatus",function(h){var i=f._model.cauStatusLabel(),g=f._model.cauDisplayLabel();f.updateChange();f._model.layoutButton().show();i&&i.length&&i.hide();g&&g.length&&g.hide();(f._model.selector().attr("type")||"").toLowerCase()!="hidden"&&f._model.selector().show()});$(f).on("UploadError",function(i,h,g,k){var j;switch(g){case -110:j=JC.f.printf('<h2>文件大小超出限制</h2>可接受的文件大小: <b style="color:green"><= {0}</b><br />{1}: <b style="color:red">{2}</b>',f._model.cauFileSize(),h.name,d(h.size).replace("i",""));JC.msgbox(j,f._model.layoutButton(),2,null,1000*8);break;case -200:j=JC.f.printf('<h2>文件大小超出服务器限制</h2>{1}: <b style="color:red">{2}</b>',f._model.cauFileSize(),h.name,d(h.size).replace("i",""));JC.msgbox(j,f._model.layoutButton(),2,null,1000*8);break;case -130:f._model.beforeUploadError(true);j=JC.f.printf('<h2>文件类型错误</h2>可接受的类型: <b style="color:green">{0}</b><br />本次上传的文件: <b style="color:red">{1}</b>',f._model.cauFileExt(),h.name);JC.msgbox(j,f._model.layoutButton(),2,null,1000*8);break;default:alert(["上传出错!","错误代码:",g,"出错原因:",k].join(" "));break}f.trigger("UploadComplete")});$(f).on("CAUUpdate",function(j,h){var g=f._model.cauDisplayLabel(),k="",i="";if(typeof h!="undefined"){i=h.data[f._model.cauValueKey()];k=h.data[f._model.cauLabelKey()];f._model.selector().val(i);f._model.cauSaveLabelSelector()&&f._model.cauSaveLabelSelector().val(k)}if(f._model.cauDisplayLabelCallback()){k=f._model.cauDisplayLabelCallback().call(f._model.selector(),h,k,i)}else{k=JC.f.printf('<a href="{0}" class="green js_auLink" target="_blank">{1}</a>',i,k)}g&&g.length&&g.html(k)})},beforeUpload:function(){var f=this,h=f._model.cauStatusLabel(),g=f._model.cauProgressBox();this.updateChange(null,true);if(h&&h.length){f._model.selector().hide();h.show()}g&&(g.find(".AUPercent").length&&g.find(".AUPercent").attr("width","0"),g.show())},uploadComplete:function(g){var f=this,h=f._model.cauProgressBox();h&&h.length&&h.hide()},uploadProgress:function(h,j,l){var g=this,k=g._model.cauProgressBox(),f,i=0;if(!(k&&k.length)){return}f=k.find(".AUPercent");if(!f.length){return}j&&(i=j/l*100);f.css("width",i+"%")},updateChange:function(h,i){var f=this,j=f._model.cauStatusLabel(),g=f._model.cauDisplayLabel();if(j&&j.length&&!i){f._model.selector().show();f._model.layoutButton().show();j.hide()}if(g&&g.length){g.html("")}if(h&&g&&g.length){f._model.layoutButton().hide()}f._model.selector().val("");f._model.cauSaveLabelSelector()&&f._model.cauSaveLabelSelector().val("");if(h&&("errorno" in h)&&!h.errorno){$(f).trigger("CAUUpdate",[h]);f._model.selector().val()&&f._model.selector().is(":visible")&&f._model.selector().prop("type").toLowerCase()=="text"&&f._model.selector().trigger("blur");if(g&&g.length){f._model.selector().hide();g.show();return}}},errUpload:function(g){var f=this,h=f._model.callbackProp("cauUploadErrCallback");if(h){h.call(f._model.selector(),g)}else{var i=g&&g.errmsg?g.errmsg:"上传失败, 请重试!";JC.Dialog?JC.Dialog.alert(i,1):alert(i)}},errFileExt:function(h){var f=this,g=f._model.callbackProp("cauFileExtErrCallback");if(g){g.call(f._model.selector(),f._model.cauFileExt(),h)}else{var i=JC.f.printf('类型错误, 允许上传的文件类型: {0} <p class="auExtErr" style="color:red">{1}</p>',f._model.cauFileExt(),h);JC.Dialog?JC.Dialog.alert(i,1):alert(i)}},errFatalError:function(g){var f=this,h=f._model.callbackProp("cauFatalErrorCallback");if(h){h.call(f._model.selector(),g)}else{var i=JC.f.printf('服务端错误, 无法解析返回数据: <p class="auExtErr" style="color:red">{0}</p>',g);JC.Dialog?JC.Dialog.alert(i,1):alert(i)}}});$.event.special.AjaxUploadShowEvent={show:function(f){if(f.handler){f.handler()}}};function d(f,i){var j=i?1000:1024;if(f<j){return f+" B"}var g=i?["kB","MB","GB","TB","PB","EB","ZB","YB"]:["KiB","MiB","GiB","TiB","PiB","EiB","ZiB","YiB"];var h=-1;do{f/=j;++h}while(f>=j);return f.toFixed(1)+" "+g[h]}function c(f){return f.replace(/[^\x00-\xff]/g,"11").length}$(document).ready(function(){e.autoInit&&e.init()});return JC.AjaxUpload})}(typeof define==="function"&&define.amd?define:function(b,a,c){typeof b=="function"&&(c=b);typeof a=="function"&&(c=a);c&&c()},window));