
const loadButton = document.getElementById("loadButton");
const postsContainer = document.getElementById("postsContainer");
const statusMessage = document.getElementById("status");
const postCount = document.getElementById("postCount");

async function loadPosts() {
    loadButton.disabled = true;
    loadButton.textContent = "Loading posts...";
    statusMessage.textContent = "Fetching posts from the API...";
    postsContainer.replaceChildren();
    postCount.textContent = "LOADING";

    try {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/posts?_limit=6"
        );

        if (!response.ok) {
            throw new Error("Unable to fetch posts.");
        }

        const posts = await response.json();

        posts.forEach(function (post) {
            const card = document.createElement("article");
            card.className = "post-card";

            const number = document.createElement("span");
            number.className = "post-number";
            number.textContent = "POST " + String(post.id).padStart(2, "0");

            const title = document.createElement("h3");
            title.textContent = post.title;

            const body = document.createElement("p");
            body.textContent = post.body;

            card.append(number, title, body);
            postsContainer.appendChild(card);
        });

        postCount.textContent = posts.length + " POSTS";
        statusMessage.textContent = "Successfully loaded posts from the API.";
    } catch (error) {
        statusMessage.textContent =
            "Could not load posts. Check your internet connection and try again.";
        postCount.textContent = "UNAVAILABLE";
    } finally {
        loadButton.disabled = false;
        loadButton.textContent = "Refresh Posts →";
    }
}

loadButton.addEventListener("click", loadPosts);

loadPosts();
