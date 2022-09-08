import React from 'react';
import db from '../firebase';
import { doc, getDoc, updateDoc, deleteField,onSnapshot } from "firebase/firestore";

class Add extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      main: [],
      special: [],
      name:'',
      desc:'',
      img:'',
      special:false
    };
    this.createElements = this.createElements.bind(this)
    this.onClick = this.onClick.bind(this)
    this.handleChangeName = this.handleChangeName.bind(this)
    this.handleChangeDesc = this.handleChangeDesc.bind(this)
    this.handleChangeImg = this.handleChangeImg.bind(this)
    this.addItem = this.addItem.bind(this)
    this.specialOr = this.specialOr.bind(this)
    
    this.wholeMenu = {}
  }
  onClick(e,value){
    const target = e.target.innerHTML
    this.setState({selected:target,details:value})
  }
  async addItem(){
    const docRef = doc(db, "Menu", "Menu");
    if(this.state.specialOr){
      await updateDoc(docRef,{
      ['special.'+this.state.name]:{desc:this.state.desc,img:this.state.img}
    })
    }
    else{
    await updateDoc(docRef,{
      ['main.'+this.state.name]:{desc:this.state.desc,img:this.state.img}
    })  
    }
    
    window.location.pathname = '/admin'
  }
  specialOr(e){
    if(e.target.checked){
      this.setState({specialOr:true})
    }
    else{
      this.setState({specialOr:false})
    }
  }
  async componentDidMount() {
    const docRef = doc(db, "Menu", "Menu");
    const unsub = onSnapshot(docRef, (doc) => {
    const docSnap = doc;
    // if (docSnap.exists()) {
    //   console.log("Updated: ",docSnap.data())
    // } else {
    //   console.log("No such document!");
    // }
    this.wholeMenu = docSnap.data()
    const mainList = this.createElements(this.wholeMenu.main)
    const specialList = this.createElements(this.wholeMenu.special)
    this.setState({main:mainList,special:specialList})
    });
    
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
  handleChangeName(event) {
    this.setState({name: event.target.value});
  }handleChangeDesc(event) {
    this.setState({desc: event.target.value});
  }handleChangeImg(event) {
    this.setState({img: event.target.value});
  }
  render() {
    return  <div className='flex'>
      <ul className="w-1/3 menu bg-base-100 w-56 p-2 rounded-box">
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

    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <div className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
<input type="text" placeholder="Type here" onChange={this.handleChangeName} className="input input-bordered " value={this.state.name} />  
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
<input type="text" placeholder="Type here" onChange={this.handleChangeDesc} className="input input-bordered " value={this.state.desc} />  <label className="label">
          </label>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Image link</span>
          </label>
<input type="text" placeholder="Type here" onChange={this.handleChangeImg} className="input input-bordered " value={this.state.img} />  <label className="label">
          </label>
        </div>
        <div className="form-control">
  <label className="label cursor-pointer">
    <span className="label-text">Special</span>
    <input type="checkbox" className="toggle toggle-primary" onChange={this.specialOr}/>
  </label>
</div>
        <div className="form-control mt-6">
          <button onClick={this.addItem}className="btn btn-primary">Add</button>
        </div>
      </div>
      
    </div>
      </div>
    </div>
  }
}

export default Add;