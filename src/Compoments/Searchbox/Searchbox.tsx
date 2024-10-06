import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { debounce } from "../../utils/debounce";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './searchbox.css';

export default function Searchbox() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = debounce((value: string) => {
    if (value.length >= 3) {
      navigate(`/jobs/search?query=${value}`);
    }
  }, 300);

  return (
    <>
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
            padding: "10px 10px 10px 10px",
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
    </>
  );
}
