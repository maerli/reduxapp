import React,{Component} from 'react'

 class Table extends Component{
   constructor(props){
     super(props)
     this.state = {
       table:[]
     }
   }
   async componentDidMount(){
     let table = await new Promise((resolve,reject)=>{
       setTimeout(()=>resolve(['marcos','maerli','pereira']),3000)
     })
     this.setState({table})
   }
  render(){
    const {navigate} = this.props
    return (
      <>
      <div> <h1> Mesas </h1> </div>
      <button onClick={()=>navigate('About')}> Voltar </button>
      {this.state.table.map((table,id)=>{
        return (<div key={id} > {table} </div>)
      })}
      </>
    )
  }
}

export default Table
