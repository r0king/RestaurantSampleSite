import React from 'react';
import db from '../firebase';
import { doc, getDoc, updateDoc, setDoc, deleteField,onSnapshot } from "firebase/firestore";

class Admin extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      main: [],
      special: [],
      selected:'',
      details:''
    };
    this.createElements = this.createElements.bind(this)
    this.onClick = this.onClick.bind(this)
    this.removeItem = this.removeItem.bind(this)

    let wholeMenu = {}
  }
  
  onClick(e,value){
    const target = e.target.innerHTML
    // console.log(e,value)
    this.setState({selected:target,details:value})
  }
  async removeItem(){    
    const docRef = doc(db, "Menu", "Menu");
    const rootMain = 'main.'+this.state.selected
    const rootSpecial = 'special.'+this.state.selected

    await updateDoc(docRef,{
      [rootMain]:deleteField()
    })
      await updateDoc(docRef,{
      [rootSpecial]:deleteField()
    })
    this.state = {
      main: [],
      special: [],
      selected:'',
      details:''
    };
    await this.componentDidMount()
    
  }
  createElements(menuItems){
    // console.log(menuItems)
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
    const specialList = this.createElements(this.wholeMenu.special)
    this.setState({main:mainList,special:specialList})
    });
    
  }
  render() {
    return <div className='flex'>
      <ul className="w-1/3 menu bg-base-100 w-56 p-2 rounded-box">
        <li key="home"><a href="/">Home</a></li>
        <li className="menu-title">
          <span>Main menu</span>
        </li>
        {this.state.main}
        <li className="menu-title">
          <span>Specials</span>
        </li>
        {this.state.special}
        
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
                  <a href="/addItem">
                  <button className="btn btn-primary" >Add +</button>
                  </a>
                  <button onClick={this.removeItem} className="btn btn-primary">Remove</button>
                </div>
              </div>
            </div>
          </div>
          </div>
      </div>
    </div>

  }
}

export default Admin;