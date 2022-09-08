import React from 'react';
import db from '../firebase';
import { doc, getDoc, updateDoc, setDoc, deleteField,onSnapshot } from "firebase/firestore";

class Main extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      cart:[],
      main: [],
      selected:'',
      details:{
        img:"https://source.unsplash.com/rlwE8f8anOc"
      }
    };
    this.createElements = this.createElements.bind(this)
    this.onClick = this.onClick.bind(this)
    this.addToCart = this.addToCart.bind(this)
    
    let wholeMenu = {}
  }
  
  onClick(e,value){
    const target = e.target.innerHTML
    // console.log(this.state)
    this.setState({selected:target,details:value})
  }
  addToCart(){
    if (this.state.selected ){
    this.setState(prevState => ({
        cart: [...prevState.cart, this.state.selected]
    }))  
    }  

  }
  createElements(menuItems){
    let returnList = []
    for (let [key, value] of Object.entries(menuItems)) {
      
       returnList.push(<li key={key}><a onClick={async e=>{
         this.onClick(e,value)
       }} >{key}</a></li>)
    }     
      
    return returnList
  }
  async componentDidMount() {
    const docRef = doc(db, "Menu", "Menu");
    const unsub = onSnapshot(docRef, (doc) => {
    const docSnap = doc;
    // if (docSnap.exists()) {
    //   console.log(docSnap.data())
    // } else {
    //   console.log("No such document!");
    // }
    this.wholeMenu = docSnap.data()
    const mainList = this.createElements(this.wholeMenu.main)
    this.setState({main:mainList})
    });
    
  }
  render() {
    // console.log(this.state.cart)
    return <div className='flex'>
      <ul className="w-1/3 flex justify-center menu bg-base-100 w-56 p-2 rounded-box">
        <li className="menu-title">
          <span>Main menu</span>
        </li>
        {this.state.main}
     
          <div className="divider"></div>
        <div className="indicator">
        <span className="indicator-item badge badge-secondary">{this.state.cart.length}</span> 
        <button onClick=  {async ()=>
          this.setState({
            cart:[]
          })
        } className="btn ml-8">Cart</button>
      </div>
        <li className="menu-title">
          <span>Click on cart to remove items --testing-- </span>
        </li>
      </ul>

      <div className='w-2/3'>
        <div className="flex justify-center flex-wrap m-auto ">
          <div className=" p-5 ...">
            <div className="card w-96 bg-base-100 shadow-xl ">
              <figure className="px-10 pt-10">
                <img src={this.state.details.img} alt="Select Item" className="rounded-xl" />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">{this.state.selected}</h2>
                <p>{this.state.details.desc}</p>
                <div className="card-actions">
                  <button onClick={this.addToCart} className="btn btn-primary">Add to cart</button>
                </div>
              </div>
            </div>
          </div>
          </div>
      </div>
    </div>

  }
}

export default Main;