
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

// Get the button that opens the modal
var add_product_btn = document.getElementById("add-product-btn");
var add_category_btn= document.getElementById("add-category-btn");
var add_user_btn= document.getElementById("add-user-btn");

// Get the <span> element that closes the form
var span = document.getElementsByClassName("close")[0];
var close2=document.getElementsByClassName("close")[1];
var close3=document.getElementsByClassName("close")[2];

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
    addcategoryform.style.display = "none";
}
close2.onclick= function() {
    addcategoryform.style.display = "none";
}
close3.onclick= function() {
    adduserform.style.display = "none";
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
}

