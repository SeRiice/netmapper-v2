const formatOptions = (options) => {
  let str = ""

  Object.values(options).forEach((value) => {
    if (value !== "") {
      str += value + " "
    }
  })

  str = str.trim()

  if (str.length === 0) {
    return 0
  }

  return str.trim()
}

export default formatOptions
