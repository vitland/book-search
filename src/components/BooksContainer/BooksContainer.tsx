import { Query } from "../../App"
import { Item, useSearchBooksQuery } from "../../features/api/apiSlice"
import BookCard from "../BookCard/BookCard"
import styles from "./BooksContainer.module.css"
import Preloader from "../Preloader/Preloader"
import ShowMoreButton from "../ShowMoreButton/ShowMoreButton"
import BookDetails from "../BookDetails/BookDetails"

type Props = {
  query: Query
  bookDetails: Item | null
  skip: boolean
  onClick: () => void
  handleShowDetail: (item: Item) => void
}
const BooksContainer = ({
  query,
  skip,
  onClick,
  handleShowDetail,
  bookDetails,
}: Props) => {
  const { data, isFetching, isUninitialized, isError } = useSearchBooksQuery(
    query,
    {
      skip,
    },
  )
  console.log(data)
  return (
    <section className={styles.container}>
      {bookDetails ? (
        <BookDetails item={bookDetails} />
      ) : (
        <div className={styles.resultsContainer}>
          {data?.items ? <h3>{`Found ${data.totalItems} books`}</h3> : null}
          {isUninitialized ? null : isFetching ? (
            <Preloader />
          ) : data?.items ? (
            <div className={styles.cardsContainer}>
              {data.items.map((item) => (
                <BookCard
                  key={item.etag}
                  item={item}
                  onClick={handleShowDetail}
                />
              ))}
            </div>
          ) : !isError ? (
            <h3>Not found</h3>
          ) : (
            <h3>Error</h3>
          )}
          {data?.items && !(data.items.length >= data.totalItems) ? (
            <ShowMoreButton onClick={onClick} />
          ) : null}
        </div>
      )}
    </section>
  )
}

export default BooksContainer
