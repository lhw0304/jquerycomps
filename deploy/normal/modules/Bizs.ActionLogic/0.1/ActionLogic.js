(function(e,t){e(["JC.BaseMVC","JC.Panel"],function(){return function(t){function n(e){e&&(e=t(e));if(n.getInstance(e))return n.getInstance(e);n.getInstance(e,this),this._model=new n.Model(e),this._view=new n.View(this._model),this._init()}window.Bizs=window.Bizs||{},window.Bizs.ActionLogic=n,!e.amd&&JC.use&&!JC.Panel&&JC.use("Panel"),n.getInstance=function(e,n){typeof e=="string"&&!/</.test(e)&&(e=t(e));if(!e||!e.length||typeof e=="string")return;return typeof n!="undefined"&&e.data("ActionLogicIns",n),e.data("ActionLogicIns")},n.isActionLogic=function(e){var n;return e&&(e=t(e)).length&&(n=e.is("[baltype]")),n},n.init=function(e){e&&t(e).find(["a.js_bizsActionLogic","input.js_bizsActionLogic","button.js_bizsActionLogic"].join()).on("click",function(e){var r=t(this);n.process(r)&&r.prop("nodeName").toLowerCase()=="a"&&e.preventDefault()})},n.process=function(e){e=t(e);if(!e||!e.length)return null;if(!n.isActionLogic(e))return;var r=n.getInstance(e);return!r&&(r=new n(e)),r&&r.process(),r},n.random=!0,n.prototype={_beforeInit:function(){},_initHanlderEvent:function(){var e=this;e.on("StaticPanel",function(t,n){e.trigger("ShowPanel",[JC.f.scriptContent(n)])}),e.on(n.Model.SHOW_PANEL,function(t,n){var r=JC.Dialog(n);r.on("confirm",function(){return e._model.balCallback()&&e._model.balCallback().call(e._model.selector(),r,e)?!0:!1})}),e.on("AjaxPanel",function(r,i,s){if(!i||!s)return;e._model.balRandom()&&(s=JC.f.addUrlParams(s,{rnd:(new Date).getTime()})),t.get(s).done(function(r){switch(i){case n.Model.SHOW_PANEL:e.trigger("ShowPanel",[r]);break;case n.Model.DATA_PANEL:try{r=t.parseJSON(r)}catch(s){}r&&(r.errorno?e.trigger("ShowError",[r.errmsg||"操作失败, 请重试!",1]):e.trigger("ShowPanel",[r.data]))}})}),e.on("Go",function(t,n){if(!n)return;e._model.balRandom()&&(n=JC.f.addUrlParams(n,{rnd:(new Date).getTime()})),JC.f.reloadPage(n)}),e.on("AjaxAction",function(n,r){if(!r)return;e._model.balRandom()&&(r=JC.f.addUrlParams(r,{rnd:(new Date).getTime()})),t.get(r).done(function(n){try{n=t.parseJSON(n)}catch(r){}e._model.balCallback()?e._model.balCallback().call(e.selector(),n,e):n&&"errorno"in n?n.errorno?e.trigger("ShowError",[n.errmsg||"操作失败, 请重试!",1]):e.trigger("ShowSuccess",[n.errmsg||"操作完成",function(){e._model.balDoneUrl()&&JC.f.reloadPage(e._model.balDoneUrl()||location.href)}]):JC.Dialog.alert(n,1)})}),e.on("ShowError",function(t,n,r,i){var s;switch(e._model.balErrorPopupType()){case"alert":s=JC.alert(n,e._model.selector(),r||1),i&&s.on("confirm",function(){i()});break;case"msgbox":s=JC.msgbox(n,e._model.selector(),r||1),i&&s.on("close",function(){i()});break;case"dialog.msgbox":s=JC.Dialog.msgbox(n,r||1),i&&s.on("close",function(){i()});break;default:s=JC.Dialog.alert(n,r||1),i&&s.on("confirm",function(){i()})}}),e.on("ShowConfirm",function(t,n,r,i){var s;switch(e._model.balConfirmPopupType()){case"dialog.confirm":s=JC.Dialog.confirm(n,r||1),i&&s.on("confirm",function(){i()});break;default:s=JC.confirm(n,e._model.selector(),r||1),i&&s.on("confirm",function(){i()})}}),e.on("ShowSuccess",function(t,n,r){var i;switch(e._model.balSuccessPopupType()){case"alert":i=JC.alert(n,e._model.selector()),r&&i.on("confirm",function(){r()});break;case"dialog.alert":i=JC.Dialog.alert(n),r&&i.on("confirm",function(){r()});break;case"dialog.msgbox":i=JC.Dialog.msgbox(n),r&&i.on("close",function(){r()});break;default:i=JC.msgbox(n,e.selector()),r&&i.on("close",function(){r()})}})},process:function(){var e=this;JC.hideAllPopup(1);switch(e._model.baltype()){case"panel":e._model.is("[balPanelTpl]")?e.trigger("StaticPanel",[e._model.balPanelTpl()]):e._model.is("[balAjaxHtml]")?e.trigger("AjaxPanel",[n.Model.SHOW_PANEL,e._model.balAjaxHtml()]):e._model.is("[balAjaxData]")&&e.trigger("AjaxPanel",[n.Model.DATA_PANEL,e._model.balAjaxData()]);break;case"link":e._model.is("[balConfirmMsg]")?e.trigger("ShowConfirm",[e._model.balConfirmMsg(),2,function(){e.trigger("Go",e._model.balUrl())}]):e.trigger("Go",e._model.balUrl());break;case"ajaxaction":if(e._model.is("[balConfirmMsg]")){var t=JC.confirm(e._model.balConfirmMsg(),e.selector(),2);t.on("confirm",function(){e.trigger("AjaxAction",e._model.balUrl())})}else e.trigger("AjaxAction",e._model.balUrl())}return this}},JC.BaseMVC.buildModel(n),n.Model.SHOW_PANEL="ShowPanel",n.Model.DATA_PANEL="DataPanel",n.Model.prototype={init:function(){},baltype:function(){return this.stringProp("baltype")},balPanelTpl:function(){var e,t=this;return e=t.selectorProp("balPanelTpl")||e,e},balCallback:function(){var e,t=this;return e=t.callbackProp("balCallback")||e,e},balAjaxHtml:function(){return this.selector().attr("balAjaxHtml")},balAjaxData:function(){return this.selector().attr("balAjaxData")},balRandom:function(){var e=n.random,t=this;return t.is("[balRandom]")&&(e=JC.f.parseBool(t.stringProp("balRandom"))),e},balUrl:function(){var e="?",t=this;return t.selector().prop("nodeName").toLowerCase()=="a"&&(e=t.selector().attr("href")),t.is("[balUrl]")&&(e=t.selector().attr("balUrl")),JC.f.urlDetect(e)},balDoneUrl:function(){var e=this.attrProp("balDoneUrl");return JC.f.urlDetect(e)},balConfirmMsg:function(){var e="确定要执行吗?";return e=this.selector().attr("balConfirmMsg")||e,e},balErrorPopupType:function(){var e=this.stringProp("balErrorPopupType")||"dialog";return e},balSuccessPopupType:function(){var e=this.stringProp("balSuccessPopupType")||"msgbox";return e},balConfirmPopupType:function(){var e=this.stringProp("balConfirmPopupType")||"confirm";return e}},JC.BaseMVC.buildView(n),n.View.prototype={init:function(){}},JC.BaseMVC.build(n),t(document).ready(function(){t(document).delegate(["a.js_bizsActionLogic","input.js_bizsActionLogic","button.js_bizsActionLogic"].join(),"click",function(e){var r=t(this);n.process(r)&&r.prop("nodeName").toLowerCase()=="a"&&e.preventDefault()})})}(jQuery),Bizs.ActionLogic})})(typeof define=="function"&&define.amd?define:function(e,t,n){typeof e=="function"&&(n=e),typeof t=="function"&&(n=t),n&&n()},window);