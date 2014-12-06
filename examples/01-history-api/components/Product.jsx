var React = require('react'),
    Fluxex = require('fluxex'),

Product = React.createClass({
    mixins: [
        Fluxex.mixin,
        {listenStores: ['productStore']}
    ],

    getStateFromStores: function () {
        return this.getStore('productStore').get('data');
    },

    getInitialState: function () {
        return this.getStateFromStores();
    },

    onStoreChange: function () {
        this.setState(this.getStateFromStores());
    },

    render: function () {
        return (
        <div>
         <h3>{this.state.title}</h3>
         <p>{this.state.description}</p>
         <span>Price:{this.state.price}</span>
         <i>Serial(random):{this.state.serial}</i>
         <h4>Related products</h4>
         <ul>
          <li><a href="/product?id=123">ID = 123</a></li>
          <li><a href="/product?id=456">ID = 456</a></li>
          <li><a href="/product?id=789">ID = 789</a></li>
         </ul>
        </div>
        );
    }
});

module.exports = Product;