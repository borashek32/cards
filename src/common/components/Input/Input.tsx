import i from "common/components/Input/styles.module.css"
import React, {ChangeEvent, FC} from "react"


type Props = {
  placeholder: string
  label?: string
  type: string
  options?: any
  extraClass?: string
  value: string
  onChange: (value: string) => void
}

export const Input: FC<Props> = ({
                                   onChange,
                                   extraClass,
                                   value,
                                   placeholder,
                                   label,
                                   type,
                                   options
}) => {

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) =>{
    onChange(e.currentTarget.value)
  }

  return (
    <>
      {label && <label>{label}</label>}
      <input
        onChange={onInputChange}
        value={value}
        placeholder={placeholder}
        type={type}
        className={i.inputField + " " + (extraClass && extraClass)}
      />
    </>
  )
}