import React from "react"
import { arrayBuffer } from "stream/consumers";
import { JsxEmit, validateLocaleAndSetLanguage } from "typescript";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {getTime, getFormattedDate, getDateOnly} from '../../base/services/dateService'
import { selectSearchHistory, deleteHistoryEntry } from "../../features/search-giphy/searchGiphySlice";
import styles from './search-history.module.css'

export default function SearchHistory (){
  const dispatch = useAppDispatch();
  const searchHistory = useAppSelector(selectSearchHistory);
  const rows = searchHistory.reduce((acc: {[key:string]:{id:string, date: string, query: string}[]}, next)=>{
    let date = getFormattedDate(new Date(next.date),"he")
    const obj = {
      id: next.id,
      date: getTime(new Date(next.date)),
      query: next.query
    }
    if(acc[date]){
      acc[date].push(obj)
    }else{
      acc[date]=[]
      acc[date].push(obj)
    }
    return acc
  },{})

  return (
   <div>
    {Object.entries(rows).map(([k,val])=>{
      return <section key={k} className="historySection">
        <header className="bg-gray-200 p-2">
        {k}
        </header>
        {val.map((_)=>
        <div className="flex space-x-10 p-2" key={_.id+window.crypto.randomUUID()}>
          <div>{_.date}</div>
          <div>{_.query}</div>
            <div className={styles['gg-remove']} onClick={()=>dispatch(deleteHistoryEntry(_.id))}>&nbsp;</div>
          
        </div>)}
      </section>
    })}
    
   </div>
  )
}