import React, { useEffect, useState } from 'react'
import { Studentdata } from './Studentdata';

 function App() {
  const[data,setData] = useState([]);
  const[firstName,setFirstName]=useState('');
  const[lastName,setLastName]=useState('');
  const[contact,setContact]=useState('');
  const[email,setEmail]=useState('');
  const[age,setAge]=useState(0);
  const[address,setAddress]=useState('');
  const[id,setId]=useState(0);
  const[isupdate,setIsUpdate]=useState(false);
  
  useEffect(()=>{
    setData(Studentdata)
  },[])

  const handleEdit = (id)=>{
    const dt = data.filter(item=>item.id===id);
    if(dt !== undefined){
      setIsUpdate(true);
      setId(id);
      setFirstName(dt[0].firstName);
      setLastName(dt[0].lastName);
      setContact(dt[0].contact);
      setEmail(dt[0].email);
      setAge(dt[0].age);
      setAddress(dt[0].address);
    }
  }
  const handleDelete = (id)=>{
    if(id>0)
      {
        if(window.confirm("Are you sure to delete this item")){
          const dt = data.filter(item=>item.id!==id);
        setData(dt);
        }
        
      }
    }

    const handleSave = (e)=>{
      let error = '';

      if(firstName==='')
        error += 'first name is required';

      if(lastName==='')
        error += 'last name is required';

      if(contact==='')
        error += 'contact is required';

      if(email==='')
        error += 'email is required';

      if(age<=0)
        error += 'age is required';

      if(address==='')
        error += 'address is required';

      if(error==='')
        {
      e.preventDefault();
      const dt = [...data];
      const newObject ={
              id:Studentdata.length + 1,
              firstName:firstName,
              lastName:lastName,
              contact:contact,
              email:email,
              age:age,
              address:address  
      }
      dt.push(newObject);
      setData(dt);
    }
    else{
      alert(error);
    }
  }
    const handleUpdate = ()=>{
     const index=data.map((item)=>{
      return item.id
     }).indexOf(id)

     const dt =[...data];
     dt[index].firstName = firstName;
     dt[index].lastName = lastName;
     dt[index].contact = contact;
     dt[index].email = email;
     dt[index].age= age;
     dt[index].address = address;
     setData(dt);
     handleClear();
    }

    const handleClear = ()=>{
      setId(0);
      setFirstName('');
      setLastName('');
      setContact('');
      setEmail('');
      setAge('');
      setAddress('');
      setIsUpdate(false);
    }

  return (
    <>
  <div style={{display:'flex',justifyContent:'center',marginTop:'10px',marginBottom:'10px'}}>
    <div>
      <label>First Name:
        <input type='text'placeholder='enter first name'onChange={(e)=>setFirstName(e.target.value)}value={firstName}/>
      </label>
    </div>
    <div>
      <label>Last Name:
        <input type='text'placeholder='enter last name'onChange={(e)=>setLastName(e.target.value)}value={lastName}/>
      </label>
    </div>
    <div>
      <label>Contact:
        <input type='text'placeholder='contact'onChange={(e)=>setContact(e.target.value)}value={contact}/>
      </label>
    </div>
    <div>
      <label>Email:
        <input type='text'placeholder='enter email'onChange={(e)=>setEmail(e.target.value)}value={email}/>
      </label>
    </div>
    <div>
      <label>Age:
        <input type='text'placeholder='enter age'onChange={(e)=>setAge(e.target.value)}value={age}/>
      </label>
    </div>
    <div>
      <label>Address:
        <input type='text'placeholder='enter address'onChange={(e)=>setAddress(e.target.value)}value={address}/>
      </label>
    </div>
    <div>
      {
        !isupdate ?
        <button className='btn btn-primary'onClick={()=>handleSave()}>Save</button>
        : 
        <button className='btn btn-primary'onClick={()=>handleUpdate()}>Update</button>
      }
    <button className='btn btn-danger'onClick={()=>handleClear()}>Clear</button>
    </div>
  </div>
   <table className='table table-hover'>
    <thead>
      <tr>
        <td>Sr.No</td>
        <td>Id</td>
        <td>First Name</td>
        <td>Last Name</td>
        <td>Contact</td>
        <td>Email</td>
        <td>Age</td>
        <td>Address</td>
        <td>Action</td>
      </tr>
    </thead>
    <tbody>
      {
        data.map((item,index)=>{
          return(
            <tr key={index}>
              <td>{index+1}</td>
              <td>{item.id}</td>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.contact}</td>
              <td>{item.email}</td>
              <td>{item.age}</td>
              <td>{item.address}</td>
              <td>
                <button className='btn btn-primary'onClick={()=>handleEdit(item.id)}>Edit</button>
                <button className='btn btn-danger'onClick={()=>handleDelete(item.id)}>Delete</button>
              </td>
              </tr>
          )
        })
      }
    </tbody>
   </table>
   </>
  )
}
export default App
