const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

weatherForm.addEventListener('submit', e => {
  e.preventDefault(); // prevent default behaviour of refreshing the page on submit

  const location = search.value; // value extracts the input value

  fetch(`http://localhost:3000/weather?address=${location}`).then(response => {
    response.json().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        console.log(data.location);
        console.log(data.summary);
      }
    });
  });
});
