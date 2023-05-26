import {useSelector} from "react-redux"
import {selectProfile} from "features/auth/auth.selectors"
import {useNavigate} from "react-router-dom"


export const WithAuthRedirect = (Component: (() => JSX.Element)) => {

  const navigate = useNavigate()

  const profile = useSelector(selectProfile)
  if (!profile) {
    return navigate('/login')
  } else {
    return Component
  }
}