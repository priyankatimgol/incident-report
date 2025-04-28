import { useState } from 'react';
const ZoomWrapper = ({ children }) => {
  const [scale, setScale] = useState(1);

  const handleZoomIn = () => {
    setScale(scale + 0.1);
  };

  const handleZoomOut = () => {
    if (scale > 0.2) {
      setScale(scale - 0.1);
    }
  };

  return (
    <div className="zoom-wrapper">
      <div className="zoom-controls">
        <span class="k-icon k-i-zoom-in k-icon-md" onClick={handleZoomIn}></span>
        <button
          style={{ backgroundColor: 'transparent', border: 'none' }}
          disabled={scale <= 1}
          onClick={handleZoomOut}
        >
          <span class={`k-icon k-i-zoom-out k-icon-md`}></span>
        </button>
        {/* <button >Zoom In</button>
        <button >Zoom Out</button> */}
      </div>
      <div
        className="zoom-content-wrapper"
        style={{
          width: '100%',
          height: '100%',
          overflow: 'auto',
        }}
      >
        <div
          className="zoom-content"
          style={{
            transform: `scale(${scale})`,
            transformOrigin: 'top center',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default ZoomWrapper;
