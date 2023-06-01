import {TextField} from "@mui/material"
import i from "common/components/Input/styles.module.css"
import React, {useCallback, useEffect, useState} from "react"
import {useAppDispatch} from "common/hooks"
import {SubmitHandler, useForm} from "react-hook-form"
import {debounce} from "lodash"
import {packsActions} from "features/packs/packs.slice"


type FormDataType = {
  searchValue: string
}

export const SearchPacks = () => {

  const dispatch = useAppDispatch()
  const [value, setValue] = useState('')

  const {register, handleSubmit, formState: {errors}, watch} = useForm<FormDataType>({
    mode: "onChange",
    defaultValues: {
      searchValue: value,
    }
  })

  const handleOnChange = (e: any) => {
    setValue(e.target.value);
    onSubmit({searchValue: value})
  }
  console.log(value)

  const onSubmit: SubmitHandler<FormDataType> = useCallback(debounce((data: FormDataType) => {
    dispatch(packsActions.setParams({ params: { packName: data.searchValue } }))
  }, 300), [])

  // useEffect(() => {
  //   onSubmit({ searchValue: watch("searchValue") })
  // }, [onSubmit])


  return (
    <form onChange={handleSubmit(onSubmit)} action="#" autoComplete={'off'}>
      <TextField
        fullWidth={true}
        label={"Search packs"}
        variant={"standard"}
        autoComplete="off"
        placeholder={"Provide your text"}
        className={i.input}
        {...(register("searchValue", {
          maxLength: {
            value: 50,
            message: "You reached max search value"
          },
          onChange: handleOnChange
        }))}
        type="text"
      />
      {errors.searchValue && <span className={i.error}>{errors.searchValue.message}</span>}
    </form>
  )
}