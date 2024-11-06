import { redirect } from "next/navigation"

function MainPage() {
  redirect("/login")
  return (
    null
  )
}

export default MainPage