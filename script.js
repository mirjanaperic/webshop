// Slider
var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("slide");
  
  if (n > x.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";    
  } 
  x[slideIndex-1].style.display = "block";
}

// Change dots color
window.onscroll = function() {
  scrollPosY = window.scrollY;
  console.log(scrollPosY); 
  changeColor();
}  

var dotLink = document.getElementsByClassName("dot-link");

for (var i = 0; i < dotLink.length; i++) {
  dotLink[i].addEventListener("click", function() {
  var current = document.getElementsByClassName("active");
  current[0].className = current[0].className.replace(" active", "");
  this.className += " active";
  });
}

let showcase = document.getElementById("js-showcase");
var showcaseDot = document.getElementById('showcase-dot');

let table = document.getElementById("js-table");
let tableSectionTop = table.getBoundingClientRect().top;
let tableDot = document.getElementById('tables-dot');

let timeline = document.getElementById("js-timeline");
let timelineSectionTop = timeline.getBoundingClientRect().top;
let timelineDot = document.getElementById('timeline-dot');

let footer = document.getElementById("js-footer");
let footerSectionTop = footer.getBoundingClientRect().top;
let footerDot = document.getElementById('footer-dot');

function changeColor() { 
  if(scrollPosY == 0) {
    removeDotColor();
    showcaseDot.classList.add('active');
    for (var i = 0; i < dotLink.length; i++) {
      dotLink[i].classList.add('active-blue');
    }
  } else if (scrollPosY >= tableSectionTop && scrollPosY <= timelineSectionTop){
    removeDotColor();
    tableDot.classList.add('active');
    for (var i = 0; i < dotLink.length; i++) {
      dotLink[i].classList.add('active-black');
    }
  } else if (scrollPosY >= timelineSectionTop && scrollPosY <= footerSectionTop){
    removeDotColor();
    timelineDot.classList.add('active');
    for (var i = 0; i < dotLink.length; i++) {
      dotLink[i].classList.add('active-blue');
    }
  } else if (scrollPosY >= footerSectionTop){
    removeDotColor();
    footerDot.classList.add('active');
    for (var i = 0; i < dotLink.length; i++) {
      dotLink[i].classList.add('active-black');
    }
  } 
}
function removeDotColor() {
  for (var i = 0; i < dotLink.length; i++) {
    dotLink[i].classList.remove('active');
    dotLink[i].classList.remove('active-black');
    dotLink[i].classList.remove('active-blue');
  }
}


//  Insert flags

function makeFlag(el) {
  let array = [];
  array.push(el.value);
  for(let i = 0; i < array.length; i ++) {
    let element = `
    <div class="flag-item">
      <a class="flag-link">${el.value}
        <span class="flag-delete"></span>
      </a>
    </div>
    `
    document.getElementById("flag").innerHTML += element; 
  }
}

// Items list

const list = document.getElementById('js-list');
let cartContainer = document.getElementById('js-shop-cart');
let cart = document.getElementById('js-cart-list');
let total = null

let totalCart = document.getElementById('js-total');
let totalHeader = document.getElementById('js-total-header');

// data for list of products
let dataList = []

// store for mutation
let store = [];

// header cart
let headerCartBrand = document.getElementById('js-header-cart__brand');
let headerCartImg = document.getElementById('js-header-cart__img');
let headerCartCollection = document.getElementById('js-header-cart__collection');
let headerCartItemNo = document.getElementById('js-header-cart__item-no');
let headerCart = document.getElementById('js-header-cart');
let headerCartCounter = document.getElementById('js-header-cart__counter');
let headerCartClose = document.getElementById('js-header-cart__close');

let storeCounter = 0;

let data = [
  {
    id: '08490289428',
    image: './images/earings1.png',
    brand: 'Swarovski',
    price: 400,
    color: 'black',
    material: 'gold',
    count: 1,
    add: 'ADD',
  },
  {
    id: '4204820990',
    image: './images/earings2.png',
    brand: 'ETTIKA',
    price: 400,
    color: 'black',
    material: 'gold',
    count: 1,
    add: 'ADD',
  },
  {
    id: '408298437897',
    image: './images/earings3.png',
    brand: 'Jill Jacobs',
    price: 400,
    color: 'black',
    material: 'gold',
    count: 1,
    add: 'ADD',
  },
  {
    id: '7492178239',
    image: './images/earings4.png',
    brand: 'Swarovski',
    price: 400,
    color: 'black',
    material: 'bronze',
    count: 1,
    add: 'ADD',
  },
  {
    id: '79849206942',
    image: './images/earings5.png',
    brand: 'Swarovski',
    price: 4000,
    color: 'black',
    material: 'gold',
    count: 1,
    add: 'ADD',
  },
  {
    id: '40274827492',
    image: './images/earings1.png',
    brand: 'Swarovski',
    price: 800,
    color: '',
    material: 'silver',
    count: 1,
    add: 'ADD',
  }
]


