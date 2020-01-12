import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

function createRoutes(routesIndex){

  const navigate = (component) =>( {type:'go',component})
  const setState = (state) => ( {type:'state',state} )

  const mapStateToProps = store => ({active:store})
  const mapDispatchToProps = dispatch => bindActionCreators({navigate,setState},dispatch)

  for(let route in routesIndex){
    routesIndex[route] = connect(mapStateToProps,mapDispatchToProps)(routesIndex[route])
  }
  return {routes:routesIndex,routesIndex:Object.keys(routesIndex)}
}

export default createRoutes
