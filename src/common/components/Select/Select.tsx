import React, {
  SelectHTMLAttributes,
  DetailedHTMLProps,
  ChangeEvent, CSSProperties,
} from 'react'
import s from 'common/components/Select/styles.module.css'

type DefaultSelectPropsType = DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
  >

type SuperSelectPropsType = DefaultSelectPropsType & {
  options?: any[]
  onChangeOption?: (option: any) => void
  st?: CSSProperties | undefined
}

const Select: React.FC<SuperSelectPropsType> = ({ st,
                                                       options,
                                                       className,
                                                       onChange,
                                                       onChangeOption,
                                                       ...restProps
                                                     }) => {
  const mappedOptions: any[] = options
    ? options.map((o) => (
      <option
        id={'hw7-option-' + o.id}
        className={s.option}
        key={o.id}
        value={o.id}
      >
        {o.value}
      </option>
    ))
    : [] // map options with key

  const onChangeCallback = (e: ChangeEvent<HTMLSelectElement>) => {
    // делают студенты
    //   console.log(e.currentTarget.value)
    if (onChangeOption) {
      onChangeOption(e.currentTarget.value)
    }
  }

  const finalSelectClassName = s.select + (className ? ' ' + className : '')

  return (
    <select
      className={finalSelectClassName}
      onChange={onChangeCallback}
      {...restProps}
      style={st}
    >
      {mappedOptions}
    </select>
  )
}

export default Select


// import React, {SelectHTMLAttributes, DetailedHTMLProps, useState, CSSProperties} from 'react'
// import s from './styles.module.css'
//
// type DefaultSelectPropsType = DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>,
//   HTMLSelectElement>
//
// type SuperSelectPropsType = DefaultSelectPropsType & {
//   options: any[]
//   onChangeOption?: (id: number) => void
//   st?: CSSProperties | undefined
// }
//
// const Select: React.FC<SuperSelectPropsType> = ({
//   st,
//   options,
//   className,
//   onChange,
//   value,
//   onChangeOption,
//   ...restProps
// }) => {
//
//   const [active, setActive] = useState(false)
//   const showOptions = () => setActive(!active)
//
//   const onChangeCallback = (id: number) => {
//     if (onChangeOption) {
//       onChangeOption(id)
//       setActive(!active)
//     }
//   }
//   const selectedOption = options.filter(o => o.id === value)[0].value
//
//   const mappedOptions: any = options
//     ? options.map((o, index) => (
//         <option
//           id={'hw7-option-' + o.id}
//           className={s.option + ' ' + (value === o.id ? s.activeOption : '')}
//           key={o.id}
//           style={{appearance: "none"}}
//           value={o.id}
//         >
//           {o.value}
//         </option>
//       )
//     )
//     : []
//
//   return (
//     <div className={s.selectWrapper}>
//       <select
//         className={s.select + ' ' + (active ? s.active : "")}
//         style={st}
//         onClick={showOptions}
//       >
//         <option
//           id={'hw7-option-' + selectedOption.id}
//           key={selectedOption.id}
//           value={selectedOption.id}
//           style={{appearance: "none"}}
//         >
//           {selectedOption && selectedOption}
//         </option>
//
//         {active && mappedOptions}
//       </select>
//     </div>
//   )
// }
//
// export default Select
//
//