function StoreItem(id, image, brand, price, color, material, count, total) {
  this.id = id;
  this.image = image;
  this.brand = brand;
  this.price = price;
  this.color = color;
  this.material = material;
  this.count = count;
  this.total = total;
}

// Load list

function loadItems() {
  
  let itemsList =  document.createElement('ul');

  for(x of dataList) {
    let item = `<li class="list-item shop-item-product-wrap">
                  <div class="shop-item-product" id="${x.id}">
                      <div class="shop-item shop-item__image-container">
                        <i class="shop-item__icon-star far fa-star"></i>
                        <img class="shop-item__image" src="${x.image}"/>
                      </div>
                      <p class="shop-item__brand">${x.brand}</p>
                      <p class="shop-item shop-item__price">$${x.price}</p>
                      <div id="js-counter" class="shop-item shop-item__counter">
                        <div class="counter__num">${x.count}</div>
                        <div class="shop-item__counter-arrows">
                            <i class="fas fa-angle-up"></i>
                            <i class="fas fa-angle-down"></i>
                        </div>
                      </div>
                      <button class="shop-item shop-item__add-btn btn btn--primary">${x.add}
                        <i class="list-btn-icon fas fa-shopping-cart add-btn_icon"></i>
                      </button>
                  </div>
                  <div class="shop-item-product__info">
                    <div class="shop-item-product__info-image">
                        <img class="shop-item__icon-img" src="./images/earings1.png"/>
                        <img class="shop-item__icon-img" src="./images/earings2.png"/>
                        <img class="shop-item__icon-img" src="./images/earings3.png"/>
                    </div>
                    <p class="shop-item__description">Color: ${x.color}</p>
                    <p class="shop-item__description">Brand: ${x.brand}</p>
                    <p class="shop-item__description">Material: ${x.material}</p>
                  </div>
                </div>
              </li>`
        itemsList.innerHTML += item
  }

  list.append(itemsList);
}



// Add item listener

list.addEventListener('click', function(e) {

  const items = document.getElementsByClassName('shop-item-product-wrap');

    //highlight item in list
    for(let i = 0; i < items.length; i++) {
      items[i].classList.remove('highlight')
    }
  
    if(e.target.className.match('shop-item-product-wrap')) {
        e.target.classList.add('highlight')
    } else if(e.target.parentElement.className.match('shop-item-product-wrap')) {
      e.target.parentElement.classList.add('highlight')
    } else if(e.target.parentElement.parentElement.className.match('shop-item-product-wrap')) {
      e.target.parentElement.parentElement.classList.add('highlight')
    } else if(e.target.parentElement.parentElement.parentElement.className.match('shop-item-product-wrap')) {
      e.target.parentElement.parentElement.parentElement.classList.add('highlight')
    } 

    //Add to store
    if(e.target.className.match('shop-item__add-btn')) {
      id = e.target.parentElement.getAttribute('id')
      addToStore(id);
    }

  // Header cart
  headerCart.classList.add('active');
  headerCart.style.display = "block";

  setTimeout(function() {
    headerCart.classList.remove('active');
    headerCart.style.display = "none";
  }, 30000);

});

headerCartClose.addEventListener('click', function() {
  headerCart.classList.remove('active');
  headerCart.style.display = "none";
});



