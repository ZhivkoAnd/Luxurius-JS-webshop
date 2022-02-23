if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', setupCart);
} else {
    setupCart();
}



$('.minus-btn').on('click', function(e) {
    e.preventDefault();
    var $this = $(this);
    var $input = $this.closest('div').find('input');
    var value = parseInt($input.val());
  
    if (value > 1) {
        value = value - 1;
    } else {
        value = 0;
    }
  
  $input.val(value);
  updateCartTotal();
  });
  
  $('.plus-btn').on('click', function(e) {
    e.preventDefault();
    var $this = $(this);
    var $input = $this.closest('div').find('input');
    var value = parseInt($input.val());
  
    if (value < 100) {
      value = value + 1;
    } else {
        value =100;
    }
  
    $input.val(value);
    updateCartTotal();
  
  });
  
  
  function setupCart() {
    var removeCartItemButtons = document.getElementsByClassName('fa fa-times');
  
    for(var i=0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i];
        button.addEventListener('click', removeCartItem );
    }
  
    var quantityInputs = document.getElementsByClassName('cart-quantity-input');    
    for(var i=0; i < quantityInputs.length; i++) { 
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged);
    }
    var addToCartButtons = document.getElementsByClassName('shop-item-button');
    for(var i=0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i];
        button.addEventListener('click', addToCartClicked);
    }
    updateCartTotal();
  }
  
  function removeCartItem(e) {
    var buttonClicked = e.target;
        buttonClicked.parentElement.parentElement.parentElement.remove();
        updateCartTotal();
  }
  
  
  function quantityChanged(e) {
    var input = e.target;
    if (isNaN(input.value)|| input.value <= 0) {
        input.value =1;
    }
    updateCartTotal();
  }
  
  
  function addToCartClicked(e) {
    var button = e.target;
    var shopItem = button.parentElement.parentElement.parentElement.parentElement;
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
    var price = shopItem.getElementsByClassName("shop-item-price")[0].innerText;
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src;
    console.log(title,price, imageSrc);
  }
  
  // var kek = document.querySelector('.shop-item-title');
  // console.log(kek);
  
  function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName('cart-items')[0];
  var cartRows = cartItemContainer.getElementsByClassName('cart-row');
  var total = 0;
  for(var i=0; i < cartRows.length; i++) {
      var cartRow = cartRows[i];
      var priceElement = cartRow.getElementsByClassName('cart-price')[0];
      var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
      var price = parseFloat(priceElement.innerText.replace('$', ''));
      var quantity = quantityElement.value;
      total = total + (price * quantity);
  
  }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total;
  }
  
  
  // let p = new Promise((resolve, reject) => {
  //     let a = 1 + 1;
  //     if ( a == 2 ) {
  //         resolve('success');
  //     } else {
  //         reject ('failed');
  //     }
  // });
  
  // p.then((message) => {
  //     console.log('This is in the then' + message);
  // }).catch((message) => {
  //     console.log('This is in the catch' + message);
  // });
  
  
  
      
      