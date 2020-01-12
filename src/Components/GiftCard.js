import React,{Component} from 'react'
import {Col,Row,InputText,Button} from '../Materialize'
class GiftCard extends Component{
  constructor(props){
    super(props)
    const {active,setState} = this.props
    this.handleInputPhoneNumber = this.handleInputPhoneNumber.bind(this)
    this.handleInputValue = this.handleInputValue.bind(this)
  }
  handleInputPhoneNumber(event){
    this.props.setState({phoneNumber: event.target.value})
  }
  handleInputValue(event){
    this.props.setState({value: event.target.value})
  }
  async fetchData(){
    const {phoneNumber,value} = this.props.active.state
    const url = window.location.protocol + "//"+window.location.hostname
    const req = await fetch('https://edfb691b.ngrok.io/graphql',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        query:`
            mutation CreateOrder{
              createOrder(phoneNumber:"${phoneNumber}",value:"${value}"){
                id
                phoneNumber
                value
              }
            }
        `
      })
    })
    const res = await req.json()
    const data = res.data
    alert('seu pedido será processado, em breve enviamos uma resposta!')
  }
  render(){
    const {navigate,active} = this.props
    return (
      <Col style={styles.container}>
        <Row>
          <InputText
            value={active.state.phoneNumber}
            onChange={this.handleInputPhoneNumber}
            placeholder="(88) 99999-0000"
            />
        </Row>
        <Row>
          R$ <InputText value={active.state.value} onChange={this.handleInputValue} placeholder="00,00"/>
        </Row>
        <Row>
          Insira um valor entre R$ 10,00 e R$ 300,00
        </Row>
        <Row >
          <Button className="btn green" onClick={()=>this.fetchData()}> Pedir </Button>
        </Row>
      </Col>
    )
  }
}
const styles = {
  container:{
    padding:'50px',
    backgroundColor:'white',
    height:'100vh',
    width:'100vw'
  }
}

export default GiftCard
