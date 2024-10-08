import React, { useState } from "react";
import { debounce } from "../../utils/debounce";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './searchbox.css';
import { useDispatch } from "react-redux";
import { GetQuery, fetchJobsQuery, fetchJobs, ClearQuery } from "../../RTK/JobsSlice";
import { AppDispatch } from "../../RTK/store";
import { addSearchHistory } from '../../RTK/searchSlice';


export default function Searchbox() {
  const dispatch = useDispatch<AppDispatch>(); // تحديد نوع الـ dispatch
  const [query, setQuery] = useState("");

  const handleSearch = debounce((value: string) => {
    if (value.length >= 3) {
      dispatch(GetQuery(value));
      dispatch(fetchJobsQuery(value));
      dispatch(addSearchHistory(query));

    }
    else {
      dispatch(fetchJobs());
      dispatch(ClearQuery());

    }
  }, 300);

  return (
    <div className="searchheader">
      <div className="searchheadchild">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            handleSearch(e.target.value);
          }}
          placeholder="Search keyword..."
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <FontAwesomeIcon
          icon={faSearch}
          style={{
            position: 'absolute',
            top: '50%',
            right: '10px',
            transform: 'translateY(-50%)',
            color: '#ccc',
          }}
        />
      </div>
    </div>
  );
}
