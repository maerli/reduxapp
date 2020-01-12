import React,{Component} from 'react'

 class About extends Component{
  render(){
    const {navigate} = this.props
    return (
      <>
      <div> About </div>
      <button onClick={()=>navigate('Home')}> Voltar </button>
      </>
    )
  }
}

export default About
