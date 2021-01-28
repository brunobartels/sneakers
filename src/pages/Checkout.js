import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import '../css/Checkout.css';
import imgPayBanck from '../images/payModeOnlineBanck.png';
import imgPayCard from '../images/payModeCard.png';
import imgPayApple from '../images/payModeApple.png';

import {
  BrowserRouter as Router,
  Link,
  useParams
} from "react-router-dom";

export default class Checkout extends Component{
    constructor(props) {
		super(props);
		this.state = {
		  error: null,
		  isLoaded: false,
		  items: [],
		  step: 'Checkout',
		  isBoxVisible: "payBanck",
		  id: useParams
		};



		this.events = {
            startTransition: function(e){
                var totalCost = props.userStates.toralCoast.toFixed(2)
                window.PayWithMyBank.establish({
                  accessId: 'D61EC9BAF0BB369B9438',
                  merchantId: '1004314986',
                  metadata: { demo: 'enabled' },
                  currency: 'USD',
                  paymentType: 'Deferred',
                  amount: totalCost,
                  description: 'your@email.here',
                  merchantReference: '123456',
                  returnUrl: '#success',
                  cancelUrl: '#cancel'
                });

                window.PayWithMyBank.addPanelListener(function(command, event) {
                   if (command === 'event' && event.type === 'new_location') {
                     if (event.data.indexOf('#success') === 0) {
                           this.setState({step: "Checkout success"}, function () {
                               this.setState({step: "Checkout success view"})
                           });
                     } else {

                     }
                     return false;
                   }
                 }.bind(this));
            }.bind(this)
        }
        props.userStates.confirmation = "progress"
	}
    toggleBox = (evt) => {
      this.setState(prevState => ({ isBoxVisible: evt.target.id }));
    };
	 componentDidMount() {
	    document.title = "Checkout"
		fetch("https://voliveira.s3-sa-east-1.amazonaws.com/sneakers/index.json")
		  .then(res => res.json())
		  .then(
			(result) => {
			  this.setState({
				isLoaded: true,
				items: result.results
			  });
			},
			// Nota: É importante lidar com os erros aqui
			// em vez de um bloco catch() para não recebermos
			// exceções de erros dos componentes.
			(error) => {
			  this.setState({
				isLoaded: true,
				error
			  });
			}
		  )

		  const script = document.createElement("script");
		  script.src = "//sandbox.paywithmybank.com/start/scripts/pwmb.js?accessId=D61EC9BAF0BB369B9438";
		  script.async = true;
          document.body.appendChild(script);

          let { id } = useParams

	  }

	render() {
	    const { isBoxVisible } = this.state;
		const { error, isLoaded, items } = this.state;
		console.log("------------------------")
		console.log(this.state.id)
		if (error) {
		  return <section className="erroMsg"><h1>Product not found.</h1> <p>Please choose your Sneakes and try again</p> <Link to="/" className="medioButton"><i class="material-icons">arrow_back</i>Sneakers</Link></section>
		} else if (!isLoaded) {
		    return <div class="progress progressModule visible"><div class="indeterminate"></div></div>;
		} else {
		  var idFind = this.props.userStates.productId
		  var itemCart = items.filter(function(ponteiro){return (ponteiro.id == idFind)});
		  if(itemCart.length > 0){
              itemCart = itemCart[0]
              this.props.userStates.toralCoast = itemCart.price*this.props.userStates.productQnt
              return (
                <section className={this.state.step}>
                    <ul className="steps ">
                        <li className="step step1 active"><span className="circle"></span><span className="title">Cart</span></li>
                        <li className="step step2 active"><span className="circle"></span><span className="title">Payment options</span></li>
                        <li className="step step3"><span className="circle"></span><span className="title">Receipt</span></li>
                    </ul>
                    <div className="contentCart containerLimit">
                        <figure>
                            <img src={itemCart.maxresURL} title={itemCart.description} alt={itemCart.description}/>
                        </figure>
                        <div className="cartDetail check">
                            <div className="boxMobileFix">
                                <div className="cardTotal">
                                    <h2>Cart Total</h2>
                                    <h3>{itemCart.description}</h3>
                                    <p>{this.props.userStates.productQnt}x Green Size {this.props.userStates.productSize}</p>
                                    <p>Item #{itemCart.id}</p>
                                </div>
                                <div className="deliveryDetails">
                                    <h2>Delivery details</h2>
                                    <p>Jhon Smith</p>
                                    <p>Phone no: 01312428200</p>
                                    <p>Andress: Redwood City, 2000</p>
                                </div>
                                <div className="totalCost">
                                    <h3>Total cost</h3>
                                    <p>Delivery included</p>
                                    <p className="ttlCost">{this.props.userStates.toralCoast.toLocaleString('en-US',{style: 'currency', currency: 'USD'})}</p>
                                </div>
                            </div>
                            <div className="paymentMethod">
                                <h2>Select your payment method</h2>
                                <ul className="paymentOptns" value={isBoxVisible}>
                                    <li onClick={this.toggleBox} id="payBanck" className="payBanck tagSet">Online Banking <img src={imgPayBanck} alt="Online Banking" /><span className="tag">SAVE $10</span></li>
                                    <li onClick={this.toggleBox} id="payCard" className="payCard">Card payment <img src={imgPayCard} alt="Card payment" /></li>
                                    <li onClick={this.toggleBox} id="payApple"  className="payApple">Apple Pay <img src={imgPayApple} alt="Apple Pay" /></li>
                                </ul>
                            </div>
                            <button className="medioButton btContinue" onClick={this.events.startTransition}>Continue</button>
                        </div>
                        <div className="cartDetail confirmation">
                            <div className="cardTotal">
                                <h2>Order summary</h2>
                                <h3>{itemCart.description}</h3>
                                <p>{this.props.userStates.productQnt}x Green Size {this.props.userStates.productSize}</p>
                                <p>Item #{itemCart.id}</p>
                            </div>
                            <div className="paymentMethodConform">
                                <h2>Payment Method</h2>
                                <p><i className="material-icons">account_balance</i> Online Banking</p>
                            </div>
                            <div className="totalCost">
                                <h3>Total cost</h3>
                                <p>Delivery included</p>
                                <p className="ttlCost">{this.props.userStates.toralCoast.toLocaleString('en-US',{style: 'currency', currency: 'USD'})}</p>
                            </div>
                            <Link className="medioButton placeOrder" to="/">Place order</Link>
                        </div>
                    </div>
                </section>

              )

		  }else{
                return <section className="erroMsg"><h1>Product not found.</h1> <p>Please choose your Sneakes and try again</p> <Link to="/" className="medioButton"><i class="material-icons">arrow_back</i>Sneakers</Link></section>
		  }
		}
	}

}
