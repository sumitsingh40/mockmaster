
import { Outlet } from 'react-router-dom'

const AuthenticationLayout = () => {
  return (
        <div className="w-screen h-screen overflow-hidden flex items-center justify-center relative bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(96,165,250,0.18),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.14),transparent_35%)]" />
        <Outlet />
    </div>
  )
}

export default AuthenticationLayout
