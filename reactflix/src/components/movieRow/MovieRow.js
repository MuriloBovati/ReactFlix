import React, { useState } from "react";
import './MovieRow.css'
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";

export default function MovieRow({title, items}){

    const [scrollx, setScrollx] = useState(0)

    const handleLeftArrow = () =>{
        let x = scrollx + Math.round(window.innerWidth / 2)
        if(x > 0){
            x = 0
        }
        setScrollx(x)
    }
    const handleRightArrow = () =>{
        let x = scrollx - Math.round(window.innerWidth / 2)
        let totalList = items.results.length * 150
        if((window.innerWidth - totalList) > x){
            x = (window.innerWidth - totalList) - 60
        }
        setScrollx(x)
    }

    return (
        <div className="movieRow">
            <h2>{title}</h2>
            <div className="movieRowLeft" onClick={handleLeftArrow}>
                <AiFillCaretLeft/>
            </div>
            <div className="movieRowRight" onClick={handleRightArrow}>
                <AiFillCaretRight/>
            </div>
            <div className="movieRowListArea">
                <div className="movieRowList" style={{
                    marginLeft: scrollx,
                    width: items.results.length * 150,
                }}>
                    {items.results.length > 0 
                    && items.results.map((item,key) =>(
                        <div key={key} className="movieRowItem">
                            <img 
                            src={`http://image.tmdb.org/t/p/w300${item.poster_path}`} 
                            alt={item.original_title}/>
                        </div>
                        ))}
                </div>
            </div>
        </div>
    )
}
