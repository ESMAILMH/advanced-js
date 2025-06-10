function getAllposts() {
    let request = new XMLHttpRequest();
    request.open('GET', 'https://jsonplaceholder.typicode.com/posts', true);
    request.responseType = 'json';
    request.send();
    
   request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            
            let output = '';
            let userNo='';
            request.response.forEach(function(post) {
                output += `<div class="post">
                            <h2>${post.title}</h2>
                            <p>${post.body}</p>
                           </div>`;
                userNo += `<div class="users" id="users">
                    <h3>${post.userId}</h3>
                    <h3>${post.userId}@alrahil.com</h3>
                </div>`;
            });
            document.getElementById('posts').innerHTML = output;
            document.getElementById('users').innerHTML = userNo;
        } else {
            console.error('Error fetching posts');
        }
    }
}
getAllposts();