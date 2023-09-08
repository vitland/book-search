import { Item } from "../../features/api/apiSlice"
import styles from "./BookCard.module.css"

type Props = {
  item: Item
  onClick: (item: Item) => void
}

function BookCard({ item, onClick }: Props) {
  return (
    <article className={styles.card} onClick={() => onClick(item)}>
      <div className={styles.link}>
        <img
          src={item.volumeInfo.imageLinks?.thumbnail}
          alt=""
          className={styles.img}
        />
        <span className={styles.category}>
          {item.volumeInfo.categories?.slice(0, 1)}
        </span>
        <h2 className={styles.title}>{item.volumeInfo.title}</h2>
        <span className={styles.author}>
          {item.volumeInfo.authors?.slice(0, 1)}
        </span>
      </div>
    </article>
  )
}

export default BookCard
