document.addEventListener('DOMContentLoaded', function() {
  const firebaseConfig = {
      apiKey: "AIzaSyAJpZQ0NJAxqIHdIHWOXScR4Z9BgQauXtg",
      authDomain: "datainputretrieve-cd25f.firebaseapp.com",
      databaseURL: "https://datainputretrieve-cd25f-default-rtdb.firebaseio.com",
      projectId: "datainputretrieve-cd25f",
      storageBucket: "datainputretrieve-cd25f.appspot.com",
      messagingSenderId: "620911787089",
      appId: "1:620911787089:web:242539181dcd266d75cc70",
      measurementId: "G-6CGKX15V8X"
  };

 firebase.initializeApp(firebaseConfig);
  const db = firebase.database();



  // List of 8 pastel colors
  const pastelColors = [
    "#FF6F61", // Bold coral
    "#42A5F5", // Bold blue
    "#66BB6A", // Bold green
    "#FF4081", // Bold pink
    "#7E57C2", // Bold purple
    "#FF7043", // Bold orange
 
  ];

  // Function to randomly pick a color from the pastel colors array
  function getRandomColor() {
      const randomIndex = Math.floor(Math.random() * pastelColors.length);
      return pastelColors[randomIndex];
  }

  async function displayRandomMessage(nodePath) {
      try {
          const responsesRef = db.ref(nodePath);
          const snapshot = await responsesRef.once('value');
          const responses = snapshot.val();
          const messages = Object.values(responses);
          const randomIndex = Math.floor(Math.random() * messages.length);
          const randomMessage = messages[randomIndex];

          // Create and display the message
          const messageElement = document.createElement('div');
          messageElement.textContent = randomMessage;
          messageElement.classList.add('pop-message');
          document.body.appendChild(messageElement);

          // Randomize the color of the message
          messageElement.style.color = getRandomColor();

          // Get the content-container position and size
          const contentContainer = document.querySelector('.content-container');
          const contentRect = contentContainer.getBoundingClientRect();

          let randomX, randomY;
          let isOutsideContentContainer = false;

          // Loop until the message is outside the content-container
          while (!isOutsideContentContainer) {
              randomX = Math.floor(Math.random() * window.innerWidth);
              randomY = Math.floor(Math.random() * window.innerHeight);

              // Check if the position is outside the content-container's bounds
              isOutsideContentContainer = (
                  randomX < contentRect.left || randomX > contentRect.right ||
                  randomY < contentRect.top || randomY > contentRect.bottom
              );
          }

          // Apply the calculated position to the message
          messageElement.style.left = `${randomX}px`;
          messageElement.style.top = `${randomY}px`;

          // Fade out and remove the message after some time
          setTimeout(() => {
              messageElement.style.opacity = 0;
              setTimeout(() => messageElement.remove(), 500);  // After fading out, remove it
          }, 2000);

      } catch (error) {
          console.error('Error fetching data:', error);
      }
  }

  // Attach click events to all the buttons
  document.querySelectorAll('.response-button').forEach(button => {
      button.addEventListener('click', () => {
          const nodePath = button.getAttribute('data-node');
          displayRandomMessage(nodePath);
      });
  });
});













function checkOnlineStatus() {
  if (navigator.onLine) {
      document.getElementById('offline-world').style.display = 'none';
      document.getElementById('online-world').style.display = 'block';
  } else {
      document.getElementById('offline-world').style.display = 'block';
      document.getElementById('online-world').style.display = 'none';
  }
}

window.addEventListener('load', checkOnlineStatus);

window.addEventListener('online', checkOnlineStatus);
window.addEventListener('offline', checkOnlineStatus);

  
     
  
  
  




  

        NewMessagesRef.on('value', function (snapshot) {
            let dataDisplay = document.getElementById('dataDisplay2');
            dataDisplay.innerHTML = ''; 
            snapshot.forEach(function (childSnapshot) {
                let childData = childSnapshot.val();
                dataDisplay.innerHTML +=
                    `<p>Something Nice: ${childData.nice}}</p>`;
            });
        });


        $(document).ready(function() {
            // When the send button is clicked
            $('#sendButton').click(function() {
              // Get the value from the input field
              var userMessage = $('#userInput').val();
          
              // If there is a message
              if (userMessage.trim() !== '') {
                // Create a new message element and add it to the messages container
                var newMessage = $('<div class="message"></div>').text(userMessage);
                $('#messages').append(newMessage);
          
                // Scroll to the bottom of the messages container
                $('#messages').scrollTop($('#messages')[0].scrollHeight);
          
                // Clear the input field after sending
                $('#userInput').val('');
              }
            });
          
            // Optional: Allow the user to hit 'Enter' to send the message
            $('#userInput').keypress(function(e) {
              if (e.which === 13) { // 13 is the keycode for 'Enter'
                $('#sendButton').click();
              }
            });
          });
          




  
  
  