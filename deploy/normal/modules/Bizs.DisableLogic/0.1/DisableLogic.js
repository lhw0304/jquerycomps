(function(e,t){e(["JC.BaseMVC"],function(){return function(e){function t(e){if(t.getInstance(e))return t.getInstance(e);t.getInstance(e,this),JC.log("Bizs.DisableLogic:",(new Date).getTime()),this._model=new n(e),this._view=new r(this._model),this._init()}function n(e){this._selector=e}function r(e){this._model=e}window.Bizs=window.Bizs||{},window.Bizs.DisableLogic=t,t.prototype={_init:function(){var t=this,n;return t._initHandlerEvent(),e([t._view,t._model]).on("BindEvent",function(e,n,r){t.on(n,r)}),e([t._view,t._model]).on("TriggerEvent",function(e,n){var r=JC.f.sliceArgs(arguments).slice(2);t.trigger(n,r)}),t._model.init(),t._view.init(),t._model.dltrigger().on("change",function(e){JC.log("dltrigger change",(new Date).getTime()),t._view.change(this)}),(n=t._model.dltrigger(!0))&&n.trigger("change"),t},_initHandlerEvent:function(){var e=this;e.on("DisableItem",function(t,n){e._model.dldisablecallback()&&e._model.dldisablecallback().call(e,n,e._model.selector())}),e.on("EnableItem",function(t,n){e._model.dlenablecallback()&&e._model.dlenablecallback().call(e,n,e._model.selector())}),e.on("ChangeDone",function(t,n){e._model.dldonecallback()&&e._model.dldonecallback().call(e,n,e._model.selector())})},selector:function(){return this._model.selector()},on:function(t,n){return e(this).on(t,n),this},trigger:function(t,n){return e(this).trigger(t,n),this}},t.getInstance=function(t,n){typeof t=="string"&&!/</.test(t)&&(t=e(t));if(!t||!t.length||typeof t=="string")return;return typeof n!="undefined"&&t.data("DisableLogicIns",n),t.data("DisableLogicIns")},t.doneCallback=null,t.enableCallback=null,t.disableCallback=null,t.init=function(n){n=e(n||document),n.find(["div.js_bizsDisableLogic","dl.js_bizsDisableLogic","table.js_bizsDisableLogic"].join()).each(function(){new t(e(this))})},n.prototype={init:function(){return this},selector:function(){return this._selector},dltrigger:function(t){var n=this,r=JC.f.parentSelector(this.selector(),this.selector().attr("dltrigger")),i;return t&&r.each(function(){i=e(this);if(i.prop("checked")||i.prop("selected"))return r=i,!1}),r},dltarget:function(t){var n=this,r,i;return n.selector().attr("dltarget")&&(r=JC.f.parentSelector(n.selector(),n.selector().attr("dltarget"))),t&&(t=e(t)).length&&t.attr("dltrigger")&&(r=JC.f.parentSelector(t,t.attr("dltarget"))),r},dldisable:function(t){var n=!1;return t&&(t=e(t)).length&&t.is("[dldisable]")&&(n=JC.f.parseBool(t.attr("dldisable"))),t.prop("nodeName").toLowerCase()=="input"&&t.attr("type").toLowerCase()=="checkbox"&&(n=!t.prop("checked")),n},dldisplay:function(t){var n=!1;return t.is("[dldisplay]")?(t=e(t)).length&&t.is("[dldisplay]")&&(n=JC.f.parseBool(t.attr("dldisplay"))):(t=e(t)).length&&t.is("[dldisable]")&&(n=!JC.f.parseBool(t.attr("dldisable"))),t.prop("nodeName").toLowerCase()=="input"&&t.attr("type").toLowerCase()=="checkbox"&&(n=t.prop("checked")),n},dlhidetarget:function(t){var n=this,r,i;return n.selector().attr("dlhidetarget")&&(r=JC.f.parentSelector(n.selector(),n.selector().attr("dlhidetarget"))),t&&(t=e(t)).length&&t.attr("dlhidetarget")&&(r=JC.f.parentSelector(t,t.attr("dlhidetarget"))),r},dlhidetoggle:function(e){var t;return e&&e.is("[dlhidetoggle]")&&(t=JC.f.parseBool(e.attr("dlhidetoggle"))),t},dldonecallback:function(){var e=t.doneCallback,n;return this.selector()&&(n=this.selector().attr("dldonecallback"))&&(n=window[n])&&(e=n),e},dlenablecallback:function(){var e=t.enableCallback,n;return this.selector()&&(n=this.selector().attr("dlenablecallback"))&&(n=window[n])&&(e=n),e},dldisablecallback:function(){var e=t.disableCallback,n;return this.selector()&&(n=this.selector().attr("dldisablecallback"))&&(n=window[n])&&(e=n),e}},r.prototype={init:function(){return this},change:function(t){t&&(t=e(t));if(!(t&&t.length&&t.is(":visible")))return;var n=this,r=n._model.dldisable(t),i=n._model.dltarget(t),s=n._model.dldisplay(t),o=n._model.dlhidetarget(t);if(t.is("[dlhidetargetsub]")){var u=JC.f.parentSelector(t,t.attr("dlhidetargetsub"));u&&u.length&&(t.prop("checked")?u.show():u.hide())}i&&i.length&&i.each(function(){var t=e(this);t.attr("disabled",r),JC.Valid&&JC.Valid.setValid(t);if(t.is("[dlhidetargetsub]")){var n=JC.f.parentSelector(t,t.attr("dlhidetargetsub"));if(!n||!n.length)return;r?n.hide():t.prop("checked")?n.show():n.hide()}}),o&&o.length&&o.each(function(){var t=n._model.dlhidetoggle(e(this))?!s:s;t?e(this).show():e(this).hide()}),r?e(n).trigger("TriggerEvent",["DisableItem",t]):e(n).trigger("TriggerEvent",["EnableItem",t]),e(n).trigger("TriggerEvent",["ChangeDone",t]),JC.log("DisableLogic view change",(new Date).getTime(),r)}},e(document).ready(function(){setTimeout(function(){t.init()},10)})}(jQuery),Bizs.DisableLogic})})(typeof define=="function"&&define.amd?define:function(e,t,n){typeof e=="function"&&(n=e),typeof t=="function"&&(n=t),n&&n()},window);