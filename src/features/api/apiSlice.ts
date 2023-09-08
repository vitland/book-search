import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

import { Query } from "../../App"

export type Response = {
  kind: string
  totalItems: number
  items: Item[]
}

export type Item = {
  kind: Kind
  id: string
  etag: string
  selfLink: string
  volumeInfo: VolumeInfo
  saleInfo: SaleInfo
  accessInfo: AccessInfo
  searchInfo?: SearchInfo
}

export type AccessInfo = {
  country: Country
  viewability: Viewability
  embeddable: boolean
  publicDomain: boolean
  textToSpeechPermission: TextToSpeechPermission
  epub: Epub
  pdf: Epub
  webReaderLink: string
  accessViewStatus: AccessViewStatus
  quoteSharingAllowed: boolean
}

export type AccessViewStatus = "SAMPLE" | "NONE" | "FULL_PUBLIC_DOMAIN"

export type Country = "RU"

export type Epub = {
  isAvailable: boolean
  acsTokenLink?: string
  downloadLink?: string
}
export type TextToSpeechPermission = "ALLOWED"

export type Viewability = "PARTIAL" | "NO_PAGES" | "ALL_PAGES"

export type Kind = "books#volume"

export type SaleInfo = {
  country: Country
  saleability: Saleability
  isEbook: boolean
  listPrice?: SaleInfoListPrice
  retailPrice?: SaleInfoListPrice
  buyLink?: string
  offers?: Offer[]
}

export type SaleInfoListPrice = {
  amount: number
  currencyCode: string
}

export type Offer = {
  finskyOfferType: number
  listPrice: OfferListPrice
  retailPrice: OfferListPrice
}

export type OfferListPrice = {
  amountInMicros: number
  currencyCode: string
}

export type Saleability = "FOR_SALE" | "NOT_FOR_SALE" | "FREE"

export type SearchInfo = {
  textSnippet: string
}

export type VolumeInfo = {
  title: string
  subtitle?: string
  authors?: string[]
  publisher?: string
  publishedDate: string
  description?: string
  industryIdentifiers: IndustryIdentifier[]
  readingModes: ReadingModes
  pageCount: number
  printType: PrintType
  categories?: string[]
  maturityRating: MaturityRating
  allowAnonLogging: boolean
  contentVersion: string
  panelizationSummary: PanelizationSummary
  imageLinks: ImageLinks
  language: Language
  previewLink: string
  infoLink: string
  canonicalVolumeLink: string
}

export type ImageLinks = {
  smallThumbnail: string
  thumbnail: string
  medium?: string
  large?: string
}

export type IndustryIdentifier = {
  type: Type
  identifier: string
}

export type Type = "ISBN_13" | "ISBN_10" | "OTHER"

export type Language = "en" | "ru" | "de"

export type MaturityRating = "NOT_MATURE"

export type PanelizationSummary = {
  containsEpubBubbles: boolean
  containsImageBubbles: boolean
}

export type PrintType = "BOOK"

export type ReadingModes = {
  text: boolean
  image: boolean
}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://www.googleapis.com/books/v1/volumes",
  }),
  endpoints: (builder) => ({
    searchBooks: builder.query<Response, Query>({
      query: ({ text, category, sorting, startIndex }) => ({
        url: "/",
        params: {
          q: `intitle:${text}${
            category === "all" ? `+subject:` : `+subject:${category}`
          }`,
          orderBy: sorting,
          maxResults: 30,
          startIndex: startIndex,
          key: "AIzaSyDWlXMsSV62zYKw3soiIinc47TdC3rZKS4",
        },
      }),
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName
      },
      merge: (currentCache, newItems, { arg }) => {
        if (arg.startIndex === 0) {
          return newItems
        }
        if (newItems.totalItems === 0) {
          return currentCache
        }
        currentCache.items.push(...newItems?.items)
      },
      forceRefetch({ currentArg, previousArg }) {
        return (
          currentArg?.startIndex !== previousArg?.startIndex ||
          currentArg?.sorting !== previousArg?.sorting ||
          currentArg?.category !== previousArg?.category
        )
      },
    }),
  }),
})

export const { useLazySearchBooksQuery, useSearchBooksQuery } = apiSlice
