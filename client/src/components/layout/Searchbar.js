import React, {  useState, Fragment } from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import{getProfileFromSearch} from "../../actions/profile"




const Searchbar = ({ getProfileFromSearch }) => {
  const [searchData, setSearchData] = useState({
    Text: ""
  }); //React Hooks usage

 const handleSubmit=(e)=>{
   
  getProfileFromSearch(searchData.Text);
 }
  
  
  return (
    <Fragment>
      {" "}
      <div className="wrap">
        <div className="search">
          <input
            type="text"
            className="searchTerm"
            placeholder="Find a developer..."
            
            value={searchData.Text}
            onChange={e=>setSearchData({...searchData,Text:e.target.value})}
            onKeyPress={event => {
              
                  if (event.key === 'Enter') {
                    handleSubmit()
                  }
                }}

          />
          <button type="submit" className="searchButton"  onClick={handleSubmit}>
            <i className="fa fa-search"></i>
          </button>
        </div>
      </div>
    </Fragment>
  );
};

Searchbar.propTypes = {
  getProfileFromSearch:PropTypes.func.isRequired
};

export default connect(null,{getProfileFromSearch})(Searchbar);
