// cart
const btnCart = document.querySelector('#cart-icon');
const cart = document.querySelector('.cart');
const btnClose = document.querySelector('#cart-close');

//Custom confirmation box

let confirmBox = document.getElementById('confirmationBox');
let confirmBtn = document.getElementById('confirmButton');
let cancelBtn = document.getElementById('cancelButton');
//popup confirmation box
let popupBox = document.getElementById('popupbox');
let popupBtn = document.getElementById('popbtn');
//product popup confirmation box
let popupropBox = document.getElementById('popupprobox');
let popupproBtn = document.getElementById('popprobtn');

// place order
let placeOrderBtn = document.querySelector('.btn-buy');
let addressPopup = document.getElementById('addresspopupbox');
let addressClsBtn = document.getElementById('address-close');
placeOrderBtn.addEventListener('click',()=>{
    cart.classList.remove('cart-active');
    addressPopup.classList.remove('hiddenaddress');
});
addressClsBtn.addEventListener('click',()=>{
    addressPopup.classList.add('hiddenaddress');
});

// confirm order
let confirmOrderBtn = document.querySelector('#comfirmOrder');
let thanUPopup = document.getElementById('thankUpopupbox');
let thankUClsBtn = document.getElementById('okBtn');
confirmOrderBtn.addEventListener('click',()=>{
    addressPopup.classList.add('hiddenaddress');
    thanUPopup.classList.remove('hiddenConfirmOrder');
    let nam = document.getElementById('name').value;
    let phone = parseInt(document.getElementById('phone').value);
    let address = document.getElementById('address').value;
    let pin = parseInt(document.getElementById('pin').value);

    let orderTotal = document.getElementById('orderTotal');
    orderTotal.innerHTML = "Your Order Value = " + document.querySelector('.total-price').innerHTML;

    let AddressDetails = document.getElementById('Address'); 
    AddressDetails.innerHTML = nam + ", " + phone + ", " + address + ", " + pin + ".";
});
thankUClsBtn.addEventListener('click',()=>{
    thanUPopup.classList.add('hiddenConfirmOrder');
});


//cart
btnCart.addEventListener('click',()=>{
    cart.classList.add('cart-active');
});

btnClose.addEventListener('click',()=>{
    cart.classList.remove('cart-active');
});

document.addEventListener('DOMContentLoaded',loadFood);

function loadFood(){
    loadContent();
}
function loadContent(){
    //Remove Food items from cart
    let btnRemove = document.querySelectorAll('.cart-remove');
    btnRemove.forEach((btn)=>{
        btn.addEventListener('click',removeItem);
    });

    //Product item change event
    let qtyElement = document.querySelectorAll('.cart-quantity');
    qtyElement.forEach((input)=>{
        input.addEventListener('change',changeQty);
    });
    //Product Cart
    let cartBtns = document.querySelectorAll('.add-cart');
    cartBtns.forEach((btn)=>{
        btn.addEventListener('click',addCart);
    });
    
    updateTotal();
}

//Remove item
function removeItem(){
    confirmBox.classList.remove('hidden');

    confirmBtn.addEventListener('click',()=>{
        let title = this.parentElement.querySelector('.cart-food-title').innerHTML ;
        itemList = itemList.filter(el=>el.title != title);
        this.parentElement.remove();
        closeConfirmBox();
        popupBox.classList.remove('hiddenpop');
        

        popupBtn.addEventListener('click',()=>{
            closePopupbox();
        });

        function closePopupbox(){
            popupBox.classList.add('hiddenpop');
        }
        loadContent();
    });
    cancelBtn.addEventListener('click',()=>{
        closeConfirmBox();
    });
    
    function closeConfirmBox(){
        confirmBox.classList.add('hidden');
    }
    
}
//Change Quantity
function changeQty(){
    if(isNaN(this.value) || this.value < 1){
        this.value = 1;
    }
    loadContent();
}

let itemList = [];

//Add Cart
function addCart(){
    let food = this.parentElement;
    let title = food.querySelector('.food-title').innerHTML;
    let price = food.querySelector('.food-price').innerHTML;
    let imgSrc = food.querySelector('.food-img').src;

    let newProduct = {title,price,imgSrc};
    // check product already exist in cart
    if(itemList.find((el)=>el.title == newProduct.title)){
        //product popup
        popupropBox.classList.remove('hiddenpoppro');

        popupproBtn.addEventListener('click',()=>{
            closePopupprobox();
        });

        function closePopupprobox(){
            popupropBox.classList.add('hiddenpoppro');
        }
        return
    }
    else{
        itemList.push(newProduct);
    }

    let newProductElement = createCartProduct(title,price,imgSrc);
    //Create div
    let element = document.createElement('div');
    element.innerHTML = newProductElement;
    let cartBasket = document.querySelector('.cart-content');

    cartBasket.append(element);
    loadContent();

}

function createCartProduct(title,price,imgSrc){
    return `
    <div class="cart-box">
      <img src="${imgSrc}" class="cart-img">
      <div class="detail-box">
        <div class="cart-food-title">${title}</div>
        <div class="price-box">
            <div class="cart-price">${price}</div>
            <div class="cart-amt">${price}</div>
        </div>
        <input type="number" value="1" class="cart-quantity">
       </div>
       <ion-icon name="trash-outline" class="cart-remove"></ion-icon>
    </div>
    `;
}

// update total

function updateTotal(){
    const cartItems = document.querySelectorAll('.cart-box');
    const totalValue = document.querySelector('.total-price');

    let total = 0;
    cartItems.forEach(product=>{
        let priceElement = product.querySelector('.cart-price');
        let price = parseFloat(priceElement.innerHTML.replace("Rs.",""));

        let qty = product.querySelector('.cart-quantity').value;
        total += (price * qty);
        product.querySelector('.cart-amt').innerText = "Rs." + (price*qty);

    });

    totalValue.innerHTML = "Rs." + total;

    //Add Product Count in cart Icon
    const cartCount = document.querySelector('.cart-count');
    let count = itemList.length;
    cartCount.innerHTML = count;

    if(count == 0){
        cartCount.style.display = 'none';
    }
    else{
        cartCount.style.display = 'block';
    }
}

// Order Confirmed

