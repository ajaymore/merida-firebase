import React from 'react';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';

export default () => (
  <div style={{ padding: 10, justifyContent: 'center', alignItems: 'center' }}>
    <Spinner
      size={SpinnerSize.large}
      label="Initializing..."
      ariaLive="assertive"
    />
  </div>
);
