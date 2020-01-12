import React,{Component} from 'react'

 class Button extends Component{
  render(){
    const {...others} = this.props
    return (
      <>
      <button className="btn" {...others} />
      </>
    )
  }
}

export default Button
