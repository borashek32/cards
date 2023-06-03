import {createTheme, TextField, ThemeProvider} from "@mui/material"
import i from "common/components/Input/styles.module.css"
import React, {FC, useState} from "react"
import {SubmitHandler, useForm} from "react-hook-form"
import s from "features/packs/nav/styles.module.css"


type Props = {
  onSubmit: SubmitHandler<FormDataType>
  title: string
}
type FormDataType = {
  searchValue: string
}

export const Search: FC<Props> = ({onSubmit, title}) => {

  const [value, setValue] = useState('')

  const {register, handleSubmit, formState: {errors}} = useForm<FormDataType>({
    mode: "onChange",
    defaultValues: {
      searchValue: value,
    }
  })

  const handleOnChange = (e: any) => {
    setValue(e.target.value);
    onSubmit({searchValue: value})
  }

  // mui input styles
  const theme = createTheme({
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiInputBase-input": {
              backgroundColor: "#fff", // Измените на нужный вам цвет
            }
          }
        }
      }
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <div className={s.nav__showPackCards + " " + s.nav__position}>
        <p className={s.nav__filterTitle}>{title}</p>
        <form
          onChange={handleSubmit(onSubmit)}
          autoComplete={'off'}
        >
          <TextField
            fullWidth={true}
            variant={"outlined"}
            size={"small"}
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
      </div>
    </ThemeProvider>
  )
}