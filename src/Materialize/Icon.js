import React,{Component} from 'react'

 class Icon extends Component{
  render(){
    const {...others} = this.props
    return (
      <>
      <i className="material-icons" {...others}  >
        {this.props.type}
      </i>
      </>
    )
  }
}

export default Icon
