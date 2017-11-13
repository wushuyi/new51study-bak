import {Component} from 'react';
import style from './style.scss';

export default class InputText extends Component {
  render() {
    const {onChange, onBlur, className, ...rest} = this.props;
    return (
      <div>
        <input
          {...rest}
          className={`input ${className || ''}`}
          onChange={(e) => {
            if (onChange) {
              onChange(e.target.value, e);
            }
          }}
          onBlur={(e) => {
            if (onBlur) {
              onBlur(e);
            }
          }}
        />
        <style jsx>{style}</style>
      </div>
    );
  }
}
