new WOW().init();
// const auth = firebase.auth();
// const db = firebase.firestore();

  
///////////////////////////////////// SCROLL DOWN BUTTON ///////////////////////////////////////////

$(function() {
    $('.scroll-down').click (function() {
      $('html, body').animate({scrollTop: $('section.ok').offset().top }, 'slow');
      return false;
    });
  });

///////////////////////////////////// HIDE AND SHOW MODALS ///////////////////////////////////////////

  const logg = document.querySelector("#logg");
  logg.addEventListener("click", e => {
      $('#modalRegisterForm').modal('hide');
  });
  
  const reg = document.querySelector('#reg');
  reg.addEventListener("click", e => {
      $('#modalLoginForm').modal('hide');
  });


///////////////////////////////////// DISPLAY UI IF THE USER IS LOGGED IN OR NOT ///////////////////////////////////////////

const log = document.querySelector('#log');
const panel = document.querySelector('#panel');
const accountDetails = document.querySelector('#username');
const cart = document.querySelector('#cart');

const setupUI = user => {
    if(user) {
        // Account info
        const html = `
            ${user.email}
        `;
          accountDetails.innerHTML = html;
        //  signup.style.display = 'none';
          logout.style.display = 'block';
          log.style.display = 'none';
          panel.style.display = 'block';
          if (document.getElementById('cart')) {
            cart.style.display = 'block';
          }
          
         
        // addButton.style.display = 'block';
    } else {
      // hide account info
           logout.style.display = 'none';
           log.style.display = 'block';
           panel.style.display = 'none';
           if (document.getElementById('cart')) {
            cart.style.display = 'none';
          }
    // //   addButton.style.display = 'none';
    //   out.style.display = 'none';
    //     reg.addEventListener('click', e => {
    //       login.style.display = 'none';
    //       signup.style.display = 'block';
    //     });
    //     log.addEventListener('click', e => {
    //       login.style.display = 'block';
    //       signup.style.display = 'none';
    //     });
      
    }
};



///////////////////////////////////// DISPLAY THE CLOTHES LIST ///////////////////////////////////////////

const clothesRow = document.querySelector('#clothesrow');

const setupClothes = data => {

  //  if (data.length && document.getElementById('clothesrow')) {
      if (data.length) {
    let html = '';
    data.forEach(doc => {
        const clothes = doc.data();
        const col = `
         <div class="col-lg-3 col-md-6 mb-4">
            <!-- Card -->
            <div class="card card-cascade wider card-ecommerce">
              <!-- Card image -->
              <div class="view view-cascade overlay">
                <img src="${clothes.imageURL}" class="card-img-top shop-item-image"
                  alt="sample photo">
                <a>
                  <div class="mask rgba-white-slight"></div>
                </a>
              </div>
              <!-- Card image -->
              <!-- Card content -->
              <div class="card-body card-body-cascade text-center pb-0">
                <!-- Title -->
                <h5 class="card-title">
                  <strong>
                    <a href="" id='clothname' class='shop-item-title'>${clothes.name}</a>
                  </strong>
                </h5>
        
                <!-- Card footer -->
                <div class="card-footer mt-4">
                  <p class="float-left font-weight-bold mb-1 pb-2 shop-item-price">$ ${clothes.price}</p>
                  <a class="float-right material-tooltip-main" data-toggle="tooltip" data-placement="top" title="Add to Wishlist">
                    <i class="fas fa-heart grey-text ml-3" id='hearthover'></i>
                  </a>
                  <a class="float-right material-tooltip-main" data-toggle="tooltip" data-placement="top" title="Quick Look">
                    <i class="fas fa-eye grey-text ml-3" id='eyehover'></i>
                  </a>
                  <a class="float-right material-tooltip-main" data-toggle="tooltip" data-placement="top" title="Add to Cart">
                  <i class="fa fa-shopping-cart grey-text ml-2 shop-item-button" id='carthover'></i>
                </a>
                </div>
              </div>
              <!-- Card content -->
            </div>
            <!-- Card -->
          </div>
        `
       html += col
    });
    
    clothesRow.innerHTML = html;
  
    }   
    };
    
///////////////////////////////////// AUTHENTICATION STATUS ///////////////////////////////////////////



// listen to auth status changes
// Every time there is an auth change ( user logs in or logs out) the callback function will fire
auth.onAuthStateChanged(user => {
  // so if the user is logged in, do something, otherwise the user will not be logged in  
if(user) {
// get the data from the database
// db.collection('guides').get().then(snapshot => { - Old non-real time listener            where("userId", "==", user.uid)
db.collection('clothes').onSnapshot(snapshot => {
//     // we are passing this data array of documents, so we can cycle through it in index.js

   setupClothes(snapshot.docs);
  if( document.getElementsByClassName('cart-items')[0]) {
   setupCart();
  }
   setupUI(user);
//     // when we use onShapshot, we add the error message as second parameter, and not as a catch method
}, err => {
 console.log(err.message);
});

} else {
  // setupUI(user);
  // // if the user is not logged in, he will see an empty array without any data
  // // setupTodos([]);
  db.collection('clothes').onSnapshot(snapshot => {
    //     // we are passing this data array of documents, so we can cycle through it in index.js
       setupClothes(snapshot.docs);
       setupUI(user);
    //     // when we use onShapshot, we add the error message as second parameter, and not as a catch method
    }, err => {
     console.log(err.message);
    });
}
});

