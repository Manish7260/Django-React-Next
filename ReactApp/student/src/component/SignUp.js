import { useState } from "react";
import SubmitButton from "./SubmitButton";
import AddressInput from "./AddressInput";
import Input from "./Input";
import RadioInput from "./RadioInput";

function Form()
{
    const [Students, setStudents] = useState({
        firstname : "",
        lastname : "",
        standard : "",
        email : "",
        gender :"",
        password : "",
        address : "",
    });

    const [records, setRecords] = useState([]);

    let nextId = 0

    function handleInput(e)
    {
        const name = e.target.name;
        const value = e.target.value;
        console.log(value)
        setStudents(Student => ({
            ...Student,
            [name]:value
        }));
    }

    function handleSubmit(e)
    {
        e.preventDefault();

        const newRecord = {
            ...Students, 
            id : nextId++
        }

        console.log(Students.gender)

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        let standard = parseInt(newRecord.standard);

        if(newRecord.firstname.length<1)
        {
            alert("Please Enter First Name");
            return;
        }
        else if(newRecord.lastname.length<1)
        {
            alert("Please Enter Last Name");
            return;
        }
        else if(newRecord.standard.length===0 || newRecord.standard.length>2 || standard>=13)
        {
            alert("Please Enter Valid Standard and It will be less than or Equal to 12");
            return;
        }
        else if(emailRegex.test(Students.email)===false)
        {
            alert("Enter Valid Email");
            return;
        }
        else if(newRecord.password.length<8)
        {
            alert("Password should be minimum of 8 character");
            return;
        }
        else if(newRecord.address.length<20)
        {
            alert("Please Enter Address");
            return;
        }

        setRecords([...records, newRecord]);
        console.log(records)
    }

    return (
        <>
            <p className="text-center mt-5">Sign Up</p>
            <div className="col-md-12 d-flex justify-content-center mt-3">
                <form onSubmit={handleSubmit}>
                    <Input name="firstname" placeholder="Enter First Name" onChange={handleInput}  /><br/>
                    <Input name="lastname" placeholder="Enter Last Name" onChange={handleInput}  /><br/>
                    <Input type="number" name="standard" placeholder="Standard" onChange={handleInput}  /><br/>
                    <Input type="email" name="email" placeholder="Email" onChange={handleInput} /><br/>
                    <RadioInput name="gender" firstValue="Male" secondValue="Female" onChange={handleInput}/><br/>
                    <Input type="password" name="password" placeholder="Password" onChange={handleInput} /><br/>
                    <AddressInput onChange={handleInput} /><br/>
                    <SubmitButton>Submit</SubmitButton>
                </form>
            </div>
        </>
    );
}

export default Form;