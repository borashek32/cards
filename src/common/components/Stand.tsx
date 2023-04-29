import React, {useState} from 'react'
import s from 'common/components/styles.module.css'
import Input from "common/components/Input/Input"
import Button from "common/components/Button/Button"
import Checkbox from "common/components/Checkbox/Checkbox"

const Stand = () => {
  const [stateForAllInputs, setValue] = useState<string>('')
  const [error, setError] = useState<string>('')

  const [stateForAllCheckboxes, setChecked] = useState<boolean>(false)

  return (
    <div id={'hw4-stand'} className={s.stand}>
      <div className={s.inputs}>
        {/*совместим со старым кодом:*/}
        <div>
          <Input
            valueInvisible={true}
            id={'hw4-super-Input-like-old'}
            label={"Label"}
            value={stateForAllInputs}
            onChange={(e) => setValue(e.currentTarget.value)}
          />
        </div>
        {/*инпут с ошибкой:*/}
        <div>
          <Input
            valueInvisible={false}
            id={'hw4-super-Input-with-error'}
            label={"Label"}
            value={stateForAllInputs}
            onChangeText={setValue}
            error={error}
            onEnter={() => {
              setError(
                stateForAllInputs.trim()
                  ? ''
                  : 'Error'
              )
              setValue('')
            }}
          />
        </div>
      </div>

      <div className={s.buttons}>
        {/*обычная кнопка:*/}
        <div>
          <Button callback={() => {}} name={"button name"} id={'hw4-super-Button-default'} xType={'default'}>default</Button>
        </div>
        {/*красная кнопка:*/}
        <div>
          <Button callback={() => {}} name={"button name"} id={'hw4-super-Button-red'} xType={'red'}>red</Button>
        </div>
        {/*задизэйбленная кнопка:*/}
        <div>
          <Button callback={() => {}} name={"button name"} id={'hw4-super-Button-disabled'} xType={'red'} disabled>disabled</Button>
        </div>
        <div>
          <Button callback={() => {}} name={"button name"} id={'hw4-super-Button-secondary'} xType={'secondary'}>secondary</Button>
        </div>
      </div>

      <div className={s.checkboxes}>
        {/*чекбокс с текстом:*/}
        <div>
          <Checkbox
            id={'hw4-super-Checkbox-with-text'}
            checked={stateForAllCheckboxes}
            // onChangeChecked={setChecked}
            onChangeChecked={() => setChecked(!stateForAllCheckboxes)}
          >
            some text
          </Checkbox>
        </div>
        {/*совместим со старым кодом:*/}
        <div>
          <Checkbox
            id={'hw4-super-Checkbox-like-old'}
            checked={stateForAllCheckboxes}
            // onChange={(e) => setChecked(e.currentTarget.checked)}
            onChangeChecked={() => setChecked(!stateForAllCheckboxes)}
          />
        </div>
      </div>
    </div>
  )
}

export default Stand
