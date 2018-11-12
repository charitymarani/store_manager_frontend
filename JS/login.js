
const login = document.getElementById('login-form');

login.addEventListener('submit', loginfunc);

function loginfunc(e) {
    e.preventDefault();

    let username = document.getElementById('login_username').value;
    let password = document.getElementById('login_password').value;
   
    let reqInit = {
        'method': 'POST',
        'headers': {
            "Content-Type": "application/json",
            
            'Accept': 'application/json, text/plain, */*'
        },
        body:JSON.stringify({username:username,password:password,})
    };

    let request = new Request('https://store-manager-herokuapp.herokuapp.com/api/v2/login', reqInit);

    fetch(request)
        .then(req => req.json())
        .then(res => {
            if (res.token) {
                localStorage.setItem('token', res.token);
                localStorage.setItem('username', username);
                token=localStorage.getItem('token')
                let myInit = {
                    'method': 'GET',
                    'headers': {
                        "Authorization":'Bearer ' + token
                    }
                };

                let reqdata = new Request('https://store-manager-herokuapp.herokuapp.com/api/v2/sales', myInit);
                let status = '';
                fetch(reqdata)
                    
                    .then((response) => {
                        status = response.status;
                        
                        return response.json();
                      })
                    
                    .then((data) => {
                    if (status ===401) {
                        window.location.href = './attendant-dashboard.html';
                        
                    } else {
                        window.location.href = './admin_dashboard.html';
                        
                       
                    }
                })

            } else {
                let login_alert = document.getElementById('login-alert');
                login_alert.innerHTML = res.message;
                login_alert.className = 'red-alert';
            }
        })
        .catch(err => console.log(err));
}