import React from 'react';
import PropTypes from 'prop-types';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';

const TopNavPanel = ({ showPanel, closePanel, children, headerText }) => (
  <Panel
    isOpen={showPanel}
    type={PanelType.smallFixedFar}
    onDismiss={closePanel}
    isFooterAtBottom
    headerText={headerText}
    closeButtonAriaLabel="Close"
    onRenderFooterContent={() => (
      <div>
        <DefaultButton primary onClick={closePanel}>
          Done
        </DefaultButton>
      </div>
    )}
  >
    {children}
  </Panel>
);

TopNavPanel.propTypes = {
  showPanel: PropTypes.bool.isRequired,
  closePanel: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  headerText: PropTypes.string.isRequired
};

export default TopNavPanel;
