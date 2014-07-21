;(function(define, _win) { 'use strict'; define( [ 'JC.BaseMVC' ], function(){
/**
 * 组件用途简述
 *
 *  <p><b>require</b>:
 *      <a href='JC.BaseMVC.html'>JC.BaseMVC</a>
 *  </p>
 *
 *  <p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
 *      | <a href='http://jc2.openjavascript.org/docs_api/classes/JC.Cover.html' target='_blank'>API docs</a>
 *      | <a href='../../modules/JC.Cover/0.1/_demo' target='_blank'>demo link</a></p>
 *  
 *  <h2>页面只要引用本脚本, 默认会处理 div class="js_compCover"</h2>
 *
 *  <h2>可用的 HTML attribute</h2>
 *
 *  <dl>
 *      <dt>itemcol = int, default = 4</dt>
 *      <dd>设置一行可以容纳的基本格数量<dd>
 *      
 *      <dt>itemwidth = int, default = 70</dt>
 *      <dd>设置基本格宽度<dd>
 *
 *      <dt>borderwidth = int, default = 0</dt>
 *      <dd>设置基本格边框宽度，默认无边框<dd>
 *
 *      <dt>itemcnt = string, default = ""</dt>
 *      <dd>设置基本格内显示的内容，若 'showtype' 属性设置为 'img' 时，该字段表示图片链接的URL地址</dd>
 *
 *      <dt>covertitle = string, default = ""</dt>
 *      <dd>设置基本格遮罩显示的内容</dd>
 *
 *      <dt>showtype = string, default = 'title'</dt>
 *      <dd>设置基本格内展示的内容模式，可选项有：'title' 和 'img'</dd>
 *
 *      <dt>coverdir = int, default = 2</dt>
 *      <dd>设置遮罩出现的方向，可选项有：0-上、1-右、2-下、3-左</dd>
 *
 *      <dt>mod = int, default = 1</dt>
 *      <dd>设置遮罩显示模式，数值越大字号越大</dd>

 *  </dl> 
 *
 * @namespace   JC
 * @class       Cover
 * @extends     JC.BaseMVC
 * @constructor
 * @param   {selector|string}   _selector   
 * @version dev 0.1 2014-07-21
 * @author  pengjunkai <pengjunkai@360.cn> | 75 Team
 * @example
        <h2>Default:</h2>
        <div class="js_compCover" itemborder="1">
            <ul>
                <li itemcnt="习近平巴西国会演讲"></li>
                <li itemcnt="李克强听取企业意见"></li>
                <li itemcnt="副县长辞官"></li>
                <li itemcnt="古巨基结婚"></li>
                <li itemcnt="毛小兵被双开"></li>
                <li itemcnt="张田欣赵智勇降级"></li>
                <li itemcnt="MH17被击落"></li>
                <li itemcnt="北京暴雨"></li>
            </ul>
        </div>
        <h2>Custom Table Design:</h2>
        <div class="js_compCover" itemwidth="90" itemborder="2" itemcol="3">
            <ul>
                <li itemcnt="习近平巴西国会演讲"></li>
                <li itemcnt="李克强听取企业意见"></li>
                <li itemcnt="副县长辞官"></li>
                <li coverdir="3" itemcnt="古巨基结婚"></li>
                <li coverdir="3" itemcnt="毛小兵被双开"></li>
                <li coverdir="3" itemcnt="张田欣赵智勇降级"></li>
                <li coverdir="0" itemcnt="MH17被击落"></li>
                <li coverdir="0" itemcnt="北京暴雨"></li>
                <li coverdir="0" itemcnt="博导诱奸女生事件"></li>
            </ul>
        </div>
 */
    var _jdoc = $( document ), _jwin = $( window );

    JC.Cover = Cover;

    function Cover( _selector ){
        _selector && ( _selector = $( _selector ) );

        if( JC.BaseMVC.getInstance( _selector, Cover ) ) 
            return JC.BaseMVC.getInstance( _selector, Cover );

        JC.BaseMVC.getInstance( _selector, Cover, this );

        this._model = new Cover.Model( _selector );
        this._view = new Cover.View( this._model );

        this._init();

        //JC.log( Cover.Model._instanceName, 'all inited', new Date().getTime() );
    }
    /**
     * 初始化可识别的 Cover 实例
     * @method  init
     * @param   {selector}      _selector
     * @static
     * @return  {Array of CoverInstance}
     */
    Cover.init =
        function( _selector ){
            var _r = [];
            _selector = $( _selector || document );

            if( _selector.length ){
                if( _selector.hasClass( 'js_compCover' )  ) {
                    _r.push( new Cover( _selector ) );
                } else {
                    _selector.find( 'div.js_compCover' ).each( function() {
                        _r.push( new Cover( this ) );
                    });
                }
            }
            return _r;
        };

    JC.BaseMVC.build( Cover );

    JC.f.extendObject( Cover.prototype, {
        _beforeInit:
            function() {
            }

        , _initHanlderEvent:
            function() {
                var _p = this,
                    _model = _p._model,
                    _view = _p._view,
                    _selector = _model.selector();

                _p.on( 'inited', function() {
                });
                _selector.on( 'mouseover', function( e ) {
                    var cnt = $( e.target );
                    if( cnt.hasClass( _Model.COVER_CNT ) ){
                        _view.coverItem( cnt.next() );
                        _p.notification( _Model.COVERED, [ cnt.parent( '.' + _Model.COVER_BOX ) ] );
                    }
                } );
                _selector.on( 'mouseleave', 'li', function( e ) {
                    var target = $( e.target );
                    !target.is( 'li' ) && ( target = target.parent( '.' + _Model.COVER_BOX ) );
                    _view.coverBack( target.children( '.' + _Model.COVER_COVER ) );
                } );
                _selector.on( 'click', 'li', function( e ) {
                    var target = $( e.target );
                    !target.is( 'li' ) && ( target = target.parent( '.' + _Model.COVER_BOX ) );
                    _view.link( target );
                    _p.notification( _Model.CLICKED, [target] );
                } );
            }

        , _inited:
            function(){
                this.trigger( 'inited' );
            }
    });
    
    var _Model = Cover.Model;
    /* Var */
    _Model.COVER_CNT = 'cover-cnt';
    _Model.COVER_COVER = 'cover-cover';
    _Model.COVER_BOX = 'cover-box';
    _Model.COVER_BG = 'cover-itembg';
    _Model.COVER_MOD = 'cover-mod';
    _Model.ANIMATE_SPEED = 200;
    _Model._instanceName = 'JCCover';

    /* Event */

    /**
     * JC.Cover hover后遮罩遮挡后 selector 触发的事件
     * @event  coverCallback 
     * @param   {Event}         _evt
     * @param   {CoverInstance}  _coverIns
     * @example
    <pre>
    $( document ).delegate( "div.js_coverCoveredEvent", "coverCallback", function( _evt, _coverIns ) {
        JC.log( 'item covered' );
        JC.log( 'cover : ' + _coverIns.attr( 'covertitle' ) );
    } );
    </pre>
     */
    _Model.COVERED = 'coverCallback';

    /**
     * JC.Cover 点击后 selector 触发的事件
     * @event  clickCallback 
     * @param   {Event}         _evt
     * @param   {coverInstance}  _coverIns
     * @example
    <pre>
    $( document ).delegate( "div.js_coverClickedEvent", "clickCallback", function( _evt, _coverIns ) {
        JC.log( 'item clicked' );
        JC.log( 'click : ' + _coverIns.attr( 'covertitle' ) );
    } );
    </pre>
     */
    _Model.CLICKED = 'clickCallback';

    JC.f.extendObject( _Model.prototype, {
        init:
            function() {
            }
        , getItemCol:
            function() {
                return this.intProp( 'itemcol' ) || 4;
            }
        , getItemWidth:
            function() {
                return this.intProp( 'itemwidth' ) || 70;
            }
        , getItemMod:
            function( item ) {
                var itemCol = item.attr( 'mod' );
                return ( typeof itemCol == 'undefined' ) ? 1 : parseInt( itemCol );
            }
        , getShowType:
            function( item ) {
                var showType = item.attr( 'showtype' );
                return ( typeof showType == 'undefined' ) ? 'title' : showType;
            }
        , getItemCnt:
            function( item ) {
                var itemCnt = item.attr( 'itemcnt' );
                return ( typeof itemCnt == 'undefined' ) ? '' : itemCnt;
            }
        , getCoverTitle:
            function( item ) {
                var coverTitle = item.attr( 'covertitle' );
                return ( typeof coverTitle == 'undefined' ) ? '' : coverTitle;
            }
        , getCoverDir:
            function( item ) {
                var coverDir = item.attr( 'coverdir' );
                return ( typeof coverDir == 'undefined' ) ? 2 : parseInt( coverDir );
            }
        , getCntLink:
            function( item ) {
                var cntLink = item.attr( 'cntlink' );
                return ( typeof cntLink == 'undefined' ) ? '' : cntLink;
            }
        , getItemBorder:
            function() {
                return this.intProp( 'itemborder' ) || 0;
            }
        , getBoxCol:
            function( item ) {
                var boxCol = item.attr( 'boxcol' );
                return ( typeof boxCol == 'undefined' ) ? 1 : parseInt( boxCol ); 
            }
        , getBoxRow:
            function( item ) {
                var boxRow = item.attr( 'boxrow' );
                return ( typeof boxRow == 'undefined' ) ? 1 : parseInt( boxRow ); 
            }
    });

    JC.f.extendObject( Cover.View.prototype, {
        init:
            function() {
                var _p = this, item,
                    _model = _p._model,
                    _selector = _model.selector(),
                    itemwidth = _model.getItemWidth(),
                    itemCol = _model.getItemCol(),
                    border = _model.getItemBorder();
                _selector.css( 'width', itemCol * itemwidth + 'px' );
                $.each( _selector.find( 'li' ), function( i , element ) {
                    item = $( element );
                    var showType = _model.getShowType( item ),
                        itemCnt = _model.getItemCnt( item ),
                        coverDir = _model.getCoverDir( item ),
                        itemMod = _model.getItemMod( item ),
                        boxCol = _model.getBoxCol( item ),
                        boxRow = _model.getBoxRow( item ),
                        coverTitle = _model.getCoverTitle( item );
                    item.addClass( _Model.COVER_BOX + ' ' + _Model.COVER_MOD + itemMod )
                        .css( 'border-width', border + 'px' );
                    
                    var itemContent = '<button class=" {0} " style=" {1} ">{2}</button>',
                        itemCntStyle = JC.f.printf( 'width: {0}px; height: {1}px; ', 
                            boxCol * itemwidth - border * 2, boxRow * itemwidth - border * 2 ),
                        itemCntText = '';
                    if( showType == 'title' ) {
                        itemCntText = itemCnt;
                    } else if( showType == 'img' ) {
                        itemCntStyle += 'background: url( ' + itemCnt + ') no-repeat;';
                    }
                    itemContent = JC.f.printf( itemContent, _Model.COVER_CNT + ' ' + 
                        _Model.COVER_BG + ( ( i & 1 ) == 0 ? '1 ' : '2 ' ), itemCntStyle, itemCntText );
                    item.append( itemContent + '<button class="' + _Model.COVER_COVER + '">' + 
                        ( coverTitle == '' ? itemCnt : coverTitle ) + '</button>' );
                    _p.putCover( item.children( '.' + _Model.COVER_CNT ), coverDir );
                } );
            }
        /**
        * 初始化遮罩
        * @method  putCover
        * @param   {number}    target
        *          {number}    dir
        * @return  
        */
        , putCover: 
            function( target, dir ) {
                var width = target[ 0 ].offsetWidth,
                    height = target[ 0 ].offsetHeight,
                    cover = target.next(),
                    top, left;
                if( ( dir & 1 ) == 0 ) {
                    left = 0;
                    top = ( dir == 0 ) ? parseInt( '-' + height ) : height;
                } else {
                    top = 0;
                    left = ( dir == 1 ) ? width : parseInt( '-' + width );
                }
                cover.attr( 'covertop', top ).attr( 'coverleft', left )
                    .css( { 'top' : top + 'px', 'left' : left + 'px' } );
            }
        , coverItem:
            function( cover ) {
                cover.stop( false, true ).animate( { top : '0', left : '0' }, 
                    _Model.ANIMATE_SPEED );
            }
        , coverBack:
            function( cover ) {
                cover.stop( false, true ).animate( { top : cover.attr( 'covertop' ) + 'px',
                    left : cover.attr( 'coverleft' ) + 'px' }, _Model.ANIMATE_SPEED );
            }
        , link:
            function( target ) {
                var _p = this,
                    _model = _p._model,
                    link = _model.getCntLink( target );
                link != '' && window.open( link );
            }
    });

    _jdoc.ready( function(){
        var _insAr = 0;
        Cover.autoInit
              && ( _insAr = Cover.init() )
        //    && $( '<h2>Cover total ins: ' 
        //        + _insAr.length + '<br/>' + new Date().getTime() + '</h2>' ).appendTo( document.body )
            ;
    });

    return JC.Cover;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb ) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);
