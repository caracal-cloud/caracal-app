/** @jsx jsx */
import React from 'react'
import { jsx } from 'theme-ui'
import MapGL from 'react-map-gl'

import { Button } from 'Modules/Core'
import { ControlPanel } from './Components/ControlPanel'

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN

export function Map() {
  const mapDivRef = React.useRef(null)

  const [layers, setLayers] = React.useState([
    {
      uid: 'abc123',
      name: 'Elephant | Orbcomm',
      visible: true
    },
    {
      uid: 'def456',
      name: 'Radios | TRBOnet',
      visible: true
    },
    {
      uid: 'ghj789',
      name: 'Trackers | REST API',
      visible: true
    }
  ])

  const style = 'mapbox://styles/mapbox/light-v9'
  const [viewport, setViewport] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight,
    longitude: 30.085963,
    latitude: -1.955151,
    zoom: 13,
    maxZoom: 16
  })

  React.useEffect(() => {
    function updateViewport() {
      onViewportChange({ width: window.innerWidth, height: window.innerHeight })
    }
    window.addEventListener('resize', updateViewport)
    return () => window.removeEventListener('resize', updateViewport)
  }, [])

  function onViewportChange(newViewport) {
    setViewport(oldViewport => ({
      ...oldViewport,
      ...newViewport
    }))
  }

  return (
    <div ref={mapDivRef}>
      <ControlPanel layers={layers} setLayers={setLayers} />

      <MapGL
        mapboxApiAccessToken={MAPBOX_TOKEN}
        {...viewport}
        mapStyle={style}
        onViewportChange={newViewport => onViewportChange(newViewport)}
      ></MapGL>
    </div>
  )
}
