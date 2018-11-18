
(function(){
    const view_product_btn=document.querySelectorAll('.view_product_btn');
    view_product_btn.forEach(function(btn){
        btn.addEventListener("click",function(evt){
            
            if(evt.currentTarget.className='view_product_btn'){
                let viewdetails = document.getElementById('view-myproduct-details');
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
//Show statistics
function attendantStats(){
    let income=[];
    let items=[];
    let sales=document.getElementById('attendant-rep').children.length;
    document.getElementById('att_svalue').textContent=sales;
    let sale_totals=document.querySelectorAll('.my_income');
    let item_totals=document.querySelectorAll('.items_sold');
    sale_totals.forEach(function(itm){
        income.push(parseFloat(itm.textContent));
        const totalincome=income.reduce(function(income,itm){
            income+= itm;
            
            return income;
    },0);
    document.getElementById("att_ivalue").textContent='Ksh  ' + totalincome;

    });
    item_totals.forEach(function(item){
        items.push(parseFloat(item.textContent));
        const totalitems=items.reduce(function(items,item){
            items+= item;
            
            return items;
    },0);
    document.getElementById("att_pvalue").textContent=totalitems;

    });
}

//switch between side bar list
function open_attendant_content(evt, attendant_content) {
    // Declare all variables
    var i, dash_content, dash_list;

    // Get all elements with class="tabcontent" and hide them
    dash_content = document.getElementsByClassName("attendant-dashcontent");
    for (i = 0; i < dash_content.length; i++) {
        dash_content[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    dash_list = document.getElementsByClassName("dash-list");
    for (i = 0; i < dash_list.length; i++) {
        dash_list[i].className = dash_list[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById(attendant_content).style.display = "block";
    evt.currentTarget.className += " active";
}
// Get the element with id="default_dash_content" and click on it
document.getElementById("default_attendant_content").click();

// view product details
var view_details = document.getElementById('view-myproduct-details');
var close1=document.getElementsByClassName("close")[0];
close1.onclick= function() {
    view_details.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == view_details) {
        view_details.style.display = "none";
    }
   
}
//Add to cart
const showAlert = message => setTimeout(function () { alert(message); }, 300);
function saveproduct(pname){
    sessionStorage.setItem('cart_item', pname);
    let cart_item=sessionStorage.getItem("cart_item");
    let quantity=1;
    let cartUrl = 'https://store-manager-herokuapp.herokuapp.com/api/v2/carts';
    let token = window.localStorage.getItem('token');
    fetch(cartUrl, {
        method: 'POST',
        headers: {
            'content-type':'application/json',
            'Authorization': 'Bearer '+ token
        },
        body:JSON.stringify({"quantity":Number(quantity),"cart_item":cart_item})
        })
        .then((res) => res.json())
        .then((data) => {
            refreshToken(data);
            if (data.status ==='success'){
                // if request is successful
                divAlert=document.getElementById('product-list-msg');
                divAlert.style.display = "block";
                divAlert.className='green-alert';
                divAlert.innerHTML =data.message;
                setTimeout(function(){
                    divAlert.style.display = "none";
                    location.reload(true);
                }, 3000);
            }
            else if (data.status==='success!'){
                divAlert=document.getElementById('product-list-msg');
                divAlert.style.display = "block";
                divAlert.innerHTML =data.message;
                divAlert.className='green-alert';
                setTimeout(function(){
                    divAlert.style.display = "none";
                    location.reload(true);
                }, 3000);
                
                
                
            }
            else{
                // if request is unsuccessful
                divAlert=document.getElementById('product-list-msg');
                divAlert.style.display = "block";
                divAlert.innerHTML =data.message;
                divAlert.className='red-alert';
                setTimeout(function(){
                    divAlert.style.display = "none";
                }, 4000);
            }
    
        })
}
//View all products

let productdiv = document.getElementById('product-list');
let productsUrl = 'https://store-manager-herokuapp.herokuapp.com/api/v2/products';
let token = window.localStorage.getItem('token');
fetch(productsUrl, {
    method: 'GET',
    headers: {
         'Access-Control-Request-Headers': '*',
        'Authorization': 'Bearer '+ token
    }
})
  .then((res) => res.json())
  .then((data) => {
    refreshToken(data);
    if (data.status === 'failed'){
        // if product list is empty
        divAlert=document.getElementById('product-list-msg');
        divAlert.style.display = "block";
        divAlert.innerHTML =data.message;
        divAlert.className='water-mark';
    
    }
    else{
        // if request is successful
        let products = data; // Get the results
        return products.map(function(product) { // Map through the results and for each run the code below
            productdiv.innerHTML += `
            <div class="product-column">
            <div class="product-image"><img class="img-image" src="${product.pic}"/></div>
            <div class="product-caption">
                <div class="product-caption-left">
                        <span class="image-text">
                                ${product.name}
                        </span>
                        <br/>

                        <span class="image-price">${product.selling_price}</span>
                </div>
                <img onClick="saveproduct('${product.name}');" class="add-cart-btn" src="images/addcart.png">
                
            </div>
        </div>`;
       
        })
        
    }

}).catch((error) => {
    console.log(error);
  });
//Delete single item on cart
function deleteCartItem(cart_id){
    let token = window.localStorage.getItem('token');
    let Url = `https://store-manager-herokuapp.herokuapp.com/api/v2/carts/${cart_id}`;
    fetch(Url, {
        method: 'DELETE',
        headers: {
            'Access-Control-Request-Headers': '*',
            'Authorization': 'Bearer '+ token
        }
    })
    .then((res) => res.json())
    .then((data) => {
        refreshToken(data);
        if (data.status === 'success'){
            // if request is successful
            divAlert=document.getElementById('cart-alert');
            divAlert.style.display = "block";
            divAlert.innerHTML =data.message;
            divAlert.className='green-alert';
            setTimeout(function(){
                divAlert.style.display = "none";
                location.reload(true);
            }, 3000);
        }
        else{
            divAlert=document.getElementById('cart-alert');
            divAlert.style.display = "block";
            divAlert.innerHTML =data.message;
            divAlert.className='red-alert';
            

        }
    }).catch((error) => {
        console.log(error);
      });

}
//Delete entire cart
let delCart=document.getElementById("cart-cancel");
delCart.addEventListener('click',deleteCart);
function deleteCart(e){
    e.preventDefault();
    const res = confirm("Are you sure you want to delete the entire cart?");
    if (res === true){
        
        let token=localStorage.getItem("token");
        let url=`https://store-manager-herokuapp.herokuapp.com/api/v2/carts`;
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
                divAlert=document.getElementById('cart-alert');
                divAlert.style.display = "block";
                divAlert.innerHTML =data.message;
                divAlert.className='green-alert';
                setTimeout(function(){
                    divAlert.style.display = "none";
                    location.reload(true);
                }, 3000); 
            }
            else{
                divAlert=document.getElementById('cart-alert');
                divAlert.style.display = "block";
                divAlert.innerHTML =data.message;
                divAlert.className='red-alert';
                
            }
        }).catch((error) => {
            console.log(error);
        });
}
}
//Function to edit cart quantity
function editCartItem(cart_id){
    if (event.keyCode === 13){
    let quantity=event.currentTarget.value
    let token = window.localStorage.getItem('token');
    let Url = `https://store-manager-herokuapp.herokuapp.com/api/v2/carts/${cart_id}`;
    let myData = {
        quantity:Number(quantity)
    }
    fetch(Url, {
        method: 'PUT',
        headers: {
            'content-type':'application/json',
            'Authorization': 'Bearer '+ token
        },
        body: JSON.stringify(myData)
    })
    .then((res) => res.json())
    .then((data) => {
        refreshToken(data);
        if (data.status === 'success'){
            // if request is successful
            divAlert=document.getElementById('cart-alert');
            divAlert.style.display = "block";
            divAlert.innerHTML =data.message;
            divAlert.className='green-alert';
            setTimeout(function(){
                divAlert.style.display = "none";
                location.reload(true);
            }, 3000);
            

                     
        }
        else{
            divAlert=document.getElementById('cart-alert');
            divAlert.style.display = "block";
            divAlert.innerHTML =data.message;
            divAlert.className='red-alert';
            

        }
    }).catch((error) => {
        console.log(error);
      });
    }
}
//View all cart
function viewCart(){
    let cartdiv= document.getElementById('cart-body');
    let token = window.localStorage.getItem('token');
    let cartUrl = `https://store-manager-herokuapp.herokuapp.com/api/v2/carts`;
    fetch(cartUrl, {
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
            // if cart is empty
            cartdiv.innerHTML=`<tr><td class="water-mark">There are no items in the cart, click on the green cart icon on the product to add an item to the cart!</td></tr>`;
            
        }
        else{
            // if request is successful
            cartdiv.classList.remove("water-mark");
            let cartitems = data; // Get the results
            return cartitems.map(function(cartitem) { // Map through the results and for each run the code below
            cartdiv.innerHTML += `
            <tr class="cart-item">
            <td><div class="cart-item-item"><img onClick=deleteCartItem(${cartitem.cart_item_id}) class="cross-item product-name-item" src="images/cross.png"></div></td> 
    <td><div class="cart-item-item product-name-item p-name">
        ${cartitem.cart_item}
    </div></td>
            
                <td><div class="product-price cart-item-item ">${cartitem.cost}</div></td>
                <td><div class="product-quantity cart-item-item ">
                        <input class="item-quantity" onkeyup="editCartItem(${cartitem.cart_item_id})"type ="text" name="quantity" value=${cartitem.count}>
                    </div></td>

                <td><div class="product-total cart-item-item ">${cartitem.price}</div></td>
                <tr>
    `;
            showTotals();
            })
        }

    }).catch((error) => {
        console.log(error);
    });
}
function showTotals(){
    const totalprice=[];
    const totalitems=[];
    const itemsprice=document.querySelectorAll('.product-total');
    const itemscount=document.querySelectorAll('.item-quantity');
    
    itemsprice.forEach(function(item){

        totalprice.push(parseFloat(item.textContent));
        const totalMoney=totalprice.reduce(function(totalprice,item){

            totalprice+= item;
        
            return totalprice;
    },0);
    const finalTotal=totalMoney.toFixed(2);
    document.getElementById("cart-total-price").textContent=finalTotal;
});
    itemscount.forEach(function(itm){
        totalitems.push(parseFloat(itm.value));
        const totalqty=totalitems.reduce(function(totalitems,itm){
            totalitems+= itm;
            
            return totalitems;
    },0);
    document.getElementById("cart-total-items").textContent=totalqty;
    
});
};
let checkout=document.getElementById("cart-checkout");
checkout.addEventListener('click',checkoutfunc);

function checkoutfunc(e) {
    e.preventDefault();
    let token=localStorage.getItem('token');
    let url=`https://store-manager-herokuapp.herokuapp.com/api/v2/sales`;
    fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Authorization":'Bearer ' + token
        }
      })
        .then((res) => res.json())
        .then((data) => {
            refreshToken(data);
            if (data.status =='success') {
                divAlert = document.getElementById('cart-alert');
                divAlert.style.display = "block";
                divAlert.innerHTML =data.message;
                divAlert.className='green-alert';
                setTimeout(function(){
                    divAlert.style.display = "none";
                    location.reload(true);
                }, 3000);
                
                
            }
            else {
                divAlert = document.getElementById('cart-alert');
                divAlert.style.display = "block";
                divAlert.innerHTML =data.message;
                divAlert.className='red-alert';
                
    
            }
        })
        .catch(error => console.log(error));
    }
function getmySales(){
    let mysalesdiv=document.getElementById('attendant-rep');
    let token = window.localStorage.getItem('token');
    let Url = `https://store-manager-herokuapp.herokuapp.com/api/v2/mysales`;
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
            mysalesdiv.innerHTML=`<tr><td colspan="6" class="water-mark">${data.message}</td></tr>`;
            
        }
        else{
            // if request is successful
            let sales = data; // Get the results
            return sales.map(function(sale) { // Map through the results and for each run the code below
            mysalesdiv.innerHTML +=`<tr class="att-sale-item attendant-report-row">
            <td>${sale.sale_id}</td>
            <td>${sale.date_created}</td>
            <td class="items_sold">${sale.items_count}</td>
            <td>${sale.item}</td>
            <td>${sale.created_by}</td>
            <td class="my_income">${sale.price}</td>
        </tr>`;
        attendantStats();
    })
}
}).catch((error) => {
    console.log(error);
});
}
//Show products
function fetchProducts(){
    let productsdiv=document.getElementById('myproducts-div');
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
                <a onClick="myproductDetails('${product.name}',${product.selling_price},${product.product_code},'${product.category}','${product.description}',${product.quantity},${product.low_limit},${product.purchase_price},'${product.pic}');"class="view_product_btn action_item">view</a>

                </div>
            </td>
        </tr>`;
        
    })
}
}).catch((error) => {
    console.log(error);
});
    }
//View product details
function myproductDetails(name,price,id,cat,desc,qty,limit,b_price,img){
    let viewdetails = document.getElementById('view-myproduct-details');
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
function removeToken() {
    return localStorage.removeItem("token");
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
function setUser(){
    let user_name=localStorage.getItem('username');
    let user=document.getElementById('user_name');
    let myname=document.getElementById('my_name');
    user.textContent='Attendant  '+ user_name;
    myname.textContent='@'+ user_name;
    
}
viewCart();
getmySales();
fetchProducts();
setUser();
