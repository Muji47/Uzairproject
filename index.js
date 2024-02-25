
let jsonData; // Variable to hold the JSON data

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
    row.id="dfsf"
    row.innerHTML = `
        <td id="user-image">${user.id}</td>
        <td id="user-name">${user.name}</td>
        <td id="user-surname">${user.surname}</td>
        <td id="user-email">${user.email}</td>
        <td id="user-status"></td>
        <td id="user-outtime"></td>
        <td id="user-duration"></td>
        <td id="expectedtime"></td>
    `;
    tableBody.appendChild(row);
});
  })
  .catch(error => {
    console.error('There was a problem fetching the data:', error);
  });
  
  
document.getElementById("out-button").onclick = function() {
    document.getElementById("popup").style.display = "block";
  };
document.getElementsByClassName("clear-btn")[0].onclick = function() {
    document.getElementById("popup").style.display = "none";
  };
  const time=new Date()
  const inputNumber= document.getElementById("pop-number");
  function convertToHoursAndMinutes(totalMinutes) {
    var hours = Math.floor(totalMinutes / 60);
    var minutes = totalMinutes % 60;
    hours = hours < 10 ? '0' + hours: hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    
    return hours +"hr:"+ minutes+"mint" ;
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
  function hoursAndMints(){
    var newHours = time.getHours();
    var newMinutes = time.getMinutes();

    newHours = newHours < 10 ? '0' + newHours : newHours;
    newMinutes = newMinutes < 10 ? '0' + newMinutes : newMinutes;
    
    return newHours + ':' + newMinutes;
  }
document.getElementsByClassName("submit-btn")[0].onclick = function() {
    console.log(document.getElementById("dfsf"))
    document.getElementById("popup").style.display = "none";
    document.getElementById("user-status").innerText="out"
    document.getElementById("user-outtime").innerText=`${time.getHours()}:${time.getMinutes()}`
    document.getElementById("user-duration").innerText=convertToHoursAndMinutes( inputNumber.value)
    document.getElementById("expectedtime").innerText=addTimeToCurrent(Math.floor(inputNumber.value / 60), inputNumber.value % 60)
    inputNumber.innerText="";
  };
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