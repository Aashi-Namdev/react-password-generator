import { useState , useCallback ,useEffect , useRef} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length , setLength] = useState(8)
  const [numAllowed,setNumAllowed] = useState(false)
  const [charAllowed,setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)

  const copyToClipboard = () => {
    window.navigator.clipboard.writeText(password)
    passwordRef.current.select()
  }

  const passwordGenerator = useCallback( () => {
    let pass = "" ;
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numAllowed){
      str+="1234567890"
    }
    if(charAllowed){
      str+="!@#$%^&*()><"
    }

    for(let i=0 ; i<length ;i++){
      let idx = Math.floor(Math.random() * str.length)
      pass += str.charAt(idx)
    }
    setPassword(pass)

  }, [length,charAllowed,numAllowed])

  useEffect( () => {
    passwordGenerator()
  }, [length,numAllowed,charAllowed,passwordGenerator])


  return (
   <div 
   className='p-5 bg-slate-900 min-w-screen min-h-screen flex justify-center items-center'>
    <div 
    className='bg-slate-950   flex flex-col gap-6 px-20 py-10 justify-center shadow-lg shadow-sky-500/20 rounded-lg'>
      <h1 
      className='text-gray-200 text-2xl text-center mb-4'>Password Generator</h1>
      <div className='flex rounded-lg overflow-hidden mb-2 shadow-lg '>
        <input type="text"
        placeholder='Password'
        value={password}
        ref = {passwordRef}
        readOnly
        className='bg-gray-300 focus:outline-none min-w-xs px-4 text-gray-800 md:min-w-sm' />
        <button 
        onClick={copyToClipboard}
        className='bg-sky-500 hover:bg-sky-400 text-gray-200 px-6 py-0.5 shrink-0 text-lg cursor-pointer font-medium'>copy</button>
      </div>
      <div
      className='flex items-center gap-6 md:gap-10'>
        <div className='flex items-center gap-2 '>
          <input 
          type="range" 
          min={6}
          max={100}
          value={length}
          onChange={(e) => setLength(Number(e.target.value)) }
          className='accent-sky-500 cursor-pointer w-28 md:w-35'/>
          <label htmlFor="" className='text-sky-500 '>Length:{length}</label>
        </div>
        <div className='flex items-center gap-2'>
          <input 
          type="checkbox"
          defaultChecked={numAllowed}
          onChange={ () => {
            setNumAllowed( prev => !prev )
          } }
          className='cursor-pointer' />
          <label htmlFor="" className='text-sky-500 ' >Numbers</label>
        </div>
        <div className='flex items-center gap-2'>
          <input 
          type="checkbox" 
          defaultChecked={charAllowed}
          onChange={ () => {
            setCharAllowed( prev => !prev )
          } }
          className='cursor-pointer'/>
          <label htmlFor="" className='text-sky-500 '>Characters</label>
        </div>
      </div>
    </div>
    

   </div>
  )
}

export default App





// User changes slider / checkbox
//    ↓
// State changes (length / options)
//    ↓
// React re-renders UI
//    ↓
// useEffect runs (because deps changed)
//    ↓
// Password is generated
//    ↓
// Password appears on screen

