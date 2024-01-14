import React, { useState } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import startPic from '../../assets/star.svg'
import { booksData } from '../../booksData'
import HeroSection from '../HeroSection/HeroSection'
import NotFoundBook from './NotFoundBook'

const BookStore = () => {
  const [books, setBooks] = useState(booksData)
  const [sortOption, setSortOption] = useState('')

  // Function to handle book search based on the provided search term
  function handleSearch(searchTerm) {
    const filteredBooks = booksData?.filter(book =>
      book.bookName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setBooks([...filteredBooks])
  }

  // Function to toggle the 'favorite' status of a book
  const handleToggleFavorite = bookId => {
    setBooks(prevBooks =>
      prevBooks.map(book =>
        book.id === bookId ? { ...book, isFavorite: !book.isFavorite } : book
      )
    )
  }

  // Function to handle sorting change
  const handleSortChange = selectedSortOption => {
    setSortOption(selectedSortOption)
    sortBooks(selectedSortOption)
  }

  // Function to sort books based on the selected sorting option
  const sortBooks = selectedSortOption => {
    const sortingFunctions = {
      name_asc: (a, b) => a.bookName.localeCompare(b.bookName),
      name_desc: (a, b) => b.bookName.localeCompare(a.bookName),
      year_asc: (a, b) => a.publicationYear - b.publicationYear,
      year_desc: (a, b) => b.publicationYear - a.publicationYear,
    }

    setBooks(
      [...books].sort(sortingFunctions[selectedSortOption] || ((a, b) => a))
    )
  }
  return (
    <>
      <header className="mx-auto mb-8 max-w-7xl lg:mb-10">
        <HeroSection
          onSearch={handleSearch}
          onSortChange={handleSortChange}
          setSortOption={setSortOption}
        />
      </header>
      <div className="container mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {/* <!-- Book Item --> */}
        <>
          {books.length > 0 ? (
            books?.map(book => (
              <div key={book?.id}>
                <div className="space-y-3">
                  {/* <!-- thumbnail --> */}
                  <div className="flex items-center justify-center rounded-md border border-[#324251]/30 bg-white p-4">
                    <img
                      className="max-w-[144px] h-48"
                      src={book?.img}
                      alt="book name"
                    />
                  </div>
                  {/* <!-- info --> */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-bold lg:text-xl">
                      {book?.bookName}({book?.publicationYear})
                    </h4>

                    <p className="text-xs lg:text-sm">
                      By : <span>{book?.author}</span>
                    </p>

                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-bold lg:text-xl">
                        ${book?.price}
                      </h4>
                      {/* <!-- stars --> */}
                      <div className="flex items-center space-x-1">
                        {[...Array(book?.rating)].map((_, index) => (
                          <img key={index} src={startPic} />
                        ))}
                        <span className="text-xs lg:text-sm">
                          ({book?.rating} Star)
                        </span>
                      </div>

                      {/* <!-- stars ends --> */}
                    </div>

                    <div className="flex items-center gap-3 text-xs lg:text-sm">
                      <button className="flex min-w-[132px] items-center justify-center gap-1 rounded-md bg-[#1C4336] py-1.5 text-white transition-all hover:opacity-80 lg:py-1.5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="h-5 w-5"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                          />
                        </svg>
                        Add to Cart
                      </button>

                      <button
                        onClick={() => handleToggleFavorite(book.id)}
                        className={`flex min-w-[132px] items-center justify-center gap-1 rounded-md ${
                          book.isFavorite
                            ? 'bg-[#DC2954]/[14%] py-1.5 text-[#DC2954]'
                            : 'bg-[#1C4336]/[14%] py-1.5 text-[#1C4336]'
                        } transition-all hover:bg-${
                          book.isFavorite ? '#DC2954' : '#1C4336'
                        }/[24%] lg:py-1.5`}
                      >
                        {book.isFavorite ? <FaHeart /> : <FaRegHeart />}{' '}
                        Favorite
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <NotFoundBook />
          )}
        </>
      </div>
    </>
  )
}

export default BookStore
