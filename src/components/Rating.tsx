import React from 'react';
import db from '../firebase';
import { doc, getDoc, updateDoc, setDoc, deleteField,onSnapshot } from "firebase/firestore";

class Rating extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      rating:'asdfasdfdsfgsdfg',
      ratingElems : []
    };  
    this.createElements = this.createElements.bind(this)
    this.wholeMenu = {}
  }
  
    async componentDidMount() {
    const docRef = doc(db, "Menu", "Review");
    const unsub = onSnapshot(docRef, (doc) => {
    const docSnap = doc;
    // if (docSnap.exists()) {
    //   console.log(docSnap.data())
    // } else {
    //   console.log("No such document!");
    // }
    this.wholeMenu = docSnap.data()
      
    const ratingElemsList = this.createElements(this.wholeMenu.review)
    this.setState({ratingElems:ratingElemsList})
    });
    
  }
  createElements(menuItems){
    let returnList = []
    menuItems.forEach(item=>      
       returnList.push(<div className="card m-5 w-96 m-auto bg-base-100 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title">{item.rating} <span className="mask mask-star-2 bg-orange-400 h-5 w-5"></span></h2>
                  <p>{item.desc}</p>
                  
                </div>
              </div>)
    )
      
    return returnList
  }
  render() {
    // console.log(this.state)
    return <div>
      <a style={{marginLeft: '40%'}} href='/'><button className=" m-auto btn btn-xs sm:btn-sm md:btn-md lg:btn-lg">Home</button></a>
       <div className='m-auto flex '>
        {this.state.ratingElems}
            </div>
    </div>
  }
}

export default Rating;