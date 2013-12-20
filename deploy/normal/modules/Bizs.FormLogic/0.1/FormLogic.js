(function(e,t){e(["JC.BaseMVC","JC.Valid","JC.Form","JC.Panel"],function(){return function(t){function n(e){e&&(e=t(e));if(n.getInstance(e))return n.getInstance(e);n.getInstance(e,this),this._model=new n.Model(e),this._view=new n.View(this._model),this._init()}window.Bizs=window.Bizs||{},Bizs.FormLogic=n,n.getInstance=function(e,n){typeof e=="string"&&!/</.test(e)&&(e=t(e));if(!e||!e.length||typeof e=="string")return;return typeof n!="undefined"&&e.data("FormLogicIns",n),e.data("FormLogicIns")},!e.amd&&JC.use&&(!JC.Valid&&JC.use("Valid"),!JC.Form&&JC.use("Form"),!JC.Panel&&JC.use("Panel")),n.init=function(e){var r=[];e&&(e=t(e));if(!e||!e.length)return;return e.prop("nodeName").toLowerCase()=="form"?r.push(new n(e)):e.find("form.js_bizsFormLogic, form.js_autoFormLogic").each(function(){r.push(new n(this))}),r},n.popupCloseMs=2e3,n.formSubmitType="",n.submitDisable=!0,n.resetAfterSubmit=!0,n.processErrorCb,n.prototype={_beforeInit:function(){},_initHanlderEvent:function(){var e=this,r=e._model.formType();e._view.initQueryVal(),e.selector().on("submit",function(r){e._model.isSubmited(!0);var i,s=e.selector().data(n.Model.GENERIC_SUBMIT_BUTTON);s&&(s=t(s)),s&&s.length?(i=JC.f.parseBool(s.attr("formSubmitIgnoreCheck")),JC.Valid.ignore(e.selector(),!i)):JC.Valid.ignore(e.selector(),!0);if(e._model.formBeforeProcess()&&e._model.formBeforeProcess().call(e.selector(),r,e)===!1)return e._model.prevent(r);if(!JC.Valid.check(e.selector()))return e._model.formProcessError()&&e._model.formProcessError().call(e.selector(),r,e),e._model.prevent(r);if(e._model.formAfterProcess()&&e._model.formAfterProcess().call(e.selector(),r,e)===!1)return e._model.prevent(r);if(e.selector().data(n.Model.SUBMIT_CONFIRM_BUTTON))return e.trigger(n.Model.EVT_CONFIRM),e._model.prevent(r);e.trigger("ProcessDone")}),e.on("BindFrame",function(r){var i,s=e._model.formType(),o;if(s!=n.Model.AJAX)return;i=e._model.frame(),i.on("load",function(n){var r=i.prop("contentWindow"),s=r.document.body,o=t("<div>"+(t.trim(s.innerHTML)||"")+"</div>").text();if(!e._model.isSubmited())return;JC.log("common ajax done"),e.trigger("AjaxDone",[o])})}),e.on("AjaxDone",function(r,i){var s=e._model.selector().find("button[type=reset], input[type=reset]");e._model.formSubmitDisable()&&e.trigger("EnableSubmit");var o,u,a=e._model.formAjaxResultType();if(a=="json")try{o=t.parseJSON(i)}catch(f){u=!0,o=i}if(u){var l=JC.f.printf('服务端错误, 无法解析返回数据: <p class="auExtErr" style="color:red">{0}</p>',i);JC.Dialog.alert(l,1);return}o&&a=="json"&&"errorno"in o&&!parseInt(o.errorno,10)&&e._model.formResetAfterSubmit()&&s.length&&e.selector().trigger("reset"),o=o||i||{},e._model.formAjaxDone()&&e._model.formAjaxDone().call(e._model.selector(),o,e._model.selector().data(n.Model.GENERIC_SUBMIT_BUTTON),e),e._model.formResetAfterSubmit()&&!e._model.userFormAjaxDone()&&s.length&&e.selector().trigger("reset")}),e.on("ProcessDone",function(){e._model.formSubmitDisable()&&e.selector().find("input[type=submit], button[type=submit]").each(function(){t(this).prop("disabled",!0)})}),e.on(n.Model.EVT_CONFIRM,function(r){var i=e.selector().data(n.Model.SUBMIT_CONFIRM_BUTTON);i&&(i=t(i));if(!i||!i.length)return;var s;e._model.formConfirmPopupType(i)=="dialog"?s=JC.Dialog.confirm(e._model.formSubmitConfirm(i),2):s=JC.confirm(e._model.formSubmitConfirm(i),i,2),s.on("confirm",function(){e.selector().data(n.Model.SUBMIT_CONFIRM_BUTTON,null),e.selector().trigger("submit")}),s.on("close",function(){e.selector().data(n.Model.SUBMIT_CONFIRM_BUTTON,null)})}),e.selector().on("reset",function(t){if(e.selector().data(n.Model.RESET_CONFIRM_BUTTON))return e.trigger(n.Model.EVT_RESET),e._model.prevent(t);e._view.reset(),e.trigger("EnableSubmit")}),e.on("EnableSubmit",function(){e.selector().find("input[type=submit], button[type=submit]").each(function(){t(this).prop("disabled",!1)})}),e.on(n.Model.EVT_RESET,function(r){var i=e.selector().data(n.Model.RESET_CONFIRM_BUTTON);i&&(i=t(i));if(!i||!i.length)return;var s;e._model.formConfirmPopupType(i)=="dialog"?s=JC.Dialog.confirm(e._model.formResetConfirm(i),2):s=JC.confirm(e._model.formResetConfirm(i),i,2),s.on("confirm",function(){e.selector().data(n.Model.RESET_CONFIRM_BUTTON,null),e.selector().trigger("reset"),e._view.reset(),e.trigger("EnableSubmit")}),s.on("close",function(){e.selector().data(n.Model.RESET_CONFIRM_BUTTON,null)})})},_inited:function(){JC.log("FormLogic#_inited",(new Date).getTime());var e=this,t=e.selector().find("input[type=file][name]");t.length&&e.selector().attr("enctype","multipart/form-data")&&e.selector().attr("encoding","multipart/form-data"),e.trigger("BindFrame")}},JC.BaseMVC.buildModel(n),n.Model._instanceName="FormLogicIns",n.Model.GET="get",n.Model.POST="post",n.Model.AJAX="ajax",n.Model.IFRAME="iframe",n.Model.SUBMIT_CONFIRM_BUTTON="SubmitButton",n.Model.RESET_CONFIRM_BUTTON="ResetButton",n.Model.GENERIC_SUBMIT_BUTTON="GenericSubmitButton",n.Model.GENERIC_RESET_BUTTON="GenericResetButton",n.Model.EVT_CONFIRM="ConfirmEvent",n.Model.EVT_RESET="ResetEvent",n.Model.EVT_AJAX_SUBMIT="AjaxSubmit",n.Model.INS_COUNT=1,n.Model.prototype={init:function(){this.id()},id:function(){return this._id||(this._id="FormLogicIns_"+n.Model.INS_COUNT++),this._id},isSubmited:function(e){return typeof e!="undefined"&&(this._submited=e),this._submited},formType:function(){var e=this.stringProp("method");return!e&&(e=n.Model.GET),e=this.stringProp("formType")||e,e},frame:function(){var e=this;if(!(e._frame&&e._frame.length&&e._frame.parent())){e.selector().is("[target]")&&(e._frame=t(JC.f.printf("iframe[name={0}]",e.selector().attr("target"))));if(!e._frame||!e._frame.length)e.selector().prop("target",e.frameId()),e._frame=t(JC.f.printf(n.frameTpl,e.frameId())),e.selector().after(e._frame)}return e._frame},frameId:function(){return this.id()+"_iframe"},formSubmitType:function(){var e=this.stringProp("ajaxSubmitType")||this.stringProp("formSubmitType")||n.formSubmitType||"plugins";return e.toLowerCase()},formAjaxResultType:function(){var e=this.stringProp("formAjaxResultType")||"json";return e},formAjaxMethod:function(){var e=this.stringProp("formAjaxMethod")||this.stringProp("method");return!e&&(e=n.Model.GET),e.toLowerCase()},formAjaxAction:function(){var e=this.attrProp("formAjaxAction")||this.attrProp("action")||"?";return JC.f.urlDetect(e)},formSubmitDisable:function(){var e=this,t=n.submitDisable,r=e.selector().data(n.Model.GENERIC_SUBMIT_BUTTON);return e.selector().is("[formSubmitDisable]")&&(t=JC.f.parseBool(e.selector().attr("formSubmitDisable"))),r&&r.is("[formSubmitDisable]")&&(t=JC.f.parseBool(r.attr("formSubmitDisable"))),t},formResetAfterSubmit:function(){var e=this,t=n.resetAfterSubmit;return e.selector().is("[formResetAfterSubmit]")&&(t=JC.f.parseBool(e.selector().attr("formResetAfterSubmit"))),t},formAjaxDone:function(){var e=this,t=e._innerAjaxDone,r=e.selector().data(n.Model.GENERIC_SUBMIT_BUTTON);return t=e.userFormAjaxDone()||t,t},userFormAjaxDone:function(){var e=this,r,i=e.selector().data(n.Model.GENERIC_SUBMIT_BUTTON);return e.selector().is("[formAjaxDone]")&&(r=this.callbackProp("formAjaxDone")||r),i&&(i=t(i)).length&&(r=e.callbackProp(i,"formAjaxDone")||r),r},_innerAjaxDone:function(e,n,r){var i=t(this),s,o="";e.data&&e.data.returnurl&&(o=e.data.returnurl),e.url&&(o=e.url),e.errorno?s=JC.Dialog.alert(e.errmsg||"操作失败, 请重新尝试!",1):s=JC.Dialog.msgbox(e.errmsg||"操作成功",0,function(){o=o||r._model.formAjaxDoneAction();if(o){try{o=decodeURIComponent(o)}catch(e){}/^URL/.test(o)&&(o=JC.f.urlDetect(o)),JC.f.reloadPage(o)}},r._model.formPopupCloseMs())},formPopupCloseMs:function(e){var r=this,i=n.popupCloseMs,e=e||r.selector().data(n.Model.GENERIC_SUBMIT_BUTTON);return r.selector().is("[formPopupCloseMs]")&&(i=this.intProp("formPopupCloseMs")||i),e&&(e=t(e)).length&&(i=r.intProp(e,"formPopupCloseMs")||i),i},formAjaxDoneAction:function(){var e=this,r="",i=e.selector().data(n.Model.GENERIC_SUBMIT_BUTTON);return e.selector().is("[formAjaxDoneAction]")&&(r=this.attrProp("formAjaxDoneAction")||r),i&&(i=t(i)).length&&(r=e.attrProp(i,"formAjaxDoneAction")||r),JC.f.urlDetect(r)},formBeforeProcess:function(){return this.callbackProp("formBeforeProcess")},formAfterProcess:function(){return this.callbackProp("formAfterProcess")},formProcessError:function(){var e=this.callbackProp("formProcessError")||n.processErrorCb;return e},prevent:function(e){return e&&e.preventDefault(),!1},formConfirmPopupType:function(e){var n=this.stringProp("formConfirmPopupType")||"dialog";return e&&(e=t(e)).length&&e.is("[formConfirmPopupType]")&&(n=e.attr("formConfirmPopupType")),n.toLowerCase()},formResetUrl:function(){var e=this,r=e.stringProp("formResetUrl"),i=e.selector().data(n.Model.GENERIC_RESET_BUTTON);return i&&(i=t(i)).length&&(r=e.attrProp(i,"formResetUrl")||r),JC.f.urlDetect(r)},formSubmitConfirm:function(e){var n=this.stringProp("formSubmitConfirm");return e&&(e=t(e)).length&&e.is("[formSubmitConfirm]")&&(n=this.stringProp(e,"formSubmitConfirm")),!n&&(n="确定要提交吗?"),n.trim()},formResetConfirm:function(e){var n=this.stringProp("formResetConfirm");return e&&(e=t(e)).length&&e.is("[formResetConfirm]")&&(n=this.stringProp(e,"formResetConfirm")),!n&&(n="确定要重置吗?"),n.trim()}},JC.BaseMVC.buildView(n),n.View.prototype={initQueryVal:function(){var e=this;if(e._model.formType()!=n.Model.GET)return;JC.Form&&JC.Form.initAutoFill(e._model.selector())},reset:function(e){var n=this,r=n._model.formResetUrl();r&&JC.f.reloadPage(r),n._model.resetTimeout&&clearTimeout(n._model.resetTimeout),n._model.resetTimeout=setTimeout(function(){var e=n._model.selector();e.find("input[type=text], input[type=password], input[type=file], textarea").val(""),e.find("select").each(function(){var e=t(this),n=e.find("option");n.length>1&&e.val(t(n[0]).val());var r=e.is("[ignoreprocess]");e.attr("ignoreprocess",!0),e.trigger("change"),setTimeout(function(){!r&&e.removeAttr("ignoreprocess")},500)}),JC.Valid&&JC.Valid.clearError(e)},50),JC.hideAllPopup(1)}},JC.BaseMVC.build(n,"Bizs"),t(document).delegate("input[formSubmitConfirm], button[formSubmitConfirm]","click",function(e){var r=t(this),i=JC.f.getJqParent(r,"form"),s=n.getInstance(i),o;if(i&&i.length){if(s){i.data(n.Model.SUBMIT_CONFIRM_BUTTON,null);if(r.is("[formConfirmCheckSelector]")){o=JC.f.parentSelector(r,r.attr("formConfirmCheckSelector"));if(!o||!o.length)return}else if(r.is("[formConfirmCheckCallback]")){o=window[r.attr("formConfirmCheckCallback")];if(o&&!o.call(i,r,e,s))return}}i.data(n.Model.SUBMIT_CONFIRM_BUTTON,r)}}),t(document).delegate("input[formResetConfirm], button[formResetConfirm]","click",function(e){var r=t(this),i=JC.f.getJqParent(r,"form");i&&i.length&&i.data(n.Model.RESET_CONFIRM_BUTTON,r)}),t(document).delegate("input[type=reset], button[type=reset]","click",function(e){var r=t(this),i=JC.f.getJqParent(r,"form");i&&i.length&&i.data(n.Model.GENERIC_RESET_BUTTON,r)}),t(document).delegate("input[type=submit], button[type=submit]","click",function(e){var r=t(this),i=JC.f.getJqParent(r,"form");i&&i.length&&i.data(n.Model.GENERIC_SUBMIT_BUTTON,r)}),t(document).delegate("input[buttonClickBindSelector], button[buttonClickBindSelector]","click",function(e){var n=t(this),r=JC.f.parentSelector(n,n.attr("buttonClickBindSelector"));if(!r||!r.length)return;r.val(n.val()||"")}),t(document).delegate("a[buttonReturnUrl], input[buttonReturnUrl], button[buttonReturnUrl]","click",function(e){var n=t(this),r=n.attr("buttonReturnUrl").trim(),i=n.is("[returnConfirm]")?n.attr("returnConfirm"):"",s=n.is("[popuptype]")?n.attr("popuptype"):"confirm",o=parseInt(n.is("[popupstatus]")?n.attr("popupstatus"):"2",10),u;if(!r)return;r=JC.f.urlDetect(r),n.prop("nodeName").toLowerCase()=="a"&&e.preventDefault();if(i){switch(s){case"dialog.confirm":u=JC.Dialog.confirm(i,o);break;default:u=JC.confirm(i,n,o)}u.on("confirm",function(){JC.f.reloadPage(r)})}else JC.f.reloadPage(r)}),n.frameTpl='<iframe src="about:blank" id="{0}" name="{0}" frameborder="0" class="BFLIframe" style="display:none;"></iframe>',t(document).ready(function(){setTimeout(function(){n.autoInit&&n.init(t(document))},1)})}(jQuery),Bizs.FormLogic})})(typeof define=="function"&&define.amd?define:function(e,t,n){typeof e=="function"&&(n=e),typeof t=="function"&&(n=t),n&&n()},window);