import React from 'react'
import './history.css'
import { RootState } from "../../RTK/store";
import { Link } from "react-router-dom";
import {  useSelector } from "react-redux";


export default function History() {
  const searchHistory = useSelector((state: RootState) => state.search.searchHistory);

  return (
    <div className="History">
          <h3>Search History:</h3>
          <ul className="search-history">
          {searchHistory.map((history, index) => (
          <li key={index}>
            <Link to={`/search?query=${history}`}>{history}</Link>
          </li>
        ))}
 
          </ul>
        </div>
  )
}