// add item handler
function addToStore(id) {
  
  //add item to dataList for mutation
  dataList.find(item => {
      if(item.id == id) {
          total += item.price;

        let addedItem = new StoreItem(
          item.id,
          item.image,
          item.brand,
          item.price, 
          item.color,
          item.material,
          item.count,
          item.total
        );

        store.push(addedItem);
    
        storeCounter = store.length;
        headerCartCounter.innerHTML = storeCounter;
        
        // update ui
        getTotal();
        // update header cart
        headerCartBrand.innerHTML = item.brand;
        headerCartImg.setAttribute('src', item.image)
        headerCartItemNo.innerHTML = item.id;

        return item
      }
  });
  let cartList = document.createElement('ul')
  
  for(x of store) {
      let product = `
                    <li class="cart-item" id="${x.id}">
                      <button class="removeBtn removeFromStoreBtn cart-item__remove-btn">
                        x
                      </button>
                        <div>
                          <p class="my-cart__brand">${x.brand}</p>
                          <span class="my-cart__color">${x.color}</span>
                        </div>   
                        <p class="my-cart__price">$${x.price}</p> 
                        <div id="counter" class="shop-item__counter">
                          <div class="counter__num">${x.count}</div>
                          <div class="shop-item__counter-arrows">
                              <i class="fas fa-angle-up"></i>
                              <i class="fas fa-angle-down"></i>
                          </div>
                      </div>
                    </li>
                  `
      cartList.innerHTML += product
  }
  updateCartUI(cartList);
}


// Remove item

// Remove item listener
//***********************
cart.addEventListener('click', function(e) {

  let id = e.target.parentElement.getAttribute('id')

  if(e.target.className.match('removeBtn')) {

    store.find(item => {
      if(item.id == id) {
       
        total = total - item.listing

        totalCart.innerHTML = '';
        totalHeader.innerHTML = '';
        totalCart.innerHTML = total;
        totalHeader.innerHTML = total;
      }
    })
      removeFromStore(id)
  }
})

// Remove item handler
//***********************
function removeFromStore(id) {
  let list = store.filter(item => {
      if(item.id == id) {
        console.log('item', item)
      } 
      return item.id !== id
  });
  
  let cartList = document.createElement('ul');
  
  for(x of list) {
      let product = `
                    <li class="cart-item" id="${x.id}">
                    <button class="removeBtn removeFromStoreBtn cart-item__remove-btn">
                      x
                    </button>
                      <div>
                        <p class="my-cart__brand">${x.brand}</p>
                        <span class="my-cart__color">${x.color}</span>
                      </div>   
                      <p class="my-price">$${x.price}</p> 
                      <div id="counter" class="shop-item__counter">
                        <div class="counter__num">${x.count}</div>
                        <div class="shop-item__counter-arrows">
                            <i class="fas fa-angle-up"></i>
                            <i class="fas fa-angle-down"></i>
                        </div>
                    </div>
                  </li>
                  `
      cartList.innerHTML += product
  }
  store = list;
  storeCounter = store.length;
  headerCartCounter.innerHTML = storeCounter;
  updateCartUI(cartList);

  getTotal()
}

// Get total
function getTotal() {
  for(let i = 0; i < store.length; i++) {
   
    totalCart.innerHTML = '';
    totalHeader.innerHTML = '';
    totalCart.innerHTML = '$' + total;
    totalHeader.innerHTML = '$' + total;
  }
}

// Init
function init() {
  dataList = data
  loadItems();
}
(function() {
  init()
})();

// Update UI
function updateCartUI(list) {
  cart.innerHTML = ''
  cart.append(list)
}


// My cart scripts

// Show my cart
let addBtn = document.querySelectorAll('.shop-item__add-btn');

  for(let i = 0; i < addBtn.length; i++) {
    addBtn[i].addEventListener('click', function() {
      cartContainer.classList.add('open');
      addBtn[i].innerHTML = 'ADDED <i class="fas fa-check"></i>';
      addBtn[i].style.backgroundColor = '#536b94';
      addBtn[i].setAttribute('disabled', true);
    });
  }  
// Hide my cart
let checkout = document.getElementById('js-check-out');

checkout.addEventListener('click', function() {
  cartContainer.classList.remove('open');
});


// Show and hide modal 
 
window.addEventListener('click', function(e) {
  if(e.target.classList.contains('shop-item__icon-img')) {

    let modal = document.getElementById('modal');
    let modalImg = document.getElementById('modal__image');

    modal.classList.add('open');
    modalImg.setAttribute('src', e.target.src)
  }
})

let closeModal = document.getElementById('js-modal-close');
  closeModal.addEventListener('click', function() {
  modal.classList.remove('open');
})