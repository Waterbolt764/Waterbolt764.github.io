// Load comments from a JSON file
fetch('json\comments.json')
  .then(response => response.json())
  .then(data => {
    displayComments(data.comments);
  })
  .catch(error => console.error('Error loading comments:', error));

// Function to display comments
function displayComments(comments) {
  const commentSection = document.getElementById('commentSection');
  commentSection.innerHTML = ''; // Clear current comments

  comments.forEach(comment => {
    const commentDiv = document.createElement('div');
    commentDiv.classList.add('comment');
    commentDiv.innerHTML = `<p><strong>${comment.author}:</strong> ${comment.text}</p>`;
    commentSection.appendChild(commentDiv);
  });
}

// Function to handle new comment submission
function submitComment(event) {
  event.preventDefault();
  const commentText = document.getElementById('commentText').value;
  
  // Create a new comment object
  const newComment = {
    "text": commentText,
    "author": "Anonymous" // You can implement a login system for users to provide their names
  };

  // Simulate storing the comment and adding it to the display (for now, you can just add it temporarily)
  fetch('json\comments.json')
    .then(response => response.json())
    .then(data => {
      data.comments.push(newComment); // Add the new comment to the data array

      // Simulate sending the updated data back to the server (in a real application, you would POST this back to a server)
      displayComments(data.comments); // Refresh the displayed comments
    })
    .catch(error => console.error('Error submitting comment:', error));

  // Clear the text area
  document.getElementById('commentText').value = '';
}
