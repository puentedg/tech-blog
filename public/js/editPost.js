const postFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector("#title").value.trim();
    const content = document.querySelector("#content").value.trim();
    const urlArray = location.href.split("/");
    const id = urlArray[urlArray.length - 1];
    if (title && content) {
      const response = await fetch(`/api/posts/${id}`, {
        method: "PUT",
        body: JSON.stringify({ title, content }),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        location.replace("/dashboard");
      } else {
        alert("Invalid Input");
      }
    } else {
      alert("Post title and content cannot leave empty.");
    }
  };
  
  document
    .querySelector(".post-form")
    .addEventListener("submit", postFormHandler);