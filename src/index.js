import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import 'materialize-css/dist/css/materialize.min.css'
import './css/google-fonts.css'
import './index.css'

import {Home,Test,About,GiftCard} from './Components'

import {Button,Icon} from './Materialize'

import createRoutes from './router'

import * as serviceWorker from './serviceWorker'

const initial_app_state = {
  all:[],
  history:[],
  state:{}
}
let send = (arg)=>{
  if(window.android && window.android.send){
    return window.android.send(JSON.stringify(arg))
  }else{
      return arg
  }
}
function reducer(state = initial_app_state,type){
  switch(type.type){
    case 'go':
      const index = state.history.indexOf(type.component)
      if(index !== (state.history.length - 1) || state.history.length == 0) {
        return {...state,history:state.history.concat(type.component)}
      }else{
        return state
      }

    case 'all': return {...state,all:type.all}
    case 'back':
      if(state.history.length !== 1){
        return {...state,history:state.history.slice(0,-1)}
      }else{
        return state
      }
    case 'state':
      return {...state,state:{...state.state,...type.state}}
    default : return state
  }
}

const store = createStore(reducer )

const {routes,routesIndex} = createRoutes({
  Home,Test,About,GiftCard
})

const options = {
  noButton:['GiftCard']
}

store.dispatch({type:'go',component:'Home'})
store.dispatch({type:'all',all:routes})

window.store = store
class RealApp extends Component{
  constructor(props){
    super(props)
    this.state = {
      active:store.getState().history[0]
    }
    store.subscribe(()=>{
      const history = store.getState().history
      this.setState({active:history[history.length-1]},()=>{
        console.log(store.getState().history)
      })
    })
  }
  getIcon(route){
    switch(route){
      case "Home": return "home"
      case "About": return "today"
      case "Test" : return "shopping_cart"
    }
  }
  render(){
    const {active} = this.state
    const Render = routes[active]
    const goto = (route)=> store.dispatch({type:'go',component:route})
    const back = ()=> store.dispatch({type:'back'})

    const what = options.noButton.indexOf(active)
    window.Alert = (response)=>{
      if(response){
        goto('About')
      }
    }
    return (
      <Provider store={store}>
      <Button onClick={(event)=>{
        var data = send({data:'message',title:"send",message:"sending !!!",callback:"window.Alert"})
        event.target.innerHTML = data
      }
    } >data </Button>
        {
          what !== -1  && <Button style={{margin:'10px'}} className="btn white btn-floating" onClick={()=>back()}> <Icon style={{color:'black'}}  type="arrow_back"/> </Button>
        }
        <Render/>
        {what === -1 && <table style={styles.footerButtons}>
          <tbody>
          <tr>
          {routesIndex.map((route,id)=>{
            let type = this.getIcon(route)
            if(options.noButton.indexOf(route) === -1){
              const isActive = this.state.active === route
            return (
              <td style={{textAlign:'center',backgroundColor:isActive?'rgba(0,0,0,0.5)':'white'}} key={id} onClick={()=>goto(route)}>
                <div><Icon type={type} style={{color:isActive?'white':'black'}}/></div>
                {route}
                </td>
            )
          }else{
            return null
          }
          })}
          </tr>
          </tbody>
          </table>
        }
      </Provider>
    )
  }
}

const styles = {
  footerButtons:{
    width:'100%',
    position:'fixed',
    textAlign:'center',
    fontSize:'11px',
    bottom:0
  }
}

ReactDOM.render((
  <RealApp/>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
