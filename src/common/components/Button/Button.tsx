import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react'
import s from 'common/components/Button/styles.module.css'

// тип пропсов обычной кнопки, children в котором храниться название кнопки там уже описан
type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement>

type SuperButtonPropsType = DefaultButtonPropsType & {
  xType?: string
  name: string
  callback: () => void
}

const Button: React.FC<SuperButtonPropsType> = (
  {
    callback,
    name,
    xType,
    className,
    disabled,
    ...restProps // все остальные пропсы попадут в объект restProps, там же будет children
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
      className={finalClassName}
      type={restProps.type}
      {...restProps} // отдаём кнопке остальные пропсы если они есть (children там внутри)
    >
      {name}
    </button>
  )
}

export default Button
