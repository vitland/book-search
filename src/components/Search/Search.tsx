import { ChangeEvent, FormEvent } from "react"
import styles from "./Search.module.css"

type Props = {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
  onSelect: (e: ChangeEvent<HTMLSelectElement>) => void
}

const Search = ({ onChange, onSubmit, onSelect }: Props) => {
  return (
    <>
      <section className={styles.container}>
        <h1 className={styles.title}>Book Search</h1>
        <form action="" onSubmit={onSubmit} className={styles.form}>
          <input
            type="text"
            name={"text"}
            onChange={onChange}
            className={styles.input}
          />
          <fieldset className={styles.selectorContainer}>
            <div className="">
              <label htmlFor="category-select">Category:</label>
              <select
                name="category"
                id="category-select"
                onChange={onSelect}
                className={styles.selector}
              >
                <option value="all">all</option>
                <option value="art">art</option>
                <option value="biography">biography</option>
                <option value="computers">computers</option>
                <option value="history">history</option>
                <option value="medical">medical</option>
                <option value="poetry">poetry</option>
              </select>
            </div>
            <div className="">
              <label htmlFor="sorting-select">Sorting by:</label>
              <select
                name="sorting"
                id="sorting-select"
                onChange={onSelect}
                className={styles.selector}
              >
                <option value="relevance">relevance</option>
                <option value="newest">newest</option>
              </select>
            </div>
          </fieldset>
        </form>
      </section>
    </>
  )
}

export default Search
