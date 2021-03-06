/** @jsx React.DOM */

var CartsItem = React.createClass({displayName: "CartsItem",
  render: function () {
    var klick = this.props.klick,
        cartItem = this.props.cartItem;
    return (
      React.createElement("div", null, 
      cartItem.map(function (argument, index) {
        var _clas = index % 2 == 0 ? "active" : "n_active";
        return (
          React.createElement("li", {className: _clas, key: index+1}, cartItem[index].name, " ", React.createElement("span", {className: "price"}, cartItem[index].price, " $"), " ", React.createElement("div", {key: index, onClick: klick.bind(null, index), className: "btn_add"}))
          );
      })
      )
      );
  }
});

var CartTotal = React.createClass({displayName: "CartTotal",
  total_cart: function() {
    var _list = this.props.listI;
    if (_list[0] === undefined) {
      return 0;
     } else {
      var sum = _list.reduce(function (summ, current) {
      return summ + current.it_total;
       },0);
      return sum;
      };
  },
  render: function() {
    return (React.createElement("div", {className: "cart_total", onClick: this.props.handleTotal}, " In your cart: ", this.total_cart(), " items."));
  }
});

var TotalP = React.createClass({displayName: "TotalP",
  rows: function() {
    var _list = this.props.listI;
    if (_list[0] === undefined) {
      return 0;
     } else {
      var sum = _list.reduce(function (summ, current) {
      return summ + current.it_price*current.it_total;
       },0);
      return sum;
      };
  },

  render: function() {
    return (React.createElement("div", {className: "li_p"}, 
      React.createElement("p", {className: "total_p"}, "Общая стоимость товаров:"), 
      React.createElement("div", {className: "col-sm-12 total"}, this.rows()+" $"), 
      React.createElement("input", {type: "hidden", value: "Общая стоимость товаров: " + this.rows() +" P."})
      ));
  }
});

var Forma = React.createClass({displayName: "Forma",
  render: function(){
    var _list = this.props.listI,
        index = 0,
        remove = this.props.handleRemove;
    var betons = _list.map(function (item, index){
    var clas = index % 2 == 0 ? "active" : "n_active";  
      return React.createElement("li", {className: clas + " col-sm-12", key: index}, React.createElement("input", {type: "hidden", value: item.it_name + " X " + item.it_total + " : " + item.it_price*item.it_total + "$"}), item.it_name, " х ", item.it_total, " ", React.createElement("span", {className: "price"}, item.it_price*item.it_total, " $"), " ", React.createElement("div", {key: index, onClick: remove.bind(null, index), className: "remove"}));
    });
    return (
      React.createElement("div", null, 
        React.createElement("ul", {className: "list_ad"}, 
        betons
        )
      )
      );
  }
});

var Cart = React.createClass({displayName: "Cart",
  getInitialState: function() {
    return {listI: [], cartItem: [], anim: false};
  },

  componentWillMount: function () {
  $.ajax({
      url: "product.json",
      dataType: 'json',
      cache: false,
      success: function(data) {
        data.preventDefault;
        this.setState({cartItem: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("product.json", status, err.toString());
      }.bind(this)
    });
  },

  handleRemove: function(index) {
    var list = this.state.listI;
    if (list[index].it_total > 1) {
      cou = list[index].it_total--;
        count = list[index];
       this.setState({count: cou});
    } else
     var r_list = this.state.listI.splice(index, 1);
      this.setState({listI: this.state.listI}); 
  },

  handleClick: function(index) {
    var it_name = this.state.cartItem[index].name,
         it_price = this.state.cartItem[index].price,
         it_total = this.state.cartItem[index].total,
         list = this.state.listI,
         r;
    var anim_change = true;
    this.setState({anim: anim_change});

   var mm = list.some(function(item, i) {
      r = i;
    return item.it_name === it_name;
    }); 

    if (mm === false) {
        list = this.state.listI.concat([{it_name, it_price, it_total}]);
        this.setState({listI: list});
      } else {
       var total_ink = list[r].it_total++,
        total = list[r];
       this.setState({total: total_ink});
      };
  },

  handleAnim: function() {
    var anim_change = false;
    this.setState({anim: anim_change});
  },

  handleTotal: function() {
    var anim_change = true;
    this.setState({anim: anim_change});
  },

  render: function() {
    var setclass = this.state.anim ? "right-col1" : "right-col";
    return (
      React.createElement("div", {className: "col-md-12"}, 
        React.createElement("h2", null, "Ordering"), 
        React.createElement(CartTotal, {handleTotal: this.handleTotal, listI: this.state.listI}), 
        React.createElement("div", {className: "col-md-8 col-md-offset-2"}, 
        React.createElement("h4", null, "Our products:"), 
          React.createElement("ul", {className: "list"}, 
          React.createElement(CartsItem, {cartItem: this.state.cartItem, klick: this.handleClick})
          )
        ), 
        React.createElement("div", {className: setclass + " col-md-2"}, 
        React.createElement("div", {className: "close1", onClick: this.handleAnim}, "X"), 
          React.createElement("form", {className: "form-horizontal"}, 
          React.createElement(Forma, {listI: this.state.listI, handleRemove: this.handleRemove}), 
          React.createElement(TotalP, {listI: this.state.listI}), 
          React.createElement("div", {className: "form-group"}, 
            React.createElement("label", {className: "col-sm-12 control-label labl"}, "Ваше имя"), 
            React.createElement("div", {className: "col-sm-12"}, 
            React.createElement("i", {className: "inp_name"}), 
              React.createElement("input", {type: "text", className: "form-control form_inp", id: "inputPassword3", placeholder: "Введите имя"})
            )
          ), 
          React.createElement("div", {className: "form-group"}, 
            React.createElement("label", {className: "col-sm-12 control-label labl"}, "Ваш телефон"), 
            React.createElement("div", {className: "col-sm-12"}, 
            React.createElement("i", {className: "inp_tel"}), 
              React.createElement("input", {type: "text", className: "form-control form_inp", id: "inputPassword3", placeholder: "Введите телефон"})
            )
          ), 
          React.createElement("div", {className: "form-group"}, 
            React.createElement("label", {for: "inputEmail3", className: "col-sm-12 control-label labl"}, "Ваш email"), 
            React.createElement("div", {className: "col-sm-12"}, 
              React.createElement("i", {className: ""}), 
              React.createElement("input", {type: "email", className: "form-control form_inp", id: "inputEmail3", placeholder: "Введите email"})
            )
          ), 
          React.createElement("div", {className: "form-group"}, 
            React.createElement("div", {className: "bot_inp col-sm-12"}, 
              React.createElement("button", {type: "submit", className: "btn_form"}, "Заказать")
            )
          )
          )
        )
        )
      );
  }
});
React.render(React.createElement(Cart, null), document.getElementById('example'));
