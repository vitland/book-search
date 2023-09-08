import React from "react"
import styles from "./ShowMoreButton.module.css"

type Props = {
  onClick: () => void
}
const ShowMoreButton = ({ onClick }: Props) => {
  return (
    <button onClick={onClick} className={styles.button}>
      More books
    </button>
  )
}

export default ShowMoreButton
