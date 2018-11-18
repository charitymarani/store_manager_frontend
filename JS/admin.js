
const el = id => document.getElementById(id)
const getEl = id => el(id).value;
const producturl="https://store-manager-herokuapp.herokuapp.com/api/v2/products";
//Get admin dashboard statistics
function productsCount(){
    let products=document.getElementById('products_body').children.length;
    document.getElementById("p_value").textContent=products;
}

function incomeStats(){
    let income=[];
    let sales=document.getElementById('admin-sale-rep').children.length;
    document.getElementById("s_value").textContent=sales;
    let sale_totals=document.querySelectorAll('.sale-total');
    sale_totals.forEach(function(itm){
        income.push(parseFloat(itm.textContent));
        const totalincome=income.reduce(function(income,itm){
            income+= itm;
            
            return income;
    },0);
    document.getElementById("i_value").textContent='Ksh  ' + totalincome;

    });
}
// view product details
function viewproductDetails(name,price,id,cat,desc,qty,limit,b_price,img){
        let viewdetails = document.getElementById('view-product-details');
        viewdetails.style.display = "block";
        const detailsform=document.getElementById("view-product-content");
        detailsform.innerHTML=`<div class="product-details-left">
                    <h3>${name}</h3>
                    <p><span>Product ID : </span> <span class="p_detail">${id}</span></p>
                    <p><span>Category : </span> <span class="p_detail">${cat}</span></p>
                    <p><span>Buying price : </span> <span class="p_detail">${b_price}</span></p>
                    <p><span >Selling price : </span> <span class="p_detail">${price}</span></p>
                    <p><span>Quantity available : </span> <span class="p_detail">${qty}</span></p>
                    <p><span>Low inventory limit: </span> <span class="p_detail">${limit}</span></p>
                    <p><span>Description : </span><span class="p_detail">${desc}</span></p>
                    
            </div>
            <img class="image-holder" src="${img}"/></div>`; 
    

}
//Edit product
function editProduct(pid,name,cat,b_price,s_price,qty,limit,desc,pic){
    let editproductform=document.getElementById('editproductform');
    editproductform.style.display = "block";
    el('edit-product-name').value=name;
    el('edit-product-category').value=cat;
    el('edit-purchase-price').value=b_price;
    el('edit-product-price').value=s_price;
    el('edit-product-quantity').value=qty;
    el('edit-low-inventory').value=limit;
    el('edit-product-description').value=desc;
    el('edit-product-image').value=pic;
    let product_save=el('editproduct-submit');
    let product_cancel=el('editproduct-cancel');
    product_save.addEventListener('click',editproductfunc);
    product_cancel.addEventListener('click',editcancelfunc);

    function editcancelfunc(e) {
        e.preventDefault();
        editproductform.style.display = "none";
    }

    function editproductfunc(e) {
        e.preventDefault();
        let producturl=`https://store-manager-herokuapp.herokuapp.com/api/v2/products/${pid}`;
        let name = getEl('edit-product-name');
        let category = getEl('edit-product-category');
        let b_price = getEl('edit-purchase-price');
        let s_price = getEl('edit-product-price');
        let qty=getEl('edit-product-quantity')
        let limit= getEl('edit-low-inventory');
        let pic=getEl('edit-product-image');
        let desc=getEl('edit-product-description')
        let token=localStorage.getItem('token');
        let myData = {
        name: name, 
        purchase_price:Number(b_price), 
        selling_price: Number(s_price),
        quantity:Number(qty), 
        category: category, 
        low_limit:Number(limit),
        description:desc,
        pic:pic
        }
        fetch(producturl,{
        method: 'PUT',
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
            refreshToken(data);
            if (data.status =='success') {
                divAlert = el('edit-product-alert');
                form=el('editform');
                divAlert.style.display = "block";
                divAlert.innerHTML =data.message;
                divAlert.className='green-alert';
                setTimeout(function(){
                    divAlert.style.display = "none";
                    location.reload(true);
                }, 3000);
            }
            else {
            divAlert = el('edit-product-alert');
            divAlert.style.display = "block";
            divAlert.innerHTML =data.message;
            divAlert.className='red-alert';
        

            }
        })
        .catch(error => console.log(error));
    }
}


//Delete a product
function deleteProduct(pid){
    let res = confirm("Are you sure you want to delete this product?");
    if (res === true){
        let token=localStorage.getItem("token");
        let url=`https://store-manager-herokuapp.herokuapp.com/api/v2/products/${pid}`;
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer '+ token
            }
        })
        .then((res) => res.json())
        .then((data) => {
            refreshToken(data);
            if (data.status === 'success'){
                // if request is successful
                divAlert=document.getElementById('p_table_alert');
                divAlert.style.display = "block";
                divAlert.innerHTML =data.message;
                divAlert.className='green-alert';
                setTimeout(function(){
                    divAlert.style.display = "none";
                    location.reload(true);
                }, 3000);
            }
            else{
                divAlert=document.getElementById('p_table_alert');
                divAlert.style.display = "block";
                divAlert.innerHTML =data.message;
                divAlert.className='red-alert';

            }
        }).catch((error) => {
            console.log(error);
        });
}
}

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

