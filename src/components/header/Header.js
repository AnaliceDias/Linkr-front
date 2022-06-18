import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { useState, useEffect } from "react"

import { IoIosArrowDown } from "react-icons/io"
import { AiOutlineSearch } from "react-icons/ai"

import SearchInput from "./searchInput"

import API from "../../repository/API"

export default function Header(){
    const [text, setText] = useState('')
    const [info, setInfo] = useState({})

    
    const data = JSON.parse(localStorage.getItem("data"))
    console.log(data)
    
    const navigate = useNavigate()
    
    function logout(){
        localStorage.clear()
        navigate("/")
    }

    function redirect(){
        console.log("redireciona")
    }

    useEffect(() => {
         if (text.length >= 3) {
             const promise = API.getUser(text)
             
             promise.then(response => {
                 setInfo(response.data)          
             })            
         } else if (text.length < 3){
             setInfo({})
         }
    },[text])
    
    return (
        <Main>
            <Headers>            
                <h1>linkr</h1>
                <Input>
                    <SearchInput values={text} onChange={(search) =>setText(search)}/>
                    <AiOutlineSearch className="search"/>
                    {info.length > 0 ? 
                        <BoxUser>
                            {info.map(item => {
                                const {name, picture} = item                                
                                return (
                                    <div onClick={redirect}>
                                        <img src={picture}/>
                                        <p>{name}</p>
                                    </div>
                                )
                            })}
                        </BoxUser> 
                    : <></>}
                </Input>
                <nav class="dp-menu">
                    <ul>                        
                        <li><IoIosArrowDown className="arrow"/>
                            <ul>
                                <li><p onClick={logout}>Logout</p></li>                                
                            </ul>
                        </li>                     
                        <img src={"data"} alt="user"/>
                    </ul>
                </nav>
            </Headers>            
        </Main>
    )
}

const Main = styled.main`
    display: flex;
`
const Headers = styled.header`
    position: relative;
    width: 100vw;
    height: 72px;   
    background: #151515;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    display: flex;
    align-items: center;
    justify-content: space-between;    

    @media (min-width: 820px){
        
    }
    
    h1{
        width: 99px;
        height: 50px;       
        font-family: 'Passion One';
        font-style: normal;
        font-weight: 700;
        font-size: 45px;
        line-height: 50px;  
        letter-spacing: 0.05em;
        color: #FFFFFF;
        margin-left: 20px;
    }

    img{
        width: 53px;
        height: 53px;               
        border-radius: 50px;
        background-color: white;
    }

    .arrow{
        width: 45px;
        height: 45px;
        color: white;
        transition: all .3s;     
    }

    .arrow:hover{
        transform: rotate(0.5turn);
    }

    

    .dp-menu ul {
        margin-right: 20px;
        list-style-type: none;
        padding: 0;
    }   

    .dp-menu ul li {
        display: inline;
        position: relative;
        width: 120px;        
    }

    .dp-menu ul li p {
        
        text-decoration: none;
        display: inline-block;
        padding: 10px;
        transition: background .3s;
    }
    

    /*sub menu*/
    .dp-menu ul ul {
        display: none;
        left: 0;
        position: absolute;
    }

    .dp-menu ul li:hover ul {
        display: block;
    }

    .dp-menu ul ul {
        width: 150px
    }

    .dp-menu ul ul li p {
        display: block;
        color: white;
        background-color: #151515;
        width: 150px;
        height: 47px;           
        border-bottom-left-radius: 20px;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        
        text-align: center;        
        font-family: 'Lato';
        font-style: normal;
        font-weight: 700;
        font-size: 17px;
        line-height: 20px;
        letter-spacing: 0.05em;
        color: #FFFFFF;
    }
    
`
const Input = styled.div`
    position: relative;      
    position: absolute;
    top: 14px;
    left: 300px;

    .search{
        color: #C6C6C6;
        width: 21px;
        height: 21px;
        position: absolute;        
        top: 10px;
        right: 10px;
    }
    
    input{
        width: 563px;
        height: 45px;
        
        border: none;
        background: #FFFFFF;
        border-radius: 8px;

        padding-left: 20px;
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 19px;
        line-height: 23px;     
        
    }

    input::placeholder{
        color: #C6C6C6;
    }

    @media (max-width: 820px) {        
        position: absolute;
        justify-content: center;     
        left: 300px;   
        top: 80px;
        
        input{
            width: 350px;   
            height: 45px;
        }
  }
`
const BoxUser = styled.div`
     
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    background: #E6e6e6;
    display: flex;
    flex-direction: column;

    
    div{
        display: flex;        
        align-items: center;     
    }

    p{
        margin-left: 10px;
        margin-top: 5px;        
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 19px;
        line-height: 23px;      
        color: #515151;
    }


    img{
        width: 39px;
        height: 39px;
        margin-left: 20px;
        margin-bottom: 10px;
        margin-top: 20px;
    }
`