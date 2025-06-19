function getAllposts(userId) {
    let request = new XMLHttpRequest();
    request.open('GET', 'https://jsonplaceholder.typicode.com/posts?userId=' + userId)
    request.responseType = 'json';
    request.send();

    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            let posts = request.response;
            document.getElementById('posts').innerHTML = '';
            for (post of posts) {
                let output = '';
                output += `<div class="post">
                            <h2>${post.title}</h2>
                            <p>${post.body}</p>
                           </div>`;
                document.getElementById('posts').innerHTML += output;
            };

        } else {
            console.error('Error fetching posts');
        }
    }
}
getAllposts(1);


function getUserInfo() {
    let request = new XMLHttpRequest();
    request.open('GET', 'https://jsonplaceholder.typicode.com/users', true);
    request.responseType = 'json';
    request.send();

    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            let users = request.response;
            document.getElementById('users').innerHTML = '';
            for (user of users) {
                let output = '';
                output += `<div class="user" onclick="clickeduser(${user.id},this)">
                            <h3>${user.name}</h3>
                            <p>Email: ${user.email}</p>
                            <p>Phone: ${user.phone}</p>
                           </div>`;
                document.getElementById('users').innerHTML += output;
            }
        } else {
            console.error('Error fetching posts');
        }
    }
}
getUserInfo();

function clickeduser(userId, cl) {
    let allUsers = document.querySelectorAll('.user');
    allUsers.forEach(user => user.classList.remove('selected'));

    cl.classList.add('selected');

    getAllposts(userId);
}