// filter given countries array by search term
const applySearchFilter = (searchTerm, filterArray, property) => {
  return filterArray.filter((element) => {
    return element[property]
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  })
}

export { applySearchFilter }