var today = new Date().toISOString().slice(0, 16);

document.getElementsByName("date")[0].min = today;

const postFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector("#title").value.trim();
    const date = document.querySelector("#date").value.trim();
    const content = document.querySelector("#content").value.trim();
    const urlArray = location.href.split("/");
    const id = urlArray[urlArray.length - 1];
    if (title && date && content) {
      const response = await fetch(`/api/posts/${id}`, {
        method: "PUT",
        body: JSON.stringify({ title, date, content }),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        location.replace("/dashboard?opt=1");
      } else {
        alert("Invalid Input");
      }
    } else {
      alert("Post title and content cannot leave empty.");
    }
  };
  
  document
    .querySelector("#update-post")
    .addEventListener("submit", postFormHandler);