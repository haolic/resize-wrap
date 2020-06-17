'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Resize = function Resize(props) {
  var _props$leftMinWidth = props.leftMinWidth,
      leftMinWidth = _props$leftMinWidth === undefined ? 0 : _props$leftMinWidth,
      _props$rightMinWidth = props.rightMinWidth,
      rightMinWidth = _props$rightMinWidth === undefined ? 0 : _props$rightMinWidth,
      _props$height = props.height,
      height = _props$height === undefined ? 600 : _props$height,
      _props$width = props.width,
      width = _props$width === undefined ? 800 : _props$width,
      _props$leftPart = props.leftPart,
      leftPart = _props$leftPart === undefined ? _react2.default.createElement('div', null) : _props$leftPart,
      _props$rightPart = props.rightPart,
      rightPart = _props$rightPart === undefined ? _react2.default.createElement('div', null) : _props$rightPart;

  var _useState = (0, _react.useState)(width / 2),
      _useState2 = _slicedToArray(_useState, 2),
      leftWidth = _useState2[0],
      setLeftWidth = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      canResize = _useState4[0],
      setCanResize = _useState4[1];

  var containerRef = (0, _react.useRef)();
  var startX = (0, _react.useRef)();

  (0, _react.useEffect)(function () {
    var containerDom = containerRef.current;
    var mousemove = function mousemove(e) {
      if (!canResize) return;
      var lenX = e.clientX - startX.current;
      var w = 0;
      if (leftWidth + lenX < leftMinWidth) {
        w = leftMinWidth;
      } else if (leftWidth + lenX > width - rightMinWidth) {
        w = width - rightMinWidth;
      } else {
        w = leftWidth + lenX;
      }
      requestAnimationFrame(setLeftWidth.bind(null, w));
    };
    containerDom.addEventListener('mousemove', mousemove);

    var mouseup = function mouseup() {
      setCanResize(false);
    };
    document.addEventListener('mouseup', mouseup);
    return function () {
      document.removeEventListener('mouseup', mouseup);
      containerDom.removeEventListener('mousemove', mousemove);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canResize]);
  var mousedown = function mousedown(e) {
    setCanResize(true);
    startX.current = e.clientX;
  };

  return _react2.default.createElement(
    'div',
    {
      ref: containerRef,
      style: {
        width: width,
        height: height,
        margin: '0 auto',
        marginTop: 20,
        position: 'relative',
        boxSizing: 'content-box',
        border: '1px solid #f90'
      }
    },
    _react2.default.createElement(
      'div',
      { style: { width: leftWidth, float: 'left', height: '100%', overflow: 'auto' } },
      leftPart
    ),
    _react2.default.createElement(
      'div',
      {
        style: {
          width: 1,
          background: '#000',
          opacity: 0.5,
          overflow: 'visible',
          height: '100%',
          position: 'absolute',
          left: leftWidth
        }
      },
      _react2.default.createElement('div', {
        onMouseDown: mousedown,
        style: {
          background: 'transparent',
          width: 10,
          height: '100%',
          cursor: 'col-resize',
          transform: 'translateX(-50%)'
        }
      })
    ),
    _react2.default.createElement(
      'div',
      {
        style: {
          flexGrow: 1,
          float: 'right',
          width: width - leftWidth,
          height: '100%',
          overflow: 'auto'
        }
      },
      rightPart
    )
  );
};

exports.default = Resize;