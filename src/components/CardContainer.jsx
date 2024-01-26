import React, {  useEffect, useState } from 'react'
import Card from './Card'
import './CardContainer.css'


export default function CardContainer() {
  const [selectedPokemon,setSelectedPokemon] = useState(null)
  const [nextt,setNextt] = useState(null)
  const [data,setData] = useState([])
  const secondApi =async(arg)=>{
    arg.map(async(item,index)=>{
        let rawPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${item.name}/`)
        let parsedDataPokemon = await rawPokemon.json()
        setData((prev)=>[...prev,parsedDataPokemon])
    
    })
  }
  const firstApi1 =async(arg)=>{
    let raw = await fetch(arg)
    let parsedData = await raw.json()
    setNextt(parsedData.next)
    secondApi(parsedData.results)
  } 
  const firstApi =async()=>{
    let raw = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20')
    let parsedData = await raw.json()
    setNextt(parsedData.next)
    secondApi(parsedData.results)
  } 
  useEffect(()=>{
    firstApi()
    firstApi1()
  },[])
  const handleCardClick = (pokemon)=>{
    setSelectedPokemon(pokemon)
  }
  const closes = ()=>{
    setSelectedPokemon(null)
  }
  const next =()=>{
    firstApi1(nextt)
  }
  const prev =()=>{

  }
    return (
    <>
    <div className='cc'>
      {data && (
        data.map((item,index)=>(
            <Card className="cards-only" key={index} 
            id={item.id} 
            pic={item.sprites.other.dream_world.front_default?item.sprites.other.dream_world.front_default:""} 
            name={item.name} 
            type={item.types[0].type.name}
            height={item.height}
            weight={item.weight}
            stats={item.stats}
            onClick = {()=>handleCardClick(item)}/>
        ))
        
      )
     
      }
       {data && (<div className='footer'>
          <button onClick={next}>Next</button>
          <button onClick={prev}>Previous</button>
        </div>)}
      </div>
      {
        selectedPokemon && (
          <div className='popup-container' style={{display:"block"}}>
            <table>
                           <tr>
                  <td>
                      <img src={selectedPokemon.sprites.other.dream_world.front_default?selectedPokemon.sprites.other.dream_world.front_default:""} alt='j-'/>
                      <h1>{selectedPokemon.name?selectedPokemon.name:"...."}</h1>

                  </td>
                  <td>
                        <h2>weight {selectedPokemon.weight?selectedPokemon.weight:"0"}</h2>
                        <h2>height {selectedPokemon.height?selectedPokemon.height:0}</h2>
                  
                  </td>
                
                  <td>
                   
                        {selectedPokemon.stats.map((item,index)=>(
                            <li className='list'>Stat {index+1}: {item.stat.name}</li>
                          ))}
                    </td>
                        
                    <td>
                          {selectedPokemon.stats.map((item,index)=>(
                                  <li className='list'>Bs {index+1}: {item.base_stat}</li>
                                ))}
                    </td>
                          
                    <td> 
                            <div className='close' onClick={closes}>X</div>
                    </td>
                    
              </tr>
              </table>

            </div>
        )
      }


    </>
  )
}
