import React,{Component} from 'react'

 class Row extends Component{
  render(){
    const {...others} = this.props
    return <div className="row" {...others} />
  }
}

export default Row
