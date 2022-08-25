import {useState} from 'react'

const Input = ({data,setMainData}) => {
  const [filterVal,setFilterVal] = useState("")

  const handelFilter = (e) => {
    if(e.target.value === ""){
      setMainData(data)
    }else{
      const filterData = data.filter(item => item.email.toLowerCase().includes(e.target.value.toLowerCase()) || item.number.toLowerCase().includes(e.target.value.toLowerCase()) ||item.region.toLowerCase().includes(e.target.value.toLowerCase()));
      setMainData(filterData)
    }
    setFilterVal(e.target.value)
  }
  return (
    <input className="searchBar" placeholder="Search Data" value={filterVal} onChange={(e) => {handelFilter(e)}}/>
  )
}

export default Input