import React,{Component} from 'react'
import {Button,Card} from '../Materialize'
class Home extends Component{
 render(){
   const {navigate} = this.props
   return (
     <>
     <div> Comprar GiftCard </div>
     <Button onClick={()=>navigate('GiftCard')}> GiftCards </Button>
     {new Array(9).fill(0).map((v,i)=><Button key={i }>{i+1}</Button>)}
     <Card/>
     </>

   )
 }
}

export default Home