let addproductform = document.getElementById('addproductform');
let editproductform = document.getElementById('editproductform');
let addcategoryform = document.getElementById('addcategoryform');
let adduserform = document.getElementById('adduserform');
let view_details = document.getElementById('view-product-details');

// Get the button that opens the modal
let add_product_btn = document.getElementById("add-product-btn");
let add_category_btn= document.getElementById("add-category-btn");
let add_user_btn= document.getElementById("add-user-btn");


// Get the <span> element that closes the form

let span = document.getElementsByClassName("close")[0];
let span2=document.getElementsByClassName("close")[1];
let close1=document.getElementsByClassName("close")[2];
let close2=document.getElementsByClassName("close")[3];
let close3=document.getElementsByClassName("close")[4];


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
span2.onclick = function() {
    editproductform.style.display = "none";

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
    if (event.target == editproductform) {
        editproductform.style.display = "none";
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
const url = "https://store-manager-herokuapp.herokuapp.com/api/v2/register";
let status = '';
let register = el('adduserform');
let save=el('register-submit');
let cancel=el('register-cancel');
save.addEventListener('click',registerfunc);
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
    let pic=getEl('upload-user-photo');
    let token=localStorage.getItem('token');
    let myData = {
      name: name, 
      username: username, 
      email: email,
      role:role, 
      password: password, 
      confirm_password: confirmPassword,
      pic:pic
     }
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
        refreshToken(data);
        if (data.status =='success') {
            divAlert = el('register-alert');
            form=el('registerform');
            divAlert.style.display = "block";
            divAlert.innerHTML =data.message;
            divAlert.className='green-alert';
            setTimeout(function(){
                divAlert.style.display = "none";
                form.reset();
            }, 3000);
            
        }
        else {
          divAlert = el('register-alert');
          divAlert.style.display = "block";
          divAlert.innerHTML =data.message;
          divAlert.className='red-alert';
        }
      })
      .catch(error => console.log(error));
  }
//Edit user role
function editRole(username){
    let token = window.localStorage.getItem('token');
    let Url = `https://store-manager-herokuapp.herokuapp.com/api/v2/users/${username}`;
    fetch(Url, {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer '+ token
        }
    })
    .then((res) => res.json())
    .then((data) => {
        refreshToken(data);
        if (data.status === 'success'){
            // if request is successful
            divAlert=document.getElementById('user_alert');
            divAlert.style.display = "block";
            divAlert.innerHTML =data.message;
            divAlert.className='green-alert';
            setTimeout(function(){
                divAlert.style.display = "none";
                location.reload(true);
            }, 3000);
        }
        else{
            divAlert=document.getElementById('user_alert');
            divAlert.style.display = "block";
            divAlert.innerHTML =data.message;
            divAlert.className='red-alert';

        }
    }).catch((error) => {
        console.log(error);
      });
}
//Add new product
let productform = el('addproductform');
let product_save=el('addproduct-submit');
let product_cancel=el('addproduct-cancel');
product_save.addEventListener('click',addproductfunc);
product_cancel.addEventListener('click',productcancelfunc);

function productcancelfunc(e) {
    e.preventDefault();
    productform.style.display = "none";
}

function addproductfunc(e) {
    e.preventDefault();

    let name = getEl('add-product-name');
    let category = getEl('select-product-category');
    let b_price = getEl('add-purchase-price');
    let s_price = getEl('add-product-price');
    let qty=getEl('add-product-quantity')
    let limit= getEl('add-low-inventory');
    let pic=getEl('add-product-image');
    let desc=getEl('add-product-description')
    let token=localStorage.getItem('token');
    let myData = {
      name: name, 
      purchase_price:Number(b_price), 
      selling_price: Number(s_price),
      quantity:Number(qty), 
      category: category, 
      low_limit:Number(limit),
      description:desc,
      pic:pic
     }
    fetch(producturl, {
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
        refreshToken(data);
        if (data.status =='success') {
            divAlert = el('product-alert');
            form=el('registerform');
            divAlert.style.display = "block";
            divAlert.innerHTML =data.message;
            divAlert.className='green-alert';
            setTimeout(function(){
                divAlert.style.display = "none";
                form.reset();
            }, 3000);
        }
        else {
          divAlert = el('product-alert');
          divAlert.style.display = "block";
          divAlert.innerHTML =data.message;
          divAlert.className='red-alert';
         

        }
      })
      .catch(error => console.log(error));
  }
