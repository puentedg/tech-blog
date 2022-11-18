var today = new Date().toISOString().slice(0, 16);

document.getElementsByName("date")[0].min = today;

const postFormHandler = async (event) => {
  event.preventDefault();
  
  const title = document.querySelector("#title").value.trim();
  const date = document.querySelector("#date").value.trim();
  const content= document.querySelector("#content").value.trim();
  if (title && date && content) {
    const response = await fetch(`/api/posts`, {
      method: "POST",
      body: JSON.stringify({ title, date, content}),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      document.location.replace("/dashboard?opt=2");
    } else {
      alert("Failed to create post");
      console.log(response);
    }
  }
};

document
.querySelector("#new-post")
.addEventListener("click", postFormHandler);