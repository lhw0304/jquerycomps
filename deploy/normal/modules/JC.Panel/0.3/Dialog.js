(function(e,t){e("JC.Dialog",["JC.Panel.default"],function(){var e=!!window.ActiveXObject&&!window.XMLHttpRequest,t=window.Dialog=JC.Dialog=function(e,t,r,i){n.timeout&&clearTimeout(n.timeout);var s;return(s=JC.Panel.getInstance(e))?(n.timeout=setTimeout(function(){s.show(0)},n.showMs),s):(JC.Dialog.MULTI_MASK||n.dialogIdentifier(),s=new JC.Panel(e,t,r,i),n.dialogIdentifier(s),n.showMask(),s.selector().css("z-index",window.ZINDEX_COUNT++),!s.selector().is("[panelclickclose]")&&s.selector().attr("panelclickclose",!1),s.on("close_default",function(e,t){n.hideMask()}),s.on("hide_default",function(e,t){n.hideMask()}),s.on("show_default",function(e,t){n.showMask(),setTimeout(function(){n.showMask(),s.selector().css({"z-index":window.ZINDEX_COUNT,display:"block"}),window.ZINDEX_COUNT+=2},1)}),window.ZINDEX_COUNT++,n.timeout=setTimeout(function(){s.show(0)},n.showMs),s)};t.DISPLAY_LIST=[],JC.Dialog.MULTI_MASK=!0,JC.Dialog.mask=function(e){!e&&n.showMask(),e&&n.hideMask()};var n={dialogIdentifier:function(e){e?(e.selector().addClass("UPanelDialog_identifer"),e.selector().data("DialogInstance",e),t.DISPLAY_LIST.push(e)):(n.hideMask(),$("body > div.UPanelDialog_identifer").each(function(){var e=$(this),t=Panel.getInstance(e);if(!t)return;t.hide(),t.close()}),$("body > div.UPanel_TMP").remove())},hideMask:function(){var e,n;if(!JC.Dialog.MULTI_MASK){e=$("#UPanelMask"),n=$("#UPanelMaskIfrmae"),e.length&&e.hide(),n.length&&n.hide();return}JC.f.safeTimeout(function(){e=$("#UPanelMask"),n=$("#UPanelMaskIfrmae");var r,i=1,s,o;if(!e.length&&!n.length)return;for(var u=t.DISPLAY_LIST.length-1;u>=0;u--){var a=t.DISPLAY_LIST[u];if(a&&a.selector()&&a.selector().parent().length&&a.selector().is(":visible")&&a.selector().offset().left>=-10){r=a;break}}r?(s=r.selector().css("z-index")||0,o=s-1,o>0?(e.length&&e.css({"z-index":o}),n.length&&n.css({"z-index":o})):(e.length&&e.hide(),n.length&&n.hide())):(e.length&&e.hide(),n.length&&n.hide())},null,"JC.Dialogasdfaweasdfase",1)},showMask:function(){var e=$("#UPanelMask"),t=$("#UPanelMaskIfrmae");e.length||($(n.tpls.mask).appendTo("body"),e=$("#UPanelMask"),t=$("#UPanelMaskIfrmae")),t.show(),e.show(),n.setMaskSizeForIe6(),t.css("z-index",window.ZINDEX_COUNT++),e.css("z-index",window.ZINDEX_COUNT++)},timeout:null,showMs:10,setMaskSizeForIe6:function(){var e=$("#UPanelMask"),t=$("#UPanelMaskIfrmae");if(!e.length||!t.length)return;var n={position:"absolute",top:"0px",left:$(document).scrollLeft()+"px",height:$(document).height()+"px",width:$(window).width()+"px"};e.css(n),t.css(n)},tpls:{mask:['<div id="UPanelMask" class="UPanelMask"></div>','<iframe src="about:blank" id="UPanelMaskIfrmae"',' frameborder="0" class="UPanelMaskIframe"></iframe>'].join("")}};return $(window).on("resize scroll",function(e){$("body > div.UPanelDialog_identifer").each(function(){var t=$(this);if(t.data("DialogInstance")){if(!t.data("DialogInstance").selector().is(":visible"))return;e.type.toLowerCase()=="resize"&&t.data("DialogInstance").center(),n.setMaskSizeForIe6()}})}),JC.Dialog})})(typeof define=="function"&&define.amd?define:function(e,t,n){typeof e=="function"&&(n=e),typeof t=="function"&&(n=t),n&&n()},window);