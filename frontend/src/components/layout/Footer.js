import styles from './Footer.module.css'

function Footer(){
    return (
    <footer className={styles.footer}>
        <p>
            <span className="bold">Get your Pet</span> &copy; Developed by Assis Zang - 2022
        </p>
    </footer>
    )
}

export default Footer