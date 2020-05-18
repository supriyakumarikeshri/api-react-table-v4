import React from 'react';
 
class Searchfilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredData: [""],
      searchInput: "",
      columnSearch: "",
      searchInput:""
     };
  }

   handleChange=(event)=>{
    const val=event.target.value;
    this.setState({
                  searchInput: event.target.value} ,() => this.globalSearch()
             ); 
    if(this.state.columnSearch==""){
         this.setState({ columnSearch: this.props.columns[0] });  
    }
    this.props.handleSetSearchInput(val);
  };

   globalSearch = () => {
     const { searchInput,columnSearch } = this.state;
     if(columnSearch){
         let filteredData = this.props.rows.filter((value,key) => { 
				return (value[columnSearch].toString().toLowerCase().includes(searchInput.toLowerCase()));
          });
         this.props.handleSetFilteredData(filteredData);
      }
  };

  setColumnSearch = e => {
    
    this.setState({ columnSearch: e.target.value });
    
   };

  render() { 
 
   const {columns}  = this.props;
   const {columnSearch,searchInput} = this.state;
   let selectColumns = columns.length > 0 && columns.map((item, i) => { 
    return (
      <option key={i} value={item}>{item}</option>
    )
  }, this); 

  	 return (<div>
                 <select id="selectForSearch" onChange={this.setColumnSearch} value={columnSearch}>{selectColumns}</select>    
		    			   <input type="text" className="searchbar" onChange={this.handleChange} value={searchInput} placeholder="Search!" /> 
                  
           </div>);
  }
}
export default Searchfilter; 



 