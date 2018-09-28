module.exports = (content, write) =>
  write(
    `import React from 'react'
import styles from './tokens.module.css'

// eslint-disable-next-line react/prop-types
/**
 * @since 0.3.0
 * @status READY
 */
export default function ThemeProvider({ children }) {
  return <div className={styles.theme}>{children}</div>
}
`
  )
