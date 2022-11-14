const deletePostHandler = async (event) => {
    event.preventDefault();
  
    const urlArray = location.href.split("/");
    const id = urlArray[urlArray.length - 1];
    const response = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      location.replace("/");
    } else {
      alert("Cannot Delete");
    }
  };
  
  document
    .querySelector("#delete-post")
    .addEventListener("click", deletePostHandler);