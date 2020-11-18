/** @jsx jsx */
import React from 'react'
import { jsx } from 'theme-ui'
import { Checkbox } from 'antd'
import { Button, Icon } from 'Modules/Core'
import { Link } from '@reach/router'
import { CSSTransition } from 'react-transition-group'

import * as styles from './styles'

export function ControlPanel({ layers, setLayers }) {
  const [isHiding, setIsHiding] = React.useState(false)

  function updateLayers(layers, uid) {
    return layers.map(layer => {
      if (layer.uid === uid) {
        return {
          ...layer,
          visible: !layer.visible
        }
      } else {
        return layer
      }
    })
  }

  return (
    <div>
      {isHiding && (
        <div
          key="hidden"
          style={{ ...styles.Wrapper, ...styles.HiddenWrapper }}
        >
          <Button
            icon="eye"
            intent="default"
            style={{ float: 'right' }}
            onClick={() => setIsHiding(false)}
          >
            Show
          </Button>
        </div>
      )}
      <CSSTransition
        in={!isHiding}
        timeout={300}
        classNames="expanded"
        unmountOnExit
        onEnter={() => setIsHiding(false)}
        onExited={() => setIsHiding(true)}
      >
        <div
          key="expanded"
          style={{ ...styles.Wrapper, ...styles.ExpandedWrapper }}
        >
          <div style={styles.Section}>
            <Link to={'/dashboard'}>
              <Button icon="left" intent="default" style={{ float: 'left' }}>
                Back
              </Button>
            </Link>

            <Button
              icon="eye-invisible"
              intent="default"
              style={{ float: 'right' }}
              onClick={() => setIsHiding(true)}
            >
              Hide
            </Button>
          </div>

          <div style={styles.Section}>
            <h4 style={styles.SectionTitle}>Layers</h4>
            {layers.map(layer => (
              <div>
                <Checkbox
                  checked={layer.visible}
                  onChange={() => {
                    setLayers(layers => updateLayers(layers, layer.uid))
                  }}
                />
                <span style={styles.LayerText}>{layer.name}</span>
              </div>
            ))}
          </div>
        </div>
      </CSSTransition>
    </div>
  )
}