// Thing to notice - Firebase has automatic state persistence, so the user will be saved even upon refresh, like a local storage


// ///////////////////////////////////// REGISTER THE USER ///////////////////////////////////////////

// setTimeout(function(){
//   var kek = document.querySelector('.shop-item-button');
//   console.log(kek);
//    }, 1000);

const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', e => {
  e.preventDefault();
  
  // get user info
  // With the square brackets, we access the input fields id from the html
  // finally we get the value of what the user wrote
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;

  // Sign up the user with those details
  // This is an ASYNC task, so it will take some time to complete, so we add the then method
  // The .then method will fire when task completes, so in this case, when we get the credentials.
  auth.createUserWithEmailAndPassword(email, password).then( currentUser => {
   // firebase.firestore().collection('users').doc(currentUser.uid).set(currentUser)
        // we use return so we cn then use the .then method, then we use the doc method to match the uniq Id of the users that register on the document - match the users collection with auth user database
        signupForm.reset();
        console.log('New user is registered');
        $('#modalRegisterForm').modal('hide');
      });    
  });


///////////////////////////////////// LOG OUT THE USER ///////////////////////////////////////////


const logout = document.querySelector('#logout');

logout.addEventListener('click', e => {
  e.preventDefault();
  // using the sign out method provided by FareStore
  auth.signOut();
  console.log('User is logged out');
});


///////////////////////////////////// LOG IN THE USER ///////////////////////////////////////////


const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', e => {
  e.preventDefault();
  // Get the user info
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(email, password).then( cred => {
   
    loginForm.reset();
    console.log('user is logged in');
    $('#modalLoginForm').modal('hide');
  });
});


// auth.createUserWithEmailAndPassword(email, password).then( cred => {
//   return db.collection('users').doc(cred.user.uid).set({
//     name: signupForm['listitem'].value
//   });
//    }).then(() => {
// // we use return so we cn then use the .then method, then we use the doc method to match the uniq Id of the users that register on the document - match the users collection with auth user database
// signupForm.reset();
//    });    
// });




function setupCart() {
  var removeCartItemButtons = document.getElementsByClassName('fa fa-times');

  for(var i=0; i < removeCartItemButtons.length; i++) {
      var button = removeCartItemButtons[i];
      button.addEventListener('click', removeCartItem );
  }

  var quantityInputs = document.getElementsByClassName('cart-quantity-input');    
  for(var i=0; i < quantityInputs.length; i++) { 
      var input = quantityInputs[i];
      input.addEventListener('change', quantityChanged);
  }
  var addToCartButtons = document.getElementsByClassName('shop-item-button');
  for(var i=0; i < addToCartButtons.length; i++) {
      var button = addToCartButtons[i];
      button.addEventListener('click', addToCartClicked);
  }

  document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked);  
}

function purchaseClicked() {
  alert('Thank you for your purchase');
  var cartItems = document.getElementsByClassName('cart-items')[0];
  while (cartItems.hasChildNodes()){
    cartItems.removeChild(cartItems.firstChild);
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
      input.value = 1;
  }
  updateCartTotal();
}


function addToCartClicked(e) {
  var button = e.target;
  var shopItem = button.parentElement.parentElement.parentElement.parentElement;
  var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
  var price = shopItem.getElementsByClassName("shop-item-price")[0].innerText;
  var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src;
  addItemToCart(title,price,imageSrc);
  updateCartTotal();
}

function addItemToCart(title,price,imageSrc) {
   var cartRow = document.createElement('div');
   var cartItems = document.getElementsByClassName('cart-items')[0]; 
   var cartItemNames = cartItems.getElementsByClassName('cart-item-title');
   for (var i = 0; i < cartItemNames.length; i++) {
     if (cartItemNames[i].innerText == title) {
       alert('This item is already added to the cart!');
       return;
     }
   }
   var cartRowContents = `
    
   <div class='cart-row row'>
   <div class="col-lg-2 col-md-6 mb-4 colu"><a href="#"><i class="fa fa-times" aria-hidden="true"></i></a></div>
   <div class="col-lg-2 col-md-6 mb-4 colu"><img src='${imageSrc}' id='cartpic'></div>
   <div class="col-lg-2 col-md-6 mb-4 colu"><span class='cart-item-title'>${title}</span></div>
   <div class="col-lg-2 col-md-6 mb-4 colu">
   <input class="cart-quantity-input" type="number" value="1">
   </div>
   <div class="col-lg-2 col-md-6 mb-4 colu"><span class="cart-price">${price}</span></div>
 </div>  
   `
   cartRow.innerHTML = cartRowContents;
   cartItems.append(cartRow);
   cartRow.getElementsByClassName('fa fa-times')[0].addEventListener('click', removeCartItem);
   cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged);
}

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



    
    