//Get all sales records
function getSales(){
let salesdiv=document.getElementById('admin-sale-rep');
    let token = window.localStorage.getItem('token');
    let Url = `https://store-manager-herokuapp.herokuapp.com/api/v2/sales`;
    fetch(Url, {
        method: 'GET',
        headers: {
            'Access-Control-Request-Headers': '*',
            'Authorization': 'Bearer '+ token
        }
    })
    .then((res) => res.json())
    .then((data) => {
        refreshToken(data);
        if (data.status === 'failed' ){
            // if sales report is empty
            salesdiv.innerHTML=`<tr><td colspan="6" class="water-mark">${data.message}</td></tr>`;
            
        }
        else{
            // if request is successful
            let sales = data; // Get the results
            return sales.map(function(sale) { // Map through the results and for each run the code below
            salesdiv.innerHTML +=`<tr class="att-sale-item att_sale_filter attendant-report-row">
            <td>${sale.sale_id}</td>
            <td>${sale.date_created}</td>
            <td>${sale.items_count}</td>
            <td>${sale.item}</td>
            <td class="sale-creator">${sale.created_by}</td>
            <td><div class="sale-total">${sale.price}</div></td>
        </tr>`;
        
        incomeStats();
        
        
           })
        
        }
        
       
}).catch((error) => {
    console.log(error);
});

}
//Display products table
function getProducts(){
    let productsdiv=document.getElementById('products_body');
        let token = window.localStorage.getItem('token');
        let Url = `https://store-manager-herokuapp.herokuapp.com/api/v2/products`;
        fetch(Url, {
            method: 'GET',
            headers: {
                'Access-Control-Request-Headers': '*',
                'Authorization': 'Bearer '+ token
            }
        })
        .then((res) => res.json())
        .then((data) => {
            refreshToken(data);
            if (data.status === 'failed' ){
                // if sales report is empty
                productsdiv.innerHTML=`<tr><td colspan="6" class="water-mark">${data.message}</td></tr>`;
                
            }
            else{
                // if request is successful
                let products = data; // Get the results
                return products.map(function(product) { // Map through the results and for each run the code below
                productsdiv.innerHTML +=` <tr class="att-sale-item">
                <td>${product.product_code}</td>
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>${product.description}</td>
                <td>${product.selling_price}</td>
                <td>
                    <div class="action_div">
                        <a onClick="deleteProduct(${product.product_code});"class="action_item">delete</a>
                        <a onClick="editProduct(${product.product_code},'${product.name}','${product.category}',${product.purchase_price},${product.selling_price},${product.quantity},${product.low_limit},'${product.description}','${product.pic}');" class="action_item">edit</a>

                        <a onClick="viewproductDetails('${product.name}',${product.selling_price},${product.product_code},'${product.category}','${product.description}',${product.quantity},${product.low_limit},${product.purchase_price},'${product.pic}');"class="view_product_btn action_item">view</a>

                       

                    </div>
                </td>
            </tr>`;
            productsCount();
            
        })
    }
    }).catch((error) => {
        console.log(error);
    });
    }
//Fetch all users
function getUsers(){
    let usersdiv=document.getElementById('user_table');
    let Url = `https://store-manager-herokuapp.herokuapp.com/api/v2/users`;
    fetch(Url, {
        method: 'GET',
        headers: {
            'Access-Control-Request-Headers': '*'
        }
    })
    .then((res) => res.json())
    .then((data) => {
        refreshToken(data);
        if (data.status === 'failed' ){
            // if sales report is empty
            usersdiv.innerHTML=`<tr><td colspan="6" class="water-mark">${data.message}</td></tr>`;
            
        }
        else{
            // if request is successful
            let users = data; // Get the results
            return users.map(function(user) { // Map through the results and for each run the code below
            usersdiv.innerHTML +=`<tr class="att-sale-item">
            <td><img class="profile-avatar" src="images/avatar.png"></td>
            <td>${user.username}</td>
            <td>${user.name}</td>
            
              <td>${user.email}</td>
              <td>${user.role}</td>
              <td>
                <a onClick="editRole('${user.username}');" class="action_item" >change role</a>
              </td>
      </tr>`;
      
    })
    }
    }).catch((error) => {
        console.log(error);
    });
}
function removeToken() {
    localStorage.removeItem("token");
}
function logOut() {
        removeToken();
        window.location.replace("/store_manager_frontend/index.html");
}
function refreshToken(d){
    if (Object.values(d).includes("Token has expired")){
        logOut();
    } 
}
function setUsername(){
    let user_name=localStorage.getItem('username');
    let user=document.getElementById('admin_user_name');
    user.textContent='Admin  '+ user_name;
   
    
}
getSales();
getProducts();
getUsers();
setUsername();








