// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"scripts/index.js":[function(require,module,exports) {
new WOW().init(); // const auth = firebase.auth();
// const db = firebase.firestore();
///////////////////////////////////// SCROLL DOWN BUTTON ///////////////////////////////////////////

$(function () {
  $('.scroll-down').click(function () {
    $('html, body').animate({
      scrollTop: $('section.ok').offset().top
    }, 'slow');
    return false;
  });
}); ///////////////////////////////////// HIDE AND SHOW MODALS ///////////////////////////////////////////

var logg = document.querySelector("#logg");
logg.addEventListener("click", function (e) {
  $('#modalRegisterForm').modal('hide');
});
var reg = document.querySelector('#reg');
reg.addEventListener("click", function (e) {
  $('#modalLoginForm').modal('hide');
}); ///////////////////////////////////// DISPLAY UI IF THE USER IS LOGGED IN OR NOT ///////////////////////////////////////////

var log = document.querySelector('#log');
var panel = document.querySelector('#panel');
var accountDetails = document.querySelector('#username');
var cart = document.querySelector('#cart');

var setupUI = function setupUI(user) {
  if (user) {
    // Account info
    var html = "\n            ".concat(user.email, "\n        ");
    accountDetails.innerHTML = html; //  signup.style.display = 'none';

    logout.style.display = 'block';
    log.style.display = 'none';
    panel.style.display = 'block';

    if (document.getElementById('cart')) {
      cart.style.display = 'block';
    } // addButton.style.display = 'block';

  } else {
    // hide account info
    logout.style.display = 'none';
    log.style.display = 'block';
    panel.style.display = 'none';

    if (document.getElementById('cart')) {
      cart.style.display = 'none';
    } // //   addButton.style.display = 'none';
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
}; ///////////////////////////////////// DISPLAY THE CLOTHES LIST ///////////////////////////////////////////


var clothesRow = document.querySelector('#clothesrow');

var setupClothes = function setupClothes(data) {
  //  if (data.length && document.getElementById('clothesrow')) {
  if (data.length) {
    var html = '';
    data.forEach(function (doc) {
      var clothes = doc.data();
      var col = "\n         <div class=\"col-lg-3 col-md-6 mb-4\">\n            <!-- Card -->\n            <div class=\"card card-cascade wider card-ecommerce\">\n              <!-- Card image -->\n              <div class=\"view view-cascade overlay\">\n                <img src=\"".concat(clothes.imageURL, "\" class=\"card-img-top shop-item-image\"\n                  alt=\"sample photo\">\n                <a>\n                  <div class=\"mask rgba-white-slight\"></div>\n                </a>\n              </div>\n              <!-- Card image -->\n              <!-- Card content -->\n              <div class=\"card-body card-body-cascade text-center pb-0\">\n                <!-- Title -->\n                <h5 class=\"card-title\">\n                  <strong>\n                    <a href=\"\" id='clothname' class='shop-item-title'>").concat(clothes.name, "</a>\n                  </strong>\n                </h5>\n        \n                <!-- Card footer -->\n                <div class=\"card-footer mt-4\">\n                  <p class=\"float-left font-weight-bold mb-1 pb-2 shop-item-price\">$ ").concat(clothes.price, "</p>\n                  <a class=\"float-right material-tooltip-main\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Add to Wishlist\">\n                    <i class=\"fas fa-heart grey-text ml-3\" id='hearthover'></i>\n                  </a>\n                  <a class=\"float-right material-tooltip-main\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Quick Look\">\n                    <i class=\"fas fa-eye grey-text ml-3\" id='eyehover'></i>\n                  </a>\n                  <a class=\"float-right material-tooltip-main\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Add to Cart\">\n                  <i class=\"fa fa-shopping-cart grey-text ml-2 shop-item-button\" id='carthover'></i>\n                </a>\n                </div>\n              </div>\n              <!-- Card content -->\n            </div>\n            <!-- Card -->\n          </div>\n        ");
      html += col;
    });
    clothesRow.innerHTML = html;
  }
}; ///////////////////////////////////// AUTHENTICATION STATUS ///////////////////////////////////////////
// listen to auth status changes
// Every time there is an auth change ( user logs in or logs out) the callback function will fire


auth.onAuthStateChanged(function (user) {
  // so if the user is logged in, do something, otherwise the user will not be logged in  
  if (user) {
    // get the data from the database
    // db.collection('guides').get().then(snapshot => { - Old non-real time listener            where("userId", "==", user.uid)
    db.collection('clothes').onSnapshot(function (snapshot) {
      //     // we are passing this data array of documents, so we can cycle through it in index.js
      setupClothes(snapshot.docs);

      if (document.getElementsByClassName('cart-items')[0]) {
        setupCart();
      }

      setupUI(user); //     // when we use onShapshot, we add the error message as second parameter, and not as a catch method
    }, function (err) {
      console.log(err.message);
    });
  } else {
    // setupUI(user);
    // // if the user is not logged in, he will see an empty array without any data
    // // setupTodos([]);
    db.collection('clothes').onSnapshot(function (snapshot) {
      //     // we are passing this data array of documents, so we can cycle through it in index.js
      setupClothes(snapshot.docs);
      setupUI(user); //     // when we use onShapshot, we add the error message as second parameter, and not as a catch method
    }, function (err) {
      console.log(err.message);
    });
  }
}); // Thing to notice - Firebase has automatic state persistence, so the user will be saved even upon refresh, like a local storage
// ///////////////////////////////////// REGISTER THE USER ///////////////////////////////////////////
// setTimeout(function(){
//   var kek = document.querySelector('.shop-item-button');
//   console.log(kek);
//    }, 1000);

var signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', function (e) {
  e.preventDefault(); // get user info
  // With the square brackets, we access the input fields id from the html
  // finally we get the value of what the user wrote

  var email = signupForm['signup-email'].value;
  var password = signupForm['signup-password'].value; // Sign up the user with those details
  // This is an ASYNC task, so it will take some time to complete, so we add the then method
  // The .then method will fire when task completes, so in this case, when we get the credentials.

  auth.createUserWithEmailAndPassword(email, password).then(function (currentUser) {
    // firebase.firestore().collection('users').doc(currentUser.uid).set(currentUser)
    // we use return so we cn then use the .then method, then we use the doc method to match the uniq Id of the users that register on the document - match the users collection with auth user database
    signupForm.reset();
    console.log('New user is registered');
    $('#modalRegisterForm').modal('hide');
  });
}); ///////////////////////////////////// LOG OUT THE USER ///////////////////////////////////////////

