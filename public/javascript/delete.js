async function deleteFormHandler(e){
    e.preventDefault();

    const id = window.location.toString().split("/")[window.location.toString().split("/").length-1];


 fetch(`/api/posts/${id}`, {
    method : "DELETE",
}).then(response=>{
    if(response.ok) {
        document.location.replace("/dashboard/");
    }else {
        alert(response.statusText)
    
    }
}).catch(err=>{alert(err)});



}

document.querySelector(".delete-post-btn").addEventListener("click", deleteFormHandler);