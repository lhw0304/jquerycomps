;(function(define, _win) { 'use strict'; define( [ 'JC.BaseMVC' ], function(){
/**
 * Drag, Dragdrop 功能
 * <br />响应式初始化 [div|button].js_compDrag
 *
 *<p><b>require</b>:
 *   <a href="widnow.jQuery.html">jQuery</a>
 *   , <a href="JC.common.html">JC.common</a>
 *   , <a href='JC.BaseMVC.html'>JC.BaseMVC</a>
 *</p>
 *
 *<p><a href='https://github.com/openjavascript/jquerycomps' target='_blank'>JC Project Site</a>
 *   | <a href='http://jc2.openjavascript.org/docs_api/classes/JC.Drag.html' target='_blank'>API docs</a>
 *   | <a href='../../modules/JC.Drag/0.1/_demo' target='_blank'>demo link</a></p>
 *  
 *<h2>通用 HTML attribute</h2>
 *<dl>
 *    <dt>dragTarget = selector, default = self</dt>
 *    <dd>要拖动的 selector, 可以通过该属性指定拖动的父节点<dd>
 *
 *    <dt>dragIn = selector, default = window</dt>
 *    <dd>可拖动的范围</dd>
 *
 *    <dt>disableDrag = bool, default = false</dt>
 *    <dd>是否禁止拖动, 会执行实例初始化</dd>
 *
 *    <dt>ignoreDrog = bool, default = false</dt>
 *    <dd>是否忽略拖动, 不会执行实例初始化</dd>
 *</dl> 
 *
 *<h2>drop HTML attribute</h2>
 *<dl>
 *    <dt>dropFor = selector</dt>
 *    <dd>指定可拖放的 selector</dd>
 *
 *    <dt>dropSwap = bool, default = false</dt>
 *    <dd>
 *          是否交换拖曳的位置
 *          <br />为真, 交换 selector 的位置
 *          <br />不为真, 将 append 到目标 selector
 *    </dd>
 *</dl>
 *
 * @namespace   JC
 * @class       Drag
 * @extends     JC.BaseMVC
 * @constructor
 * @param   {selector|string}   _selector   
 * @version dev 0.1 2013-12-26
 * @author  qiushaowei <suches@btbtd.org> | 75 Team
 * @example
        <h2>JC.Drag 示例</h2>
 */
    JC.Drag = Drag;
    var _jdoc = $( document ), _jwin = $( window );

    function Drag( _selector ){
        _selector && ( _selector = $( _selector ) );

        if( JC.BaseMVC.getInstance( _selector, Drag ) ) 
            return JC.BaseMVC.getInstance( _selector, Drag );

        JC.BaseMVC.getInstance( _selector, Drag, this );

        this._model = new Drag.Model( _selector );
        this._view = new Drag.View( this._model );

        this._init();

        JC.log( Drag.Model._instanceName, 'inited', new Date().getTime() );
    }

    JC.BaseMVC.build( Drag );

    JC.f.extendObject( Drag.prototype, {
        _beforeInit:
            function(){
                //JC.log( 'Drag _beforeInit', new Date().getTime() );
            }

        , _initHanlderEvent:
            function(){
                var _p = this;

                _p.selector().on( 'mousedown', function( _evt, _srcEvt ){
                    _evt = _srcEvt || _evt;

                    if( _p._model.boolProp( Drag.Model.DISABLE_DRAG ) ) return;
                    if( _p._model.boolProp( Drag.Model.IGNORE_DRAG ) ) return;

                    Drag.cleanDragData();

                    if( _p._model.dragBeforeCb() 
                        && _p._model.dragBeforeCb().call( _p, _p._model.dragTarget(), _p.selector() ) === false 
                    ){
                        return;
                    }

                    _p.trigger( Drag.Model.DRAG_BEFORE );

                    _p._model.isDropFor() 
                        && ( 
                                _p._model.dropDragTarget( true )
                                , _p._model.dropFor( true )
                           );

                    Drag.dragInfo( _p, _evt );
                    _p.trigger( Drag.Model.DRAG_BEGIN, [ _evt, Drag.dragInfo() ] );

                    _jdoc.on( 'mouseup', Drag.defaultMouseUp );
                    _jdoc.on( 'mousemove', Drag.defaultMouseMove );
                    _jwin.on( 'scroll', Drag.defaultScroll );

                    return false;
                });

                //低版本 IE 拖曳时不选中文字
                _p.selector()[0].onselectstart = function(){ return false; };

                _p.on( Drag.Model.DRAG_BEFORE, function( _evt ){
                    JC.log( 'drag before', new Date().getTime() );
                });

                _p.on( Drag.Model.DRAG_BEGIN, function( _evt, _dragInfo ){
                    JC.log( 'drag begin', new Date().getTime() );

                    _p._model.dragTarget().css( 'z-index', window.ZINDEX_COUNT++ );

                    Drag.draggingItem( _p._model.dragTarget() );

                    _p._model.dragBeginCb() 
                        && _p._model.dragBeginCb().call( 
                            _p
                            , _p.selector()
                            , _p._model.dragTarget()
                            , _p._model.dropDragTarget() 
                        );
                });

                _p.on( Drag.Model.DRAG_DONE, function( _evt, _dragInfo ){
                    JC.log( 'drag done', new Date().getTime() );

                    _p._view.dropDone( _dragInfo );
                    _p._view.clean( _dragInfo );
                    _p._model.clean( _dragInfo );

                    Drag.draggingItem( null );

                    _p._model.dragDoneCb() 
                        && _p._model.dragDoneCb().call( 
                            _p
                            , _p.selector()
                            , _p._model.dragTarget() 
                        );

                    _p.trigger( Drag.Model.DRAG_AFTER );

                    Drag.cleanDragData();
                });

                _p.on( Drag.Model.DRAGGING_MOVING, function( _evt, _x, _y, _srcEvt, _offset ){
                    //JC.log( 'Drag.Model.DRAGGING_MOVING', new Date().getTime() );DRAG_MOVING
                    _p._model.dragMovingCb()
                        && _p._model.dragMovingCb().call(
                            _p
                            , _p.selector()
                            , _p.dragTarget()
                            , _p.dropDragTarget()
                            , _x
                            , _y
                            , _srcEvt
                        );
                });

                _p.on( Drag.Model.DRAG_AFTER, function( _evt ){
                    JC.log( 'drag after', new Date().getTime() );

                    _p._model.dragAfterCb() 
                        && _p._model.dragAfterCb().call( 
                            _p
                            , _p._model.dragTarget()
                            , _p.selector() 
                        );
                });

                _p.on( Drag.Model.TRIGGER_DRAG, function( _evt, _srcEvt ){
                    _p.selector().trigger( 'mousedown', [ _srcEvt || _evt ] );
                });
            }

        , _inited:
            function(){
                var _p = this;

                _p._model.defaultCSSPosition( _p._model.dragTarget().css( 'position' ) );
                _p._model.defaultCSSZIndex( _p._model.dragTarget().css( 'z-index' ) );
                _p._model.defaultCSSCursor( _p._model.dragTarget().css( 'cursor' ) );

                _p._model.dragTarget().css( { 'cursor': 'move' } );
                
                _p._model.dragInitedCb() 
                    && _p._model.dragInitedCb().call( _p, _p.selector(), _p.dragTarget() );
                /*
                JC.log( 'Drag _inited', new Date().getTime()
                        , _p._model.defaultCSSPosition() 
                        , _p._model.defaultCSSZIndex() 
                        );
                */
            }

        , dragTarget: function(){ return this._model.dragTarget(); }

        , dropDragTarget: function(){ return this._model.dropDragTarget(); }

        , dragIn: function(){ return this._model.dragIn(); }

        , _updatePosition: 
            function(){ 
                this._view.updatePosition.apply( this._view, JC.f.sliceArgs( arguments ) ); 
            }
    });
    /**
     * 初始化可识别的 Drag 实例
     * @method  init
     * @param   {selector}      _selector
     * @static
     * @return  {Array of DragInstance}
     */
    Drag.init =
        function( _selector ){
            var _r = [];
            _selector = $( _selector || document );

            if( _selector && _selector.length ){
                if( _selector.hasClass( 'js_compDrag' )  ){
                    !_selector.is( '[' + Drag.Model.IGNORE_DRAG + ']' ) && _r.push( new Drag( _selector ) );
                }else{
                    _selector.find( 'div.js_compDrag, button.js_compDrag' ).each( function(){
                        !_selector.is( '[' + Drag.Model.IGNORE_DRAG + ']' ) && _r.push( new Drag( this ) );
                    });
                }
            }
            return _r;
        };

    Drag.dragInfo =
        function( _ins, _evt ){
            if( _ins && _evt ){
                Drag._dragInfo = {
                    'ins': _ins
                    , 'evt': _evt
                    , 'offset': _ins._model.offset( _evt )
                };
            }
            return Drag._dragInfo;
        };
    Drag._dragInfo;

    Drag.draggingItem =
        function( _setter ){
            if( typeof _setter != 'undefined' ){
                Drag._draggingItem && Drag._draggingItem.data( Drag.Model.DRAGGING_ITEM, false );
                _setter && _setter.data( Drag.Model.DRAGGING_ITEM, true );

                Drag._draggingItem = _setter;
            }
            return Drag._draggingItem;
        };
    Drag._draggingItem;

    Drag.cleanDragData = 
        function(){ 
            _jdoc.off( 'mousemove', Drag.defaultMouseMove );
            _jdoc.off( 'mouseup', Drag.defaultMouseUp );
            _jwin.off( 'scroll', Drag.defaultScroll );

            Drag._dragInfo = null; 
            Drag.draggingItem( null );
        };

    Drag.defaultMouseMove =
        function( _evt ){
            if( !Drag.dragInfo() ) return;
            //JC.log( 'JC.Drag mousemove', new Date().getTime() );
            var _di = Drag.dragInfo()
                , _p = _di.ins
                , _offset = _di.offset
                , _newX, _newY
                ;
            if( !_p ) return;
            _newX = _evt.pageX - _offset.x;
            _newY = _evt.pageY - _offset.y;

            _newX <= _offset.minX && ( _newX = _offset.minX );
            _newY <= _offset.minY && ( _newY = _offset.minY );

            _newX >= _offset.maxX && ( _newX = _offset.maxX );
            _newY >= _offset.maxY && ( _newY = _offset.maxY );

            //JC.log( _newX, _newY, _offset.maxX, _offset.maxY );
            _p._updatePosition( _newX, _newY, _offset );
            _p.trigger( Drag.Model.DRAGGING_MOVING, [ _newX, _newY, _evt, _offset ] );
        };

    Drag.defaultMouseUp =
        function( _evt ){
            var _di = Drag.dragInfo();

            if( _di && _di.ins ){
                _di.ins.trigger( Drag.Model.DRAG_DONE, _di );
            }

            Drag.cleanDragData();
        };

    Drag.defaultScroll =
        function( _evt ){
            //
            /// 如果 dragIn 不是 window的时候, scrollTop 计算有问题
            //
            var _di = Drag.dragInfo();
            if( !( _di && _di.ins ) ) return;
            var _scrollX = _di.ins.dragIn().scrollLeft()
                , _scrollY = _di.ins.dragIn().scrollTop()
                , _offset = _di.ins.dropDragTarget().offset()
                , _newX, _newY
                , _fixScrollX = _scrollX - _di.offset.scrollX
                , _fixScrollY = _scrollY - _di.offset.scrollY
                ;

            _newX = _offset.left + _fixScrollX;
            _newY = _offset.top + _fixScrollY;

            //JC.log( _di.offset.scrollY, _scrollY, _offset.left, _newX, _offset.top, _newY );
            /*
            _di.ins.dropDragTarget().css({
                'left': _newX + 'px'
                , 'top': _newY + 'px'
            });
            */
            _di.ins._updatePosition( _newX, _newY, _offset );

            _di.offset.scrollX = _scrollX;
            _di.offset.scrollY = _scrollY;
            _di.offset.maxX += _fixScrollX;
            _di.offset.maxY += _fixScrollY;
        };

    Drag.Model._instanceName = 'JCDragIns';

    Drag.Model.DRAG_BEFORE = 'JCDragBefore';
    Drag.Model.DRAG_BEGIN = 'JCDragBegin';
    Drag.Model.DRAG_DONE = 'JCDragDone';
    Drag.Model.DRAG_AFTER = 'JCDragAfter';
    Drag.Model.TRIGGER_DRAG = 'JCTriggerDrag';
    Drag.Model.DRAGGING_ITEM = 'JCDraggingItem';
    Drag.Model.DRAGGING_MOVING= 'JCDraggingMoving';

    Drag.Model.DISABLE_DRAG = 'disableDrag';
    Drag.Model.DISABLE_DROP = 'disableDrop';
    Drag.Model.IGNORE_DRAG = 'ignoreDrog';

    Drag.Model.CLASS_CURRENT = 'JCCurrentDropBox';
    Drag.Model.CLASS_MOVING = 'JCMovingDropBox';

    JC.f.extendObject( Drag.Model.prototype, {
        init:
            function(){
                //JC.log( 'Drag.Model.init:', new Date().getTime() );
            }

        , defaultCSSPosition:
            function( _setter ){
                typeof _setter != 'undefined' && ( this._defaultCSSPosition = _setter );
                return this._defaultCSSPosition;
            }

        , defaultCSSZIndex:
            function( _setter ){
                typeof _setter != 'undefined' && ( this._defaultCSSZIndex = _setter );
                return this._defaultCSSZIndex;
            }

        , defaultCSSCursor:
            function( _setter ){
                typeof _setter != 'undefined' && ( this._defaultCSSCursor = _setter );
                return this._defaultCSSCursor;
            }

        , dragTarget:
            function(){
                var _p = this;
                if( !_p._dragTarget ){
                    _p._dragTarget = _p.selectorProp( 'dragTarget' );

                    !( _p._dragTarget && _p._dragTarget.length ) 
                        && ( _p._dragTarget = _p.selector() )
                        ;
                }
                return _p._dragTarget;
            }

        , dropDragTarget:
            function( _cleanCache ){
                var _p = this, _isDropFor = _p.isDropFor();

                if( _isDropFor && _cleanCache ){
                    _p._dropDragTarget && _p._dropDragTarget.remove();
                    _p._dropDragTarget = null;
                }

                if( !_p._dropDragTarget ){
                    _p._dropDragTarget = _p.dragTarget();

                    if( _isDropFor ){
                        var _offset = _p.dragTarget().offset();

                        _p._dropDragTarget = _p.dragTarget().clone();
                        _p._dropDragTarget.css( { 
                            'position': 'absolute'
                            , 'left': _offset.left + 'px'
                            , 'top': _offset.top + 'px'
                            , 'z-index': window.ZINDEX_COUNT++ 
                        } );
                        _p._dropDragTarget.attr( Drag.Model.DISABLE_DROP, true )
                            .attr( Drag.Model.IGNORE_DRAG, true )
                            .addClass( Drag.Model.CLASS_MOVING )
                            ;
                    }
                }

                _isDropFor 
                    && _cleanCache 
                    && _p.dragTarget().after( _p._dropDragTarget )
                    ;

                return _p._dropDragTarget;
            }

        , isDropFor: 
            function(){ 
                typeof this._isDropFor == 'undefined'
                    && ( this._isDropFor = this.is( '[dropFor]' ) && JC.f.parseBool( this.attrProp( 'dropFor' ) ) );
                return this._isDropFor;
            }

        , dropFor: 
            function( _cleanCache ){
                ( !this._dropFor == 'undefined' || _cleanCache )
                    && ( this._dropFor = this.selectorProp( 'dropFor' ) );
                return this._dropFor;
            }

        , dropSwap:
            function(){
                return this.boolProp( 'dropSwap' );
            }

        , selectedDropBox:
            function( _x, _y ){
                var _p = this, _dropFor = _p.dropFor(), _di = Drag.dragInfo();

                if( !_di ){ return null; }

                if( typeof _x != 'undefined' && typeof _y != 'undefined' && _dropFor && _dropFor.length ){
                    _p._selectedDropBox = null;

                    if( _dropFor && _dropFor.length ){
                        var _ls = []
                            , _srcRect = locationToRect( _x, _y, _di.offset.width, _di.offset.height )
                            ;

                        _dropFor.each( function(){
                            var _sp = $(this);

                            if( _sp.is( '[' + Drag.Model.DISABLE_DROP + ']' ) ) { return; }

                            var _offset = _sp.offset()
                                , _rect = locationToRect( _offset.left
                                                            , _offset.top
                                                            , _sp.prop( 'offsetWidth' )
                                                            , _sp.prop( 'offsetHeight' )
                                                        );

                            if( intersectRect( _srcRect, _rect ) ){
                                _rect.selector = _sp;
                                _ls.push( _rect );
                            }
                        });

                        if( _ls.length ){
                            var _findItem;
                            $.each( _ls, function( _ix, _rect ){
                                _rect.dist = pointDistance( rectToPoint( _srcRect ), rectToPoint( _rect ) );

                                //_rect.selector.html( JC.f.moneyFormat( _dist ) );

                                if( !_ix ){
                                    _findItem = _rect;
                                    return;
                                }
                                _rect.dist < _findItem.dist && ( _findItem = _rect );
                            });
                            this._selectedDropBox = _findItem.selector;
                        }else{
                            this._selectedDropBox = null;
                        }
                    }
                }
                return this._selectedDropBox;
            }

        , dragIn:
            function(){
                if( ! ( this._dragIn && this._dragIn.length ) ){
                    this._dragIn = this.selectorProp( 'dragIn' );
                    !( this._dragIn && this._dragIn.length )
                        && ( this._dragIn = $( window ) )
                        ;
                }
                return this._dragIn;
            }

        , offset:
            function( _evt ){
                var _p = this
                    , _toffset = _p.dragTarget().offset()
                    , _inoffset = _p.dragIn().offset()
                    , _r = {
                        'mouseX': _evt.pageX
                        , 'mouseY': _evt.pageY
                        , 'targetX': _toffset.left
                        , 'targetY': _toffset.top
                        , 'scrollX': _p.dragIn().scrollLeft()
                        , 'scrollY': _p.dragIn().scrollTop() 
                        , 'maxXFix': 0
                        , 'maxYFix': 0
                        , 'width': _p.dragTarget().prop( 'offsetWidth' )
                        , 'height': _p.dragTarget().prop( 'offsetHeight' )
                    }
                    ;

                    _r.x = _r.mouseX - _r.targetX;
                    _r.y = _r.mouseY - _r.targetY;

                    !_inoffset && ( _inoffset = { 'left': 0, 'top': 0 } , _r.maxXFix = 0, _r.maxYFix = 0 );
                    _r.minX = _inoffset.left;
                    _r.minY = _inoffset.top;

                    _r.maxX = _r.minX 
                                    + _p.dragIn().scrollLeft() 
                                    + _p.dragIn().width() 
                                    - _r.width
                                    - _r.maxXFix
                                    ;

                    _r.maxY = _r.minY 
                                    + _p.dragIn().scrollTop() 
                                    + _p.dragIn().height() 
                                    - _r.height
                                    - _r.maxYFix
                                    ;

                    //JC.log( [ _r.maxX, _r.maxY, _p.dragTarget().width(), _p.dragTarget().prop( 'offsetWidth' ) ] );

                return _r;
            }

        , dragInitedCb: function(){ return this.callbackProp( 'dragInitedCb' ) || Drag.dragInitedCb; }
        , dragBeforeCb: function(){ return this.callbackProp( 'dragBeforeCb' ) || Drag.dragBeforeCb; }
        , dragAfterCb: function(){ return this.callbackProp( 'dragAfterCb' ) || Drag.dragAfterCb; }
        , dragBeginCb: function(){ return this.callbackProp( 'dragBeginCb' ) || Drag.dragBeginCb; }
        , dragDoneCb: function(){ return this.callbackProp( 'dragDoneCb' ) || Drag.dragDoneCb; }
        , dropDoneCb: function(){ return this.callbackProp( 'dropDoneCb' ) || Drag.dropDoneCb; }
        , dragMovingCb: function(){ return this.callbackProp( 'dragMovingCb' ) || Drag.dragMovingCb; }
        , afterDropDoneCb: function(){ return this.callbackProp( 'afterDropDoneCb' ) || Drag.afterDropDoneCb; }

        , clean:
            function( _dragInfo ){
                var _p = this;
            }
    });

    JC.f.extendObject( Drag.View.prototype, {
        init:
            function(){
                //JC.log( 'Drag.View.init:', new Date().getTime() );
            }

        , updatePosition: 
            function( _x, _y ){
                var _p = this
                    , _dt = _p._model.dropDragTarget()
                    , _selectedDropBox
                    ;

                _dt.css({
                    'left': _x + 'px'
                    , 'top': _y + 'px'
                });

                if( _p._model.isDropFor() ){
                    _selectedDropBox = _p._model.selectedDropBox();
                    _selectedDropBox && _selectedDropBox.removeClass( Drag.Model.CLASS_CURRENT );
                    _selectedDropBox = _p._model.selectedDropBox( _x, _y );
                    _selectedDropBox && _selectedDropBox.addClass( Drag.Model.CLASS_CURRENT );
                }
            }

        , dropDone:
            function( _dragInfo ){
                var _p = this;

                if( _p._model.isDropFor() ){
                    var _selectedDropBox = _p._model.selectedDropBox();
                    if( !( _selectedDropBox && _selectedDropBox.length ) ) return;

                    if( _selectedDropBox.data( Drag.Model.DRAGGING_ITEM ) ) return;

                    if( _p._model.dropDoneCb() 
                            && _p._model.dropDoneCb().call( 
                                _p._model.selector()
                                , _p._model.dragTarget() 
                                , _selectedDropBox
                           ) === false
                    ){
                        return;
                    }

                    if( _p._model.dropSwap() ){
                        var _srcIpt = $( '<input type="hidden" />' )
                            , _targetIpt = _srcIpt.clone()
                            ;
                        _p._model.dragTarget().after( _srcIpt );
                        _selectedDropBox.after( _targetIpt );

                        _targetIpt.after( _p._model.dragTarget() );
                        _srcIpt.after( _selectedDropBox );

                        _srcIpt.remove();
                        _targetIpt.remove();
                    }else{
                        _p._model.dragTarget().appendTo( _selectedDropBox );
                    }

                    _p._model.afterDropDoneCb() 
                        && _p._model.afterDropDoneCb().call( 
                            _p._model.selector()
                            , _p._model.dragTarget() 
                            , _selectedDropBox
                        );
                }
            }

        , clean:
            function( _dragInfo ){
                var _p = this;

                if( _p._model.isDropFor() ){
                    _p._model.dropDragTarget() 
                        && _p._model.dropDragTarget().remove()
                        ;

                    _p._model.selectedDropBox() 
                        && _p._model.selectedDropBox().removeClass( Drag.Model.CLASS_CURRENT )
                        ;
                }
            }
    });
    /**
     * 判断两个矩形是否有交集
     */
    function intersectRect( r1, r2 ) {
        return !(
                    r2.left > r1.right || 
                    r2.right < r1.left || 
                    r2.top > r1.bottom ||
                    r2.bottom < r1.top
                );
    }

    function locationToRect( _x, _y, _width, _height ){
        var _offset, _r = {
            'left': _x
            , 'top': _y
            , 'right': _x + _width
            , 'bottom': _y + _height 
        };
        return _r;
    }

    function rectToPoint( _rect ){
        var _r = {
            'x': _rect.left + ( _rect.right - _rect.left ) / 2
            , 'y': _rect.top + ( _rect.bottom - _rect.top ) / 2
        };
        return _r;
    }

    function pointDistance( _p1, _p2 ){
        var _dx = _p2.x - _p1.x
            , _dy = _p2.y - _p1.y
            , _dist = Math.sqrt( _dx * _dx + _dy * _dy );
            ;
        return _dist;
    }

    /*
    $(document).ready( function(){
        var _insAr = 0;
        Drag.autoInit
            && ( _insAr = Drag.init() )
            ;
    });
    */

    _jdoc.delegate( 'div.js_compDrag, button.js_compDrag', 'mouseenter', function( _evt ){
        var _p = $( this ), _ins = JC.BaseMVC.getInstance( $(this), JC.Drag );
        if( _p.is( '[' + Drag.Model.IGNORE_DRAG + ']' ) ) return
        !_ins && ( _ins = new JC.Drag( _p ) ) && JC.BaseMVC.getInstance( _p, JC.Drag, _ins );
    });

    _jdoc.delegate( 'div.js_compDrag, button.js_compDrag', 'mousedown', function( _evt ){
        var _p = $( this ), _ins = JC.BaseMVC.getInstance( _p, Drag );
        if( _p.is( '[' + Drag.Model.IGNORE_DRAG + ']' ) ) return
        !_ins && ( _ins = new Drag( _p ) ) && _ins.trigger( Drag.Model.TRIGGER_DRAG, [ _evt ] );
        return false;
    });

    _jwin.on( 'resize', function( _evt ){
        Drag.cleanDragData();
    });

    return JC.Drag;
});}( typeof define === 'function' && define.amd ? define : 
        function ( _name, _require, _cb ) { 
            typeof _name == 'function' && ( _cb = _name );
            typeof _require == 'function' && ( _cb = _require ); 
            _cb && _cb(); 
        }
        , window
    )
);
