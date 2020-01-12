import React,{Component} from 'react'

 class Test extends Component{
  render(){
    const {navigate} = this.props
    return (
      <>
      <div> Test </div>
      <button onClick={()=>navigate('About')}> About </button>
      </>
    )
  }
}

export default Test
