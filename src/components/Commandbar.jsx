import React from 'react'
import '../styles/commbar-bar.css';
import { useEffect } from 'react';
export default function CommandBar({
    setCommandBarOpen,commands
}) {
    const [activeIndex, setActiveIndex] = React.useState(0);


    function exeCmd(a){
        a();
        setCommandBarOpen(false)
    }


    useEffect(()=>{
        const handlekey = e=>{
            if(e.key === "Escape"){
          e.preventDefault();
          setCommandBarOpen(false);
        }

            if(e.key === "ArrowDown"){
            e.preventDefault();

                setActiveIndex(prev => (prev + 1) % commands.length);
            }
            if(e.key === "ArrowUp"){
            e.preventDefault();

                setActiveIndex(prev => prev > 0 ? prev-1 : commands.length -1);
            }
            if(e.key === "Enter"){
                e.preventDefault();
                exeCmd(
                commands[activeIndex].action)
            }
        }
        document.addEventListener("keydown", handlekey)


        return ()=> document.removeEventListener("keydown",handlekey)
    },[activeIndex]);
  return (
    <div className='cmd-con'>
        <div className="cmd"><p>
            Press <kbd>Esc</kbd> to close.
        </p>
            <ul>
                {commands.map((cmd, index) => (
                    <li key={index} onClick={cmd.action}
                    className={activeIndex === index ? 'active' : ''}
                    >
                        {cmd.label}
                    </li>
                ))}
            </ul>  
        </div>

      
    </div>
  )
}
