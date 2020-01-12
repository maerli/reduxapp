import React,{Component} from 'react'

 class Col extends Component{
  render(){
    const {...others} = this.props
    return <div className="col" {...others} />
  }
}

export default Col
