function setCookies() {
  const text1 = Document.getElementById("text1")
  const text2 = Document.getElementById("text2")
  const checkbox = Document.getElementById("checkbox")

  document.cookie = `text1=${text1}`
  document.cookie = `text2=${text2}`
  document.checkbox = `checkbox=${checkbox}`
}
