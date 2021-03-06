import React from 'react';
import ClassNames from 'classnames';
import Ripple from '../ripple';
import events from '../utils/events';
import style from './style';

class Checkbox extends React.Component {
  static propTypes = {
    checked: React.PropTypes.bool,
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    label: React.PropTypes.any,
    name: React.PropTypes.string,
    onBlur: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onFocus: React.PropTypes.func
  };

  static defaultProps = {
    checked: false,
    className: '',
    disabled: false
  };

  handleClick = (event) => {
    events.pauseEvent(event);
    if (!this.props.disabled && this.props.onChange) {
      const value = !this.refs.input.checked;
      this.props.onChange(value, event);
    }
  };

  handleInputClick = (event) => {
    events.pauseEvent(event);
  };

  handleMouseDown = (event) => {
    if (!this.props.disabled) {
      this.refs.ripple.start(event);
    }
  };

  blur () {
    this.refs.input.blur();
  }

  focus () {
    this.refs.input.focus();
  }

  render () {
    const fieldClassName = ClassNames(style.field, {
      [style.disabled]: this.props.disabled
    }, this.props.className);

    const checkboxClassName = ClassNames(style.check, {
      [style.checked]: this.props.checked
    });

    return (
      <label
        data-react-toolbox='checkbox'
        className={fieldClassName}
        onClick={this.handleClick}
      >
        <input
          ref='input'
          {...this.props}
          className={style.input}
          onClick={this.handleInputClick}
          type='checkbox'
        />
        <span data-role='checkbox' className={checkboxClassName} onMouseDown={this.handleMouseDown}>
          <Ripple ref='ripple' data-role='ripple' className={style.ripple} spread={3} centered />
        </span>
        {this.props.label ? <span data-role='label' className={style.text}>{this.props.label}</span> : null}
      </label>
    );
  }
}

export default Checkbox;
