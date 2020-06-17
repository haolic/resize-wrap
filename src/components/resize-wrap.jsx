import React, { useEffect, useState, useRef } from 'react';

const Resize = props => {
  const {
    leftMinWidth = 0,
    rightMinWidth = 0,
    height = 600,
    width = 800,
    leftPart = <div></div>,
    rightPart = <div></div>,
  } = props;

  const [leftWidth, setLeftWidth] = useState(width / 2);
  const [canResize, setCanResize] = useState(false);
  const containerRef = useRef();
  const startX = useRef();

  useEffect(() => {
    const containerDom = containerRef.current;
    const mousemove = e => {
      if (!canResize) return;
      const lenX = e.clientX - startX.current;
      let w = 0;
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

    const mouseup = () => {
      setCanResize(false);
    };
    document.addEventListener('mouseup', mouseup);
    return () => {
      document.removeEventListener('mouseup', mouseup);
      containerDom.removeEventListener('mousemove', mousemove);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canResize]);
  const mousedown = e => {
    setCanResize(true);
    startX.current = e.clientX;
  };

  return (
    <div
      ref={containerRef}
      style={{
        width,
        height,
        margin: '0 auto',
        marginTop: 20,
        position: 'relative',
        boxSizing: 'content-box',
        border: '1px solid #f90'
      }}
    >
      <div style={{ width: leftWidth, float: 'left', height: '100%', overflow: 'auto' }}>{leftPart}</div>
      <div
        style={{
          width: 1,
          background: '#000',
          opacity: 0.5,
          overflow: 'visible',
          height: '100%',
          position: 'absolute',
          left: leftWidth,
        }}
      >
        <div
          onMouseDown={mousedown}
          style={{
            background: 'transparent',
            width: 10,
            height: '100%',
            cursor: 'col-resize',
            transform: 'translateX(-50%)',
          }}
        ></div>
      </div>
      <div
        style={{
          flexGrow: 1,
          float: 'right',
          width: width - leftWidth,
          height: '100%',
          overflow: 'auto'
        }}
      >
        {rightPart}
      </div>
    </div>
  );
};

export default Resize;
