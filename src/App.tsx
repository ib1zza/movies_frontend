import './App.css'
import {useTheme} from "@context/ThemeContext";
import {classNames} from "@shared/lib/classNames.ts";
import AppRouter from "@/app/AppRouter/AppRouter.tsx";

function App() {
  const {theme} = useTheme();



  return (
    <div className={classNames("App", {}, [theme])}>
      <AppRouter/>
    </div>
  )
}

export default App
