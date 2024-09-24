// TODO: Copy the setCookies function from the previous exercise
function setCookies() {
  const text1 = Document.getElementById('text1');
  const text2 = Document.getElementById('text2');
  const checkbox = Document.getElementById('checkbox');

  document.cookie = `text1=${text1}`;
  document.cookie = `text2=${text2}`;
  document.checkbox = `checkbox=${checkbox}`;
}

// TODO: Implement the getCookie function. It should take a cookie name as an argument and return the cookie value.
function getCookie(name) {
  const cookies = document.cookie.split('; ');
  for (let cookie of cookies) {
    const [key, value] = cookie.split('=');
    if (key === name) {
      return value;
    }
  }
  return ''; 
}

// DO NOT MODIFY BELOW THIS LINE
document.getElementById('submitButton').addEventListener('click', function () {
  setCookies();
  displayCookies();
});

function displayCookies() {
  document.getElementById('text1Cookie').textContent =
    'Text1: ' + getCookie('text1');
  document.getElementById('text2Cookie').textContent =
    'Text2: ' + getCookie('text2');
  document.getElementById('checkboxCookie').textContent =
    'Checkbox: ' + getCookie('checkbox');
}
