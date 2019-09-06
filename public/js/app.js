const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

search.value = '';
messageOne.textContent = 'Loading...';
messageTwo.textContent = '';

weatherForm.addEventListener('submit', e => {
  e.preventDefault(); // prevent default behaviour of refreshing the page on submit

  const location = search.value; // value extracts the input value

  fetch(`/weather?address=${location}`).then(response => {
    response.json().then(data => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.finalResult;
      }
    });
  });
});