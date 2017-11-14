import {Component} from 'react';
import style from './style.scss';
import Button from 'components/uis/form/Button';
import InputText from 'components/uis/form/InputText';
import {connect} from 'libs/kea';
import logic from './logic';


export default (key) => {

  @logic(key)
  class ButtonWithCode extends Component {
    static defaultProps = {
      buttonText: '获取验证码',
      timedoutTextTmpl: (countdown) => `重发(${countdown}s)`,
      onGetCode: (evt) => true,
    };

    render() {
      const {
        buttonText,
        timedoutTextTmpl,
        onGetCode,

        countdown,
        lock,
        dispatch,
        actions,

        onChange,
        onBlur,
        className,
        children,

        ...rest
      } = this.props;
      const codeBtnText = countdown ? timedoutTextTmpl(countdown) : buttonText;

      const inputProp = {onChange, onBlur, ...rest};


      return (
        <div className="wapper">
          <InputText {...inputProp}/>
          <Button
            className="with-code"
            disabled={lock}
            onClick={(evt) => {
              onGetCode(evt) && !lock && actions.buttonTimedout(5);
            }}
          >{codeBtnText}</Button>
          <style jsx>{style}</style>
        </div>
      );
    }
  }

  return ButtonWithCode;
}