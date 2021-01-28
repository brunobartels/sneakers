import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";


export default class ProductsList extends Component{

	constructor(props) {
		super(props);
		this.state = {
		  error: null,
		  isLoaded: false,
		  items: [],
		};
        this.events = {
            clickItemCart: function(e){
                var productId = e.target.getAttribute("data-id")
                props.userStates.productId = productId
                props.userStates.productSize = document.getElementById("size_"+productId).value;
                props.userStates.productQnt = document.getElementById("qtd_"+productId).value;
            }.bind(this),

            searchAction: function(e){
                var matcher = new RegExp(document.getElementById("inputSearch").value, "gi");
                for (var i=0;i<document.getElementsByClassName("wrap").length;i++) {
                    if (
                        matcher.test(document.getElementsByClassName("itemDescription")[i].innerHTML)
                    ) {
                    document.getElementsByClassName("wrap")[i].style.display="inline-block";
                    } else {
                    document.getElementsByClassName("wrap")[i].style.display="none";
                    }
                }
            }.bind(this)
        }
	}

    componentDidMount() {
        document.title = "Sneakers"
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
    }

    render() {
		const { error, isLoaded, items } = this.state;
		if (error) {
		  return <section className="erroMsg"><h1>Something wrong.</h1> Check your connection and try again</section>
		} else if (!isLoaded) {
		  return <div class="progress progressModule home"><div class="indeterminate"></div></div>;
		} else {
		  return (
		    <section className="ProductsList">
            	<div className="search">
            	    <i className="material-icons">search</i>
					<input name="search" id="inputSearch" placeholder="Search for your sneaker" onChange={this.events.searchAction} type="text"/>
				</div>
				<div className="list">
					{
					  items.map(item => (
					  	<div className="wrap">
							<div className="product" key={item.id}>
								<img src={item.thumbnailURL} title={item.description} alt={item.description}/>
								<h1 className="itemDescription">{item.description}</h1>
								<label>Size</label>
								<select id={"size_"+item.id} name="Size">
									<option value="37">37</option>
									<option value="39">39</option>
									<option value="41">41</option>
									<option value="42">42</option>
									<option value="43">43</option>
								</select>
								<label>Quantity</label>
								<select id={"qtd_"+item.id} name="Quantity">
									<option value="1">1</option>
									<option value="2">2</option>
									<option value="3">3</option>
									<option value="4">4</option>
									<option value="5">5</option>
									<option value="6">6</option>
									<option value="7">7</option>
									<option value="8">8</option>
									<option value="9">9</option>
								</select>
								<p className="price">{Number(item.price).toLocaleString('en-US',{style: 'currency', currency: 'USD'})}</p>
								<Link className="medioButton addToCard" to={"/Checkout/"+item.id} data-id={item.id} onClick={this.events.clickItemCart}>Checkout</Link>
							</div>
						</div>
					  ))
				   }
				</div>
            </section>
		  )
		}
  	}
}