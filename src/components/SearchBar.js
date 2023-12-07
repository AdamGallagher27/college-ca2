import React from 'react'

export const SearchBar = ({handleSearch}) => {

  // handle user typing in text box
  const handleTyping = (event) => {
    const typedWord = event.target.value

    if (typedWord.length > 2) {
      handleSearch(typedWord)
    }
    else {
      handleSearch('')
    }
  }

  return (
    <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" onChange={handleTyping}/>
  )
}
