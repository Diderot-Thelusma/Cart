$(document).ready(function() {
  var cartItems = [];

  function addItem(itemName, itemPrice, itemQuantity) {
    var itemSubtotal = itemPrice * itemQuantity;
    cartItems.push({
      name: itemName,
      price: itemPrice,
      quantity: itemQuantity,
      subtotal: itemSubtotal
    });
  }

  function removeItem(index) {
    cartItems.splice(index, 1);
  }

  function calculatePrices() {
    var totalPrice = 0;
    $('#cart-items tr').each(function() {
      var itemPrice = parseFloat($(this).find('.item-price').text());
      var itemQuantity = parseInt($(this).find('.item-quantity').text());
      var itemSubtotal = itemPrice * itemQuantity;
      totalPrice += itemSubtotal;
      $(this).find('.item-subtotal').text(itemSubtotal.toFixed(2));
    });
    $('#total-price').text(totalPrice.toFixed(2));
  }

  $('#add-item').click(function(e) {
    e.preventDefault();
    var itemName = $('#item-name').val();
    var itemPrice = parseFloat($('#item-price').val());
    var itemQuantity = parseInt($('#item-quantity').val());
    addItem(itemName, itemPrice, itemQuantity);
    var row = `
  <tr>
    <td>${itemName}</td>
    <td class="item-price">${itemPrice.toFixed(2)}</td>
    <td class="item-quantity">${itemQuantity}</td>
    <td class="item-subtotal">${(itemPrice * itemQuantity).toFixed(2)}</td>
    <td><button class="remove-item">Remove</button></td>
  </tr>
`;

    $('#cart-items').append(row);
    calculatePrices();
  });

  $('#cart-items').on('click', '.remove-item', function() {
    var index = $(this).closest('tr').index();
    removeItem(index);
    $(this).closest('tr').remove();
    calculatePrices();
  });
});
