/** @jsx React.DOM */

var Product = React.createClass({
    getInitialState: function() {
      return {
        added: false
      };
    },

    addToCart: function(e) {
      if(!this.state.added) {
        // add
        $.publish('cart.added', this.props.data);
      }
      else {
        // remove
        $.publish('cart.removed', this.props.data.id);
      }

      this.setState({
        added: !this.state.added
      });
    },

    render: function() {
        // assign to props
        var data = this.props.data;

        return (
          
         <div className="thumbnail col-md-12">
            <div className="col-md-9">
            <h3 className="card-header">{data.name}</h3>

              <div className="product_price">{data.desc}</div></div>
                <div className="product_button-wrap col-md-3">
                <div className="product_price1"><h4>₹{data.price}</h4></div>
                  <button className={this.state.added ? 'btn btn-primary' : 'btn btn-primary'} onClick={this.addToCart}>
                  {this.state.added ? 'Cancel' : 'BUY'}
                </button>
              </div>

          </div>

         
        );
    }
});
