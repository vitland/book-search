import React from "react"
import { Item } from "../../features/api/apiSlice"
import styles from "./BookDetails.module.css"

type Props = {
  item: Item
}
const BookDetails = ({ item }: Props) => {
  console.log(item)
  return (
    <article className={styles.container}>
      <div className={styles.imgContainer}>
        <img
          src={
            item.volumeInfo.imageLinks.medium ||
            item.volumeInfo.imageLinks.thumbnail
          }
          alt=""
          className={styles.img}
        />
      </div>
      <div className={styles.textContainer}>
        <span className={styles.category}>
          {item.volumeInfo.categories?.join(" | ")}
        </span>
        <h3 className={styles.title}>{item.volumeInfo.title}</h3>
        <span className={styles.author}>
          {item.volumeInfo.authors?.join(", ")}
        </span>
        <p className={styles.description}>{item.volumeInfo.description}</p>
      </div>
    </article>
  )
}

export default BookDetails
