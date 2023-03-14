async function logout(){
     fetch ("/api/users/logout", {
        method:"post",
        headers: {"Content-Type" : "application/json"}
    }).then(response=>{
    if(response.ok){
        document.location.replace("/")
    }else {
        alert(response.statusText)
    }
}).catch(err=>{
        alert(err)
    });
 }

 document.querySelector("#logout").addEventListener("click", logout);