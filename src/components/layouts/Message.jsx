import styles from './Message.module.css'
import { useState, useEffect } from 'react'

function Message({ type, msg }) {

    const [visible, setVisible] = useState(false)

    useEffect(() => {

        if(!msg) {
            setVisible(false)
            return
        }

        setVisible(true)

        const timer = setTimeout (() => {
            setVisible(false)
        }, 2000)

        return () => clearTimeout(timer)

    }, [msg])

    return (
        <div className={visible ? `${styles['message-placeholder']} ${styles.show}` : styles['message-placeholder']}>
            <div
                className={
                    `${styles.message} ${styles[type]}${visible ? ' ' + styles.show : ''}`
                }
                style={{ display: msg ? 'block' : 'none' }}
            >
                {msg}
            </div>
        </div>
    )
}

export default Message