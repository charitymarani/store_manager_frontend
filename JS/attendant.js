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

