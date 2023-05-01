import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react'
import s from 'common/components/Button/styles.module.css'


type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement>

type SuperButtonPropsType = DefaultButtonPropsType & {
  xType?: string
  name: string
  callback?: () => void
  className?: string
}

const Button: React.FC<SuperButtonPropsType> = (
  {
    callback,
    name,
    xType,
    className,
    disabled,
    ...restProps
  }
) => {

  const finalClassName = s.button
      + (disabled ? ' ' + s.disabled
      : xType === 'default' ? ' ' + s.default
        : xType === 'red' ? ' ' + s.red
          : xType === 'secondary' ? ' ' + s.secondary
            : '')

  return (
    <button
      onClick={callback}
      disabled={disabled}
      className={className ? finalClassName + " " + className : finalClassName}
      type={restProps.type}
      {...restProps}
    >
      {name}
    </button>
  )
}

export default Button
