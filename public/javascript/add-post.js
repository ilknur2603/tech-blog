

async function newFormHandler(event){
event.preventDefault();

const title = document.querySelector('input[name="post-title"]').value.trim();
const post_text = document.querySelector("textarea[name='post-text']").value.trim();
const user_id= document.querySelector("textarea[name='post-userId']").value.trim();
fetch("/api/posts" , {
    method:"POST", 
    body: JSON.stringify({
        title,
        post_text,
        user_id
    }),
    headers : {"Content-Type" : "application/json"}
}).then(response=>{
    if(response.ok){
        console.log("success");
        alert("new Post Added success");
        document.location.replace("/dashboard")
    }else {
        alert(response.statusText)}
})
.catch(err =>
  alert(err)
  );
};

document.querySelector(".new-post-form").addEventListener("submit", newFormHandler)