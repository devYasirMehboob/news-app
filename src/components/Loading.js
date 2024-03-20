import React, {Component} from 'react';
import Loader from './Loader.gif';

export default class Loading extends Component {
  render() {
    return (
      <div className="text-center my-3">
            <img src={Loader} alt="Loader"/>
      </div>
    )
  }
}
