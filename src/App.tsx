import React, {Component} from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Main_content from './components/Main_content/Main_content';
import Heder_container from './components/Header/Heder_container';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { authotized } from './redux/appReducer';
import loaderGif from './assets/loader.gif'
import s from './assets/loader.module.css'
import {AppStateType} from "./redux/redux";


type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
  authotized: () => void
}

class App extends Component<MapPropsType & DispatchPropsType> {
  componentDidMount() {
    this.props.authotized();
  }
  render() {
    if (!this.props.authotizedSuccess) {
      return <div className={s.loader}><img src={loaderGif} /></div>
    }
    return (

      <div className='app-wrapper' >
        <Heder_container />
        <Navbar />
        <Main_content />
      </div>

    );
  }
}

const mapStateToProps = (state:AppStateType) => {
  return {
    authotizedSuccess: state.app.authotized
  }
}

export default compose<React.ComponentType>(
  withRouter,
  connect(mapStateToProps, { authotized }),
)(App);
