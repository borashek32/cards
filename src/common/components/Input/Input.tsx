import React, {
  ChangeEvent,
  DetailedHTMLProps,
  InputHTMLAttributes,
  KeyboardEvent,
  ReactNode, useState,
} from 'react'
import s from 'common/components/Input/styles.module.css'
import eye from 'img/eye.png'

// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement>

// здесь мы говорим что у нашего инпута будут такие же пропсы как у обычного инпута, кроме type
// (чтоб не писать value: string, onChange: ...; они уже все описаны в DefaultInputPropsType)
type SuperInputTextPropsType = DefaultInputPropsType & {
  // и + ещё пропсы которых нет в стандартном инпуте
  onChangeText?: (value: string) => void
  onEnter?: () => void
  error?: ReactNode
  spanClassName?: string
  label?: string
  valueInvisible: boolean
}

const Input: React.FC<SuperInputTextPropsType> = (
  {
    value,
    onChange,
    onChangeText,
    onKeyPress,
    onEnter,
    error,
    className,
    spanClassName,
    id,
    label,
    type,
    valueInvisible = false,
    placeholder,

    ...restProps // все остальные пропсы попадут в объект restProps
  }
) => {

  const [inputValue, setInputValue] = useState(value)
  const [val, setVal] = useState(false)
  const [valueHidden, setValueHidden] = useState(valueInvisible)

  const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e) // если есть пропс onChange, то передать ему е (поскольку onChange не обязателен)
    onChangeText?.(e.currentTarget.value)
    setInputValue(e.currentTarget.value)
  }

  const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
    onKeyPress?.(e)
    onEnter && // если есть пропс onEnter
    e.key === 'Enter' && // и если нажата кнопка Enter
    onEnter() // то вызвать его
  }

  const onInputFocus = () => setVal(true)
  const changeInputType = () => setValueHidden(!valueHidden)
  const onInputBlur = () => {
    inputValue ? setVal(true) : setVal(false)
  }
  const inputType = valueHidden ? "password" : type

  const finalSpanClassName = s.error
    + (spanClassName ? ' ' + spanClassName : '')
  const finalInputClassName = s.input
    + (error ? ' ' + s.errorInput : ' ' + s.superInput)
    + (className ? ' ' + s.className : '') // задача на смешивание классов



  return (
    <div className={s.inputWrapper}>
      {val && <div className={s.inputLabel}>{label}</div>}
      <input
        id={id}
        type={inputType}
        onFocus={onInputFocus}
        onBlur={onInputBlur}
        onChange={onChangeCallback}
        onKeyPress={onKeyPressCallback}
        className={finalInputClassName}
        autoComplete="new-password"
        placeholder={val ? '' : placeholder}
        value={value}

        {...restProps} // отдаём инпуту остальные пропсы если они есть (value например там внутри)
      />
      {valueInvisible
        && (valueHidden
          ? <img onClick={changeInputType} src={eye} alt="eye img" className={s.inputEye}/>

          : <>
              <img onClick={changeInputType} src={eye} alt="eye img" className={s.inputEye}/>
              <div className={s.inputEyeCrossLine}></div>
            </>
        )
      }
      {/*<span*/}
      {/*    id={id ? id + '-span' : undefined}*/}
      {/*    className={finalSpanClassName}*/}
      {/*>*/}
      {/*    {error}*/}
      {/*</span>*/}
    </div>
  )
}

export default Input
