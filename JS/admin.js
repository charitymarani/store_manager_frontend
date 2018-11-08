// view product details
(function(){
    const view_product_btn=document.querySelectorAll('.view_product_btn');
    view_product_btn.forEach(function(btn){
        btn.addEventListener("click",function(evt){
            
            if(evt.currentTarget.className='view_product_btn'){
                let viewdetails = document.getElementById('view-product-details');
                viewdetails.style.display = "block";
                const item={};
                let name=evt.currentTarget.parentNode.parentNode.parentNode.children[1].textContent;
                
                let price=evt.currentTarget.parentNode.parentNode.parentNode.children[4].textContent;
                let id=evt.currentTarget.parentNode.parentNode.parentNode.children[0].textContent;
                let cat=evt.currentTarget.parentNode.parentNode.parentNode.children[2].textContent;
                let desc=evt.currentTarget.parentNode.parentNode.parentNode.children[3].textContent;
                let finalprice= parseFloat(price.replace(/,/g, '').trim());
                item.name=name;
                item.price=finalprice;
                item.id=id;
                item.cat=cat;
                item.desc=desc;
                const detailsform=document.getElementById("view-product-content");
                detailsform.innerHTML='<div class="product-details-left">'+
                            '<h3>'+item.name+'</h3>'+
                            '<p><span>Product ID :</span><span>'+item.id+'</span></p>'+
                            '<p><span>Category :</span><span>'+item.cat+'</span></p>'+
                            '<p><span>Price :</span><span>'+item.price+'</span></p>'+
                            '<p><span>Quantity available :</span><span>30</span></p>'+
                            '<p><span>Low inventory limit:</span><span>10</span></p>'+
                            '<p><span>Description :</span><span>'+item.desc+'</span></p>'+
                            
                    '</div>'+
                    '<img class="image-holder" src="images/imageholder.png"/></div>'; 
            }
    });
});
})();

//switch between side bar list
function open_admin_content(evt, admin_content) {
    // Declare all variables
    var i, dash_content, dash_list;

    // Get all elements with class="tabcontent" and hide them
    dash_content = document.getElementsByClassName("dash-content");
    for (i = 0; i < dash_content.length; i++) {
        dash_content[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    dash_list = document.getElementsByClassName("dash-list");
    for (i = 0; i < dash_list.length; i++) {
        dash_list[i].className = dash_list[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById(admin_content).style.display = "block";
    evt.currentTarget.className += " active";
}
// Get the element with id="default_dash_content" and click on it
document.getElementById("default_dash_content").click();

//Open pop up form

var addproductform = document.getElementById('addproductform');

var addcategoryform = document.getElementById('addcategoryform');
var adduserform = document.getElementById('adduserform');
var view_details = document.getElementById('view-product-details');

// Get the button that opens the modal
var add_product_btn = document.getElementById("add-product-btn");
var add_category_btn= document.getElementById("add-category-btn");
var add_user_btn= document.getElementById("add-user-btn");


// Get the <span> element that closes the form

var span = document.getElementsByClassName("close")[0];
var close1=document.getElementsByClassName("close")[1];
var close2=document.getElementsByClassName("close")[2];
var close3=document.getElementsByClassName("close")[3];


// When the user clicks the button, open the modal 
add_product_btn.onclick = function() {
    addproductform.style.display = "block";
}
add_category_btn.onclick = function() {
    addcategoryform.style.display = "block";
}
add_user_btn.onclick = function() {
    adduserform.style.display = "block";
}

   
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    addproductform.style.display = "none";

}
close2.onclick= function() {
    addcategoryform.style.display = "none";
}
close3.onclick= function() {
    adduserform.style.display = "none";
}

close1.onclick= function() {
    view_details.style.display = "none";
}



// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == addproductform) {
        addproductform.style.display = "none";
    }
    if (event.target == addcategoryform) {
        addcategoryform.style.display = "none";
    }
    if (event.target == adduserform) {
        adduserform.style.display = "none";
    }
    if (event.target == view_details) {
        view_details.style.display = "none";
    }
   
}
// Signup
const el = id => document.getElementById(id)
const getEl = id => el(id).value;
const showAlert = message => setTimeout(function() { alert(message); }, 30);
const reload = () => window.location.reload();
const url = "https://store-manager-herokuapp.herokuapp.com/api/v2/register";
let status = '';
let register = el('adduserform');
let save=el('register-submit');
let cancel=el('register-cancel');
register.addEventListener('click',registerfunc);
cancel.addEventListener('click',cancelfunc);

function cancelfunc(e) {
    e.preventDefault();
    register.style.display = "none";
}

function registerfunc(e) {
    e.preventDefault();

    let name = getEl('add-name');
    let username = getEl('add-user-name');
    let email = getEl('add-user-email');
    let password = getEl('add-user-password');
    let role=getEl('select-role')
    let confirmPassword = getEl('confirm-user-password');
    let token=localStorage.getItem('token');
    let myData = {
      name: name, 
      username: username, 
      email: email,
      role:role, 
      password: password, 
      confirm_password: confirmPassword }
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Authorization":'Bearer ' + token
      },
      body: JSON.stringify(myData)
    })
      .then((response) => {
        status = response.status
        return response.json()
      })
      .then((data) => {
        if (data.status =='success') {
            divAlert = el('register-alert');
            divAlert.style.display = "block";
            divAlert.innerHTML = data.message;
            divAlert.className='green-alert';
            reload()
        }
        else {
          divAlert = el('register-alert');
          divAlert.style.display = "block";
          divAlert.innerHTML = data.message;
          divAlert.className='red-alert';

        }
      })
      .catch(error => console.log(error));
  }
