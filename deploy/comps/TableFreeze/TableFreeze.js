(function(b,a){b(["JC.BaseMVC"],function(){JC.TableFreeze=c;function c(d){d&&(d=$(d));if(c.getInstance(d)){return c.getInstance(d)}c.getInstance(d,this);this._model=new c.Model(d);this._view=new c.View(this._model);this._init()}c.getInstance=function(d,e){if(typeof d=="string"&&!/</.test(d)){d=$(d)}if(!(d&&d.length)||(typeof d=="string")){return}typeof e!="undefined"&&d.data(c.Model._instanceName,e);return d.data(c.Model._instanceName)};c.init=function(d){var e=[];d=$(d||document);if(d.length){if(d.hasClass("js_compTableFreeze")){e.push(new c(d))}else{d.find("div.js_compTableFreeze").each(function(){e.push(new c(this))})}}return e};BaseMVC.build(c);JC.f.extendObject(c.prototype,{_beforeInit:function(){var d=this,e=d._model.selector().find(">table");d._model.alternateClass()&&(e.find(">tbody>tr:odd").addClass(d._model.alternateClass()));c.Model.sourceTable=e.clone();c.Model.colnumWidth=d._model.colnumWidth(e);d._model.needProcess()&&e.detach();c.Model.initWidth=d._model.selector().width()},_initHanlderEvent:function(){var d=this,e;d._model.beforeCreateTableCallback()&&d._model.beforeCreateTableCallback().call(d,d.selector());d._view.update();d._model.afterCreateTableCallback()&&d._model.afterCreateTableCallback().call(d,d.selector());if(d._model.needHoverClass()){d._model.selector().addClass("needHoverClass");if(d._model.needProcess()){e="compTFHover";$(document).delegate("tbody .CTF","mouseenter",function(){var g=$(this),h="tbody ."+g.attr("data-ctf"),f=g.parents(".js_compTableFreeze").find(h);f.addClass(e).attr("status","1")}).delegate("tbody .CTF","mouseleave",function(){var g=$(this),h="tbody ."+g.attr("data-ctf"),f=g.parents(".js_compTableFreeze").find(h);f.removeClass(e)})}}},_inited:function(){},update:function(){var d=this,f=d._model.selector(),g=f.width(),e=f.find(".js-fixed-table>table>thead>tr,.js-fixed-table>table>tbody>tr,.js-roll-table>table>thead>tr,.js-roll-table>table>tbody>tr");(g>c.Model.tempWidth)&&e.height("auto");d._view.fixHeight()}});c.Model._instanceName="TableFreeze";c.Model.sourceTable="";c.Model.colnumWidth=[];c.Model.initWidth=0;c.Model.tempWidth=c.Model.initWidth;JC.f.extendObject(c.Model.prototype,{init:function(){},freezeType:function(){var d=this.stringProp("freezeType")||"prev";!(d==="prev"||d==="both"||d==="last")&&(d="prev");return d},freezeCols:function(){var d=this,g=d.attrProp("freezeCols"),e=d.freezeType(),f=[];if(!g){(e!=="both")&&(g=1);(e==="both")&&(g=[1,1]);return g}f=g.split(",");f[0]=+f[0];f[1]=+f[1];if(e==="both"){if(f[0]===0&&f[1]===0){g=0}else{g=f.slice()}}else{g=f[0]}return g},scrollWidth:function(){var d=this.attrProp("scrollWidth");!d&&(d="120%");return d},needHoverClass:function(){var d=this.boolProp("needHoverClass");(typeof d==="undefined")&&(d=true);return d},alternateClass:function(){var d=this.attrProp("alternateClass");return d},colnum:function(){var e=c.Model.sourceTable,d=e.find("tr:eq(0)"),f=d.find(">th, >td"),g=f.length;f.each(function(){var h=$(this),i=h.prop("colspan");(h.prop("colspan"))&&(g+=(i-1))});return g},colnumWidth:function(e){var d=e.find("tr:eq(0)"),f=d.find(">th, >td"),g=[];f.each(function(){g.push($(this).prop("offsetWidth"))});return g},trElement:function(d){var e=d.find(">thead"),g=d.find(">tbody"),f,h;if(e.length){f=e.find(">tr")}else{f=d.find(">tr:eq(0)")}if(g.length){h=g.find(">tr")}else{h=d.find(">tr:gt(0)")}return{theadTr:f,tbodyTr:h}},needProcess:function(){var d=this,h=d.freezeCols(),g=d.freezeType(),f=d.selector(),e=c.Model.sourceTable,i=true;if(e.find("tr").length===0){return false}if(h===0){f.css("overflow-x","scroll").find(">table").css("width",d.scrollWidth());return false}if(g==="both"&&(h[0]+h[1]>=d.colnum())){return false}return i},layout:function(e){var d,h,g="",f;switch(e){case"last":d="js-roll-table compTFLastRoll";h="js-fixed-table compTFLastFixed";break;case"both":d="js-fixed-table compTFBothFixed";h="js-fixed-table compTFBothFixed";g="js-roll-table compTFBothRoll";break;case"prev":default:d="js-fixed-table compTFPrevFixed";h="js-roll-table compTFPrevRoll"}if(!g){f='<div class="'+d+'"><table><thead>{0}</thead><tbody>{1}</tbody></table></div><div class="'+h+'"><table><thead>{2}</thead><tbody>{3}</tbody></table></div>'}else{f='<div class="'+d+'"><table><thead>{0}</thead><tbody>{1}</tbody></table></div><div class="'+g+'"><table><thead>{2}</thead><tbody>{3}</tbody></table></div><div class="'+h+'"><table><thead>{4}</thead><tbody>{5}</tbody></table></div>'}return f},creatTpl:function(){var d=this,e=c.Model.sourceTable,j=d.freezeType(),k=d.freezeCols(),i=d.colnum(),m=d.trElement(e),f=m.theadTr,g=m.tbodyTr,h=d.getTr(j,k,f,i),n=d.getTr(j,k,g,i),o=d.layout(j),l;switch(j){case"both":l=JC.f.printf(o,h.leftTr,n.leftTr,h.midTr,n.midTr,h.rightTr,n.rightTr);break;case"last":case"prev":l=JC.f.printf(o,h.leftTr,n.leftTr,h.rightTr,n.rightTr);break}d.selector().append(l)},getTr:function(i,j,l,h){var d=[],e=[],m=[],k,f=0,g=j;l.each(function(v){var s=$(this),r="CTF CTF"+v,n=s[0].cloneNode(false),w=s[0].cloneNode(false),q=s.find(">td"),u="",t,p,o;switch(i){case"both":u=s[0].cloneNode(false);g=j[0];t=s.find(">th,>td").slice(f,g).appendTo(n);p=s.find(">th,>td").slice(h-g-j[1],h).appendTo(w);o=s.find(">th,>td").appendTo(u);break;case"last":g=h-j;t=s.find(">th,>td").slice(f,g).appendTo(n);p=s.find(">th,>td").appendTo(w);break;case"prev":t=s.find(">th,>td").slice(f,g).appendTo(n);p=s.find(">th,>td").appendTo(w);break}$(n).addClass(r).attr("data-ctf","CTF"+v);$(u).addClass(r).attr("data-ctf","CTF"+v);$(w).addClass(r).attr("data-ctf","CTF"+v);d.push(n.outerHTML);e.push(u.outerHTML);m.push(w.outerHTML)});k={leftTr:d.join(" "),midTr:e.join(" "),rightTr:m.join(" ")};return k},getSum:function(e){var f=1,d=e.length;while(d--){f+=e.pop()}return f},beforeCreateTableCallback:function(){var d=this,e=d.selector(),f="beforeCreateTableCallback";return d.callbackProp(e,f)},afterCreateTableCallback:function(){var d=this,e=d.selector(),f="afterCreateTableCallback";return d.callbackProp(e,f)}});JC.f.extendObject(c.View.prototype,{init:function(){},update:function(){var d=this,e=d._model.selector(),f=d._model.needProcess();if(f){d._model.creatTpl();d.fixWidth();d.fixHeight()}},fixWidth:function(){var d=this,f=d.selector(),k=d._model.freezeType(),n=d._model.freezeCols(),m=c.Model.initWidth,j=d._model.scrollWidth(),g=c.Model.colnumWidth,i=g.length,h,l,e;switch(k){case"prev":h=d._model.getSum(g.slice(0,n));l=m-h;f.find(">.js-fixed-table").width(h/m*100+"%").end().find(">.js-roll-table").width(l/m*100+"%").find(">table").width(j);break;case"last":l=d._model.getSum(g.slice(i-n,i));h=m-l-1;f.find(">.js-fixed-table").width(l/m*100+"%").end().find(">.js-roll-table").width(h/m*100+"%").find(">table").width(j);break;case"both":h=d._model.getSum(g.slice(0,n[0]));l=d._model.getSum(g.slice(i-n[1],i));e=m-h-l;f.find(">.js-fixed-table:eq(0)").width(h/m*100+"%").end().find(">.js-roll-table").width(e/m*100+"%").find(">table").width(j).end().end().find(">.js-fixed-table:eq(1)").width(l/m*100+"%");break}},fixHeight:function(){var d=this,f=d._model.selector(),g=f.find(">.js-fixed-table:eq(0)>table>thead>tr, >.js-fixed-table:eq(0)>table>tbody>tr"),i=f.find(">.js-roll-table>table>thead>tr,>.js-roll-table>table>tbody>tr"),h=f.find(">.js-fixed-table:eq(1)>table>thead>tr, >.js-fixed-table:eq(1)>table>tbody>tr"),e=d._model.freezeType();g.each(function(n,m){var k=$(this),j=i.eq(n),o=h.eq(n),l=Math.max(k.prop("offsetHeight"),j.prop("offsetHeight"));if(e==="both"){l=Math.max(l,o.prop("offsetHeight"));o.height(l)}k.height(l);j.height(l)});return},highlight:function(){console.log("highlight")}});$(document).ready(function(){var e=0,f=$(window);c.autoInit&&(e=c.init());f.on("resize",d);function d(){f.off("resize",d);$("div.js_compTableFreeze").each(function(){var g=c.getInstance($(this));g&&g.update();c.Model.tempWidth=g._model.selector().prop("offsetWidth")});f.data("CTFResizeTimeout")&&clearTimeout(f.data("CTFResizeTimeout"));f.data("CTFResizeTimeout",setTimeout(function(){f.off("resize",d);f.on("resize",d)},80))}});return JC.TableFreeze})}(typeof define==="function"&&define.amd?define:function(b,a,c){typeof b=="function"&&(c=b);typeof a=="function"&&(c=a);c&&c()},window));