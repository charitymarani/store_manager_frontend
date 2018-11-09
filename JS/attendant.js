
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




//  switching tabs

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

                
                
                <img class="add-cart-btn" src="images/addcart.png">
               
            </div>
        </div>
                `;
        })
        
    }

}).catch((error) => {
    console.log(error);
  });

  