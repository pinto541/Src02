export const addItem = (item = [], count = 0, next = (f) => f) => {
  let cart = [];
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
      console.log('CART::', cart, item)
    }
    const isExist = cart.findIndex(v => v._id === item._id)
    console.log('ISNEW', isExist)

    // cart.push({
    //   ...item,
    //   count: 1,
    // });
    if (isExist >= 0) {
      cart[isExist].count =  cart[isExist].count +1 
    } else {
      cart.push({
        ...item, 
        count:1
      })
    }

    // remove duplicates
    // build an Array from new Set and turn it back into array using Array.from
    // so that later we can re-map it
    // new set will only allow unique values in it
    // so pass the ids of each object/product
    // If the loop tries to add the same value again, it'll get ignored
    // ...with the array of ids we got on when first map() was used
    // run map() on it again and return the actual product from the cart
    
    // cart = Array.from(new Set(cart.map((p) => p._id))).map((id) => {
    //   return cart.find((p) => p._id === id);
    // });
    console.log('CART::END', cart);

    localStorage.setItem("cart", JSON.stringify(cart));
    next();
  }
};

export const itemTotal = () => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart")).length;
    }
  }
  return 0;
};

export const getCart = () => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart"));
    }
  }
  return [];
};

export const updateItem = (productId, count) => {
  let cart = [];
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    cart.map((product, i) => {
      if (product._id === productId) {
        cart[i].count = count;
      }
    });

    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

export const removeItem = (productId) => {
  let cart = [];
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    cart.map((product, i) => {
      if (product._id === productId) {
        cart.splice(i, 1);
      }
    });

    localStorage.setItem("cart", JSON.stringify(cart));
  }
  return cart;
};

export const emptyCart = (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("cart");
    next();
  }
};
