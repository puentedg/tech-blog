var today = new Date().toISOString().slice(0, 16);

document.getElementsByName("date")[0].min = today;

const newPostHandler = async (post) => {
  const title = document.querySelector("#title").value.trim();
  const date = document.querySelector("#date").value.trim();
  const description = document.querySelector("#description").value.trim();
  if (title && date && description) {
    const response = await fetch(`/api/post`, {
      method: "POST",
      body: JSON.stringify({ title, date, description}),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      document.location.replace(`/dashboard?opt=1`);
    } else {
      alert("Failed to create post");
      console.log(response);
    }
  }
};

document.querySelector("#new-post").addEventListener("click", newPostHandler);