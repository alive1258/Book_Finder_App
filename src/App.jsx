import React from 'react'
import BookStore from './components/BookStore/BookStore'
import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar/Navbar'

function App() {
  return (
    <>
      <div className="relative font-[Manrope] before:fixed before:left-0 before:top-0 before:-z-10 before:h-[435px] before:w-full before:rounded-bl-3xl before:bg-[#EAE6D7] max-md:px-4 lg:text-lg before:lg:rounded-bl-[79px]">
        <Navbar />

        <main className="my-10 lg:my-14">
          <BookStore />
        </main>

        <Footer />
      </div>
    </>
  )
}

export default App
