import React from 'react';
import axios from 'axios';
import { useContext, useState, useEffect } from "react";
import { tokenContext } from '../../App';
import "./Wishlist.css"
/////////// hehehe 

const WishList = () => {
    let saveToken = localStorage.getItem("saveToken")
    let token = useContext(tokenContext);

    const [insideWishlist, setInsideWishlist] = useState([])
    let wishlist = {}
    useEffect(()=>{getWishlist()},[])

    const getWishlist = () => {
        axios.get(`http://localhost:5000/wishlist`, {
            headers: { Authorization: `Bearer ${saveToken}` }
        }).then((res) => {
            setInsideWishlist(res.data.products)
        }).catch((err) => {
            console.log(err);
        })
    }


    const deleteWishlist = (id) =>{
        console.log("id" , id);
        axios
          .delete(`http://localhost:5000/wishlist/${id}`).then((result)=>{
            getWishlist()
          }).catch((err)=>{
            console.log(err)
          })
      }

       
    return(
        <div className="container">
            <h4>Wishlist</h4>
            <div className="WishlistPerant">
            {insideWishlist&&
            insideWishlist.map((elem , i )=>{
                if(wishlist[elem.product[0]._id]){
                    wishlist[elem.product[0]._id]+=1 
                }else{
                    wishlist[elem.product[0]._id]=1 
                return( <div className="wishlistBox">
                <img src={elem.product[0].img} />
                <div className="titelWishlist"> 
                <h3>{elem.product[0].title}</h3>
                <p>{elem.product[0].description}</p>
                <p>{elem.product[0].newprice} JD</p>
                </div>
                
                <button onClick={()=>{deleteWishlist(elem._id)}}> delete  </button>
                
                </div> 
                
                );
                }
            })}
              <hr></hr>
        </div>
      
        </div>
        
    )

}

export default WishList