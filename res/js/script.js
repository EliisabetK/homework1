// pilte pole veel
// keegi võiks profiili kõrvale username panna
// json validator: https://jsonlint.com
// https://www.npoint.io/docs/9becf83c2d3726750ce7
// võibolla võiks css failid üheks teha

function fetchAndDisplayPosts(jsonUrl) {
    fetch(jsonUrl)
        .then(response => response.json())
        .then(data => {
            const postsContainer = document.querySelector('.posts-container');

            data.forEach(post => {
                const postElement = document.createElement('div');
                postElement.classList.add('post');

                const postHeader = document.createElement('div');
                postHeader.classList.add('post-header');
                            
                // profile image
                const profileImage = document.createElement('img');
                profileImage.src = "res/images/icon.png";
                profileImage.alt = "Profile Image";
                profileImage.classList.add('profile-image');

                postHeader.append(profileImage)
                
                /*
                // username
                const userName = document.createElement('text');
                userName.textContent = post.creator_name;
                userName.classList.add('username');
                postProfile.append(userName)
                */

                // date
                const postDate = document.createElement('p');
                postDate.textContent = formatDate(post.date);
                postDate.classList.add('post-date');
                postHeader.appendChild(postDate);

                // add header to element
                postElement.appendChild(postHeader);

                // text
                const postContent = document.createElement('p');
                postContent.textContent = post.text;

                // image if it exists
                const imageContainer = document.createElement('div');
                const postImage = document.createElement('img');
                if (post.image_url) {
                    postImage.src = post.image_url;
                    postImage.alt = "Post Image";
                    postImage.classList.add('postImage');
                    imageContainer.appendChild(postImage);
                    postElement.appendChild(imageContainer);
                }
                
                // add text to postElement
                postElement.appendChild(postContent);

                // thumbs up icon
                const thumbsUpIcon = document.createElement('img');
                thumbsUpIcon.src = "res/images/thumb.png";
                thumbsUpIcon.alt = "Like Icon";
                thumbsUpIcon.classList.add('like-image');

                postElement.appendChild(thumbsUpIcon);
                
                // append postElement to postsContainer
                postsContainer.appendChild(postElement);
            });
        })
        .catch(error => console.error('Error fetching JSON:', error));
}

// url (tuleks teha failiks ja välja kommenteerida)
const jsonUrl = 'https://api.npoint.io/9becf83c2d3726750ce7';
fetchAndDisplayPosts(jsonUrl);

// formats the date to be in the style of "Oct 4, 2023"
function formatDate(dateString) {
    const postDate = new Date(dateString);
    const currentDate = new Date();
    const timeDifference = currentDate - postDate;
    
    // if the post is less than a day old it shows how many hours ago it was created
    if (timeDifference < 24 * 60 * 60 * 1000) {
        const hoursAgo = Math.floor(timeDifference / (60 * 60 * 1000));
        return `${hoursAgo} hours ago`;
    } else {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return postDate.toLocaleDateString(undefined, options);
    }
}

function toggleDropdown() {
    var dropdown = document.getElementById("info")
    if (dropdown.style.display === "block") {
        dropdown.style.display = "none";
    } else {
        dropdown.style.display = "block";
    }
}