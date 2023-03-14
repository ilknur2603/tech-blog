async function signupFormHandler(e){
    e.preventDefault();

    const username = document.getElementById("username-signup").value.trim();
    const password = document.querySelector("#password-signup").value.trim();
console.log(username+" "+password)

    if(username && password){
         fetch("/api/users" , {
            method : "post",
            body: JSON.stringify({username, password}), 
            headers : {'Content-Type' : 'application/json'}
        } ).then(response=>{
            if(response.ok){
                console.log("success");
                alert("signup success");
                //document.location.reload()
            }else {
                alert(response.statusText)
            }

        })
        .catch(err=>{
                alert(err)
        });
       
    } 
}

async function loginFormHandler(e){
    e.preventDefault();

    const username = document.getElementById("username-login").value.trim();
    const password = document.querySelector("#password-login").value.trim();
console.log(username+" "+password)


    if(username && password){
        fetch("/api/users/login" , {method : "post", body: JSON.stringify({username, password}), 
          headers : {"Content-Type" : "application/json"}
        } ).then(response=>{
            if(response.ok){
                console.log("success");
                
                alert("login success");
                document.location.replace("/dashboard");
            }else {
                alert(response.statusText)
            }
        }).catch(err=>
            alert(err)
        )
    }
}

document.querySelector(".signup-form").addEventListener("submit", signupFormHandler);
document.querySelector(".login-form").addEventListener("submit", loginFormHandler);
