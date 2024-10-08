import React, { useState, useCallback, useEffect } from "react";
import { debounce } from 'lodash'; // Use lodash debounce
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './searchbox.css';
import { useDispatch } from "react-redux";
import { GetQuery, fetchJobsQuery, fetchJobs, ClearQuery } from "../../RTK/JobsSlice";
import { AppDispatch } from "../../RTK/store";
import { setSearchHistory } from '../../RTK/searchSlice';

export default function Searchbox() {
  const dispatch = useDispatch<AppDispatch>();
  const [query, setQuery] = useState<string>("");

  // Handle search debounce logic
  const handleSearch = useCallback(
    debounce((value: string) => {
      if (value.length >= 3) {
        dispatch(GetQuery(value));
        dispatch(fetchJobsQuery(value));
      } else {
        dispatch(fetchJobs());
        dispatch(ClearQuery());
      }
    }, 300),
    [dispatch]
  );

  // Save search query logic
  const saveSearchQuery = useCallback(
    debounce((searchTerm: string) => {
      if (searchTerm.trim() !== "") {
        // حفظ القيمة فقط إذا كانت غير فارغة
        dispatch(setSearchHistory(searchTerm));
      }
    }, 500),
    [dispatch]
  );
  useEffect(() => {
    return () => {
      saveSearchQuery.cancel();
    };
  }, [saveSearchQuery]);

  return (
    <div className="searchheader">
      <div className="searchheadchild">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            handleSearch(e.target.value);
            saveSearchQuery(e.target.value);
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
