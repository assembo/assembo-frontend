import React, { memo } from 'react';

import { Handle } from 'react-flow-renderer';

export default memo(({ data, isConnectable }) => {
  return (
    <div style={{background:'transparent',padding:'1rem',fontSize:'14px'}}>
      <Handle
        type="target"
        position="left"
        style={{ background: '#fff' }}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />
      <div>
        <strong>{data.label}</strong>
      </div>
    </div>
  );
});