var logout = document.querySelector('#logout');
logout.addEventListener('click', function (e) {
  e.preventDefault(); // using the sign out method provided by FareStore

  auth.signOut();
  console.log('User is logged out');
}); ///////////////////////////////////// LOG IN THE USER ///////////////////////////////////////////

var loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', function (e) {
  e.preventDefault(); // Get the user info

  var email = loginForm['login-email'].value;
  var password = loginForm['login-password'].value;
  auth.signInWithEmailAndPassword(email, password).then(function (cred) {
    loginForm.reset();
    console.log('user is logged in');
    $('#modalLoginForm').modal('hide');
  });
}); // auth.createUserWithEmailAndPassword(email, password).then( cred => {
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

  for (var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i];
    button.addEventListener('click', removeCartItem);
  }

  var quantityInputs = document.getElementsByClassName('cart-quantity-input');

  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener('change', quantityChanged);
  }

  var addToCartButtons = document.getElementsByClassName('shop-item-button');

  for (var i = 0; i < addToCartButtons.length; i++) {
    var button = addToCartButtons[i];
    button.addEventListener('click', addToCartClicked);
  }

  document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked);
}

function purchaseClicked() {
  alert('Thank you for your purchase');
  var cartItems = document.getElementsByClassName('cart-items')[0];

  while (cartItems.hasChildNodes()) {
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

  if (isNaN(input.value) || input.value <= 0) {
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
  addItemToCart(title, price, imageSrc);
  updateCartTotal();
}

function addItemToCart(title, price, imageSrc) {
  var cartRow = document.createElement('div');
  var cartItems = document.getElementsByClassName('cart-items')[0];
  var cartItemNames = cartItems.getElementsByClassName('cart-item-title');

  for (var i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
      alert('This item is already added to the cart!');
      return;
    }
  }

  var cartRowContents = "\n    \n   <div class='cart-row row'>\n   <div class=\"col-lg-2 col-md-6 mb-4 colu\"><a href=\"#\"><i class=\"fa fa-times\" aria-hidden=\"true\"></i></a></div>\n   <div class=\"col-lg-2 col-md-6 mb-4 colu\"><img src='".concat(imageSrc, "' id='cartpic'></div>\n   <div class=\"col-lg-2 col-md-6 mb-4 colu\"><span class='cart-item-title'>").concat(title, "</span></div>\n   <div class=\"col-lg-2 col-md-6 mb-4 colu\">\n   <input class=\"cart-quantity-input\" type=\"number\" value=\"1\">\n   </div>\n   <div class=\"col-lg-2 col-md-6 mb-4 colu\"><span class=\"cart-price\">").concat(price, "</span></div>\n </div>  \n   ");
  cartRow.innerHTML = cartRowContents;
  cartItems.append(cartRow);
  cartRow.getElementsByClassName('fa fa-times')[0].addEventListener('click', removeCartItem);
  cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged);
}

function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName('cart-items')[0];
  var cartRows = cartItemContainer.getElementsByClassName('cart-row');
  var total = 0;

  for (var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i];
    var priceElement = cartRow.getElementsByClassName('cart-price')[0];
    var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
    var price = parseFloat(priceElement.innerText.replace('$', ''));
    var quantity = quantityElement.value;
    total = total + price * quantity;
  }

  total = Math.round(total * 100) / 100;
  document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total;
} // let p = new Promise((resolve, reject) => {
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
},{}],"../../../Users/Zhivko/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "65422" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../Users/Zhivko/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","scripts/index.js"], null)
//# sourceMappingURL=/scripts.bcf3243b.js.map