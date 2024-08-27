
  // cart item increase 
  function itemPlus(e, el) {
    var id = $(el).data('id');
    var qty = $(el).prev().val();
    qty = parseInt(qty) + 1;
    console.log('qty ' + qty);
    $.ajax({
        type : "POST",
        url:'/cart/change.js',
        data: {
            id: parseFloat(id),
            quantity: qty
        },
        dataType:'json',
        success:function(data) {
            cart_item_update();
            $(el).text(qty);
            // console.log('Increased');
        },
        error:function(err) {
            console.log('Error')
        }
    })
  }
  // cart item decrease
  function itemMinus(e, el) {
    var id = $(el).data('id');
    var qty = $(el).next().val();
    qty = parseInt(qty) - 1;
    if(qty >= 1) {
        $(el).text(qty);
        $.ajax({
            type : "POST",
            url:'/cart/change.js',
            data: {
                id: parseFloat(id),
                quantity: qty
            },
            dataType:'json',
            success:function(data) {
                cart_item_update();
                
            },
            error:function(err) {
                console.log('Error')
            }
        })
    }
  }
  // cart item decrease
  function itemRemoved(e, el) {
    var id = $(el).data('id');
    $.ajax({
        type : "POST",
        url:'/cart/change.js',
        data: {
            id: parseFloat(id),
            quantity: 0
        },
        dataType:'json',
        success:function(data) {
            cart_item_update();
        },
        error:function(err) {
            console.log('Error')
        }
    })
  }
  
  
  // cart item update 
  function cart_item_update() {
    fetch('/?section_id=cart-items')
        .then(reponse => reponse.text())
        .then(cartData => {
            var cart_html = $(cartData);
            var cart_empty = $('.cart-empty', cart_html);
            var cart_items = $('.cart-table', cart_html);
            var cart_summary = $('.summary-details', cart_html);
            $('.cart-empty').replaceWith(cart_empty);
            $('.cart-table').replaceWith(cart_items);
            $('.summary-details').replaceWith(cart_summary);
    });
  
    $.getJSON('/cart.js', function(cart){
        var total_items = cart.item_count;
        $('.item_count').text(total_items);
    })
  }
  