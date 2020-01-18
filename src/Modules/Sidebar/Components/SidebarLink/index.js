/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useState, useMemo, useRef, useEffect } from 'react'
import { Link } from '@reach/router'
import { Menu } from 'antd'

import { Icon } from 'Modules/Core'
import * as styles from './styles'

function isActive({ isCurrent, isPartiallyCurrent }) {
  return isCurrent || isPartiallyCurrent ? { 'data-active': true } : null
}

export function SidebarLink(props) {
  const [opened, setOpened] = useState(false)
  const linkRef = useRef(null)

  const menu = useMemo(() => {
    if (!props.menuItems) return null
    return (
      <Menu sx={{ bg: 'dark.1' }} theme="dark">
        {props.menuItems.filter(Boolean).map((menu, idx) => (
          <Menu.Item key={idx}>
            <Link to={menu.to}>{menu.text}</Link>
          </Menu.Item>
        ))}
      </Menu>
    )
  }, [props.menuItems])

  function handleStopClick(e) {
    e.preventDefault()
    setOpened(s => !s)
  }

  useEffect(() => {
    if (linkRef && linkRef.current) {
      setOpened(linkRef.current.dataset.active)
    }
  }, [linkRef])

  return (
    <div sx={styles.wrapper}>
      {props.menuItems ? (
        <div sx={styles.menuItems}>
          <Link
            ref={linkRef}
            to={props.to}
            sx={styles.link}
            getProps={isActive}
            onClick={handleStopClick}
          >
            <Icon type={props.icon} size={15} sx={{ mr: 2 }} />
            <span sx={styles.linkContent}>{props.children}</span>
            <Icon type={opened ? 'up' : 'down'} size={10} />
          </Link>
          {opened && menu}
        </div>
      ) : (
        <Link ref={linkRef} sx={styles.link} to={props.to} getProps={isActive}>
          <Icon type={props.icon} size={15} sx={{ mr: 2 }} />
          <span sx={styles.linkContent}>{props.children}</span>
        </Link>
      )}
    </div>
  )
}
