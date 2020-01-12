import React,{Component} from 'react'

 class InputText extends Component{
  render(){
    const {...others} = this.props
    return <input type="text" {...others} />
  }
}

export default InputText
