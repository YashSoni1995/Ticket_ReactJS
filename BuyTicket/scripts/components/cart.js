/** @jsx React.DOM */



var Cart = React.createClass({

    getInitialState: function() {
      // also subscribe to product events here
      $.subscribe('cart.added', this.addItem);
      $.subscribe('cart.removed', this.removeItem);

      return {
        items: [],
        total: 0,
        currency: '₹'
      };
    },

    addItem: function(e, item) {
      this.state.items.push(item);
      this.forceUpdate();

      this.countTotal();
    },

    removeItem: function(e, itemId) {
      var itemIndexInArray;

      this.state.items.some(function(item, index) {
        if(item.id === itemId) {
          itemIndexInArray = index;
          return true;
        }
      });

      this.state.items.splice(itemIndexInArray, 1);
      this.forceUpdate();

      this.countTotal();
    },

    countTotal: function() {
      var total = 0;

      this.state.items.forEach(function(item, index) {
        total += item.price;
      });

      this.setState({
        total: total
      })
    },

    

    render: function() {

        var items = this.state.items.map(function(item) {
            return (
              <li key={item.id} className="cart-item">
                <span className="cart-item__name">{item.name}</span>
                <span className="cart-item__price">{item.currency}{item.price}</span>
               

              </li>
            )
        });

        var body = (
          <ul>
            {items}
          </ul>
        );

        var empty = <div className="alert alert-danger">No Tickets Chosen yet!</div>;

        return (
          <div>
            <div>
              {items.length > 0 ? body : empty}
            </div>
             <div className="cart__total">Subtotal: {this.state.currency}{this.state.total} </div>
          </div>
        );
    }
});
