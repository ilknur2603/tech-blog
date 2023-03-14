async function commentFormHandler(e) {
    e.preventDefault();

const comment_text = document.querySelector("textarea[name='comment-body']").value.trim();

const post_id = window.location.toString().split("/")[window.location.toString().split("/").length-1];

if ( comment_text) {
    fetch("/api/comments", {
        method: "POST", 
        body : JSON.stringify({
            post_id,
            comment_text
        }),
        headers : {"Content-Type" : "application/json"}
    }).then(response=>{
        if(response.ok) {
            document.location.reload();
        }else{
            alert(response.statusText)
        }
    }).catch(err=>alert{err});
    
}



}


document.querySelector(".comment-form").addEventListener("submit", commentFormHandler)