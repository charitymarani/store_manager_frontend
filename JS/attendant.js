(function(){
    const add_cart_btn=document.querySelectorAll('.add-cart-btn');
    add_cart_btn.forEach(function(btn){
        btn.addEventListener("click",function(event){
            if(event.currentTarget.className='add-cart-btn'){
                const item={};
                let name=event.currentTarget.parentNode.firstElementChild.firstElementChild.textContent;
                let price=event.currentTarget.parentNode.firstElementChild.lastElementChild.textContent;
                let finalprice= parseFloat(price.replace(/,/g, '').trim());
                item.name=name;
                item.price=finalprice;
                const cartItem=document.createElement('tr');
                cartItem.classList.add("cart-item");
                cartItem.innerHTML='<td><div class="cart-item-item"><img class="cross-item product-name-item" src="images/cross.png"/></div></td>'+ 
                '<td><div class="cart-item-item product-name">'+
                     '<p class="p-name">'+item.name+'</p>'+
                  '</div></td>'+
                '<td><div class="product-price cart-item-item ">'+item.price+'</div></td>'+
                    '<td><div class="product-quantity cart-item-item ">'+
                                      '<input class="item-quantity" type ="number" name="quantity" placeholder="1"/>'+
                                   '</div></td>'+
                                   '<td><div class="product-total cart-item-item ">5000</div></td>';
          
                
            const cart =document.getElementById("attendant-cart-table") ;
            cart.appendChild(cartItem); 
           
            showTotals();  
            
            }
    });
});
function showTotals(){
    const totals=[];
    const items=document.querySelectorAll('.product-price');
    
    items.forEach(function(item){
totals.push(parseFloat(item.textContent));
const totalMoney=totals.reduce(function(totals,item){
 totals+= item;
 
 return totals;
},0);
const finalTotal=totalMoney.toFixed(2);
document.getElementById("cart-total-items").textContent=totals.length;
document.getElementById("cart-total-price").textContent=finalTotal;
});

};

 })();
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
