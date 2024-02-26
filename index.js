let jsonData;

  fetch('data.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      jsonData = data;
      const tableBody = document.getElementById('userTableBody');
      jsonData.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${user.id}</td>
          <td>${user.name}</td>
          <td>${user.surname}</td>
          <td>${user.email}</td>
          <td id="user-status"></td>
          <td id="user-outtime"></td>
          <td id="user-duration"></td>
          <td id="expectedtime"></td>
        `;
        row.addEventListener('click', () => {
          // Remove selected class from previously selected row
          row.style.backgroundColor="#198754"
          row.style.cursor="pointer"
          const selectedRow = document.querySelector('.selected');
          if (selectedRow) {
            selectedRow.classList.remove('selected');
          }
          // Add selected class to clicked row
          row.classList.add('selected');
          // Get the values of the clicked row
          const id = user.id;
          const name = user.name;
          const surname = user.surname;
          const email = user.email;
          // Do whatever you want with these values
          console.log(`Clicked row - ID: ${id}, Name: ${name}, Surname: ${surname}, Email: ${email}`);
        });
        tableBody.appendChild(row);
      });
    })
    .catch(error => {
      console.error('There was a problem fetching the data:', error);
    });

  function hidePopup() {
    document.getElementById("popup").style.display = "none";
  }
  function openModal(){
    document.getElementById("popup").style.display = "block";
  }

  const time = new Date();

  function onSubmit() {
    const selectedRow = document.querySelector('.selected');
    if (selectedRow) {
      selectedRow.querySelector('#user-status').innerText = "out";
      selectedRow.querySelector('#user-outtime').innerText = `${time.getHours()}:${time.getMinutes()}`;
      const inputNumber = document.getElementById("pop-number");
      selectedRow.querySelector('#user-duration').innerText = convertToHoursAndMinutes(inputNumber.value);
      selectedRow.querySelector('#expectedtime').innerText = addTimeToCurrent(Math.floor(inputNumber.value / 60), inputNumber.value % 60);
      inputNumber.value = ""; // Clear input field
    }
    hidePopup();
  }

  function convertToHoursAndMinutes(totalMinutes) {
    var hours = Math.floor(totalMinutes / 60);
    var minutes = totalMinutes % 60;
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    return hours + "hr:" + minutes + "mint";
  }

  function addTimeToCurrent(hoursToAdd, minutesToAdd) {
    var currentTime = new Date();

    currentTime.setHours(currentTime.getHours() + hoursToAdd);
    currentTime.setMinutes(currentTime.getMinutes() + minutesToAdd);

    var newHours = currentTime.getHours();
    var newMinutes = currentTime.getMinutes();

    newHours = newHours < 10 ? '0' + newHours : newHours;
    newMinutes = newMinutes < 10 ? '0' + newMinutes : newMinutes;

    return newHours + ':' + newMinutes;
  }

  function displayCurrentTime() {
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    var currentTimeString = hours + ':' + minutes + ':' + seconds;

    document.getElementById('current-time').textContent = currentTimeString;
  }

  setInterval(displayCurrentTime, 1000);

  displayCurrentTime();