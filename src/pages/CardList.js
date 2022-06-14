import React,{useEffect , useState} from 'react'
import {useSelector } from 'react-redux'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { pink } from '@mui/material/colors';
export default function CardList() {
  const [data , setData]=useState([])
  const selector = useSelector(state => state.auth.cardDetail)

    return (
        <div className="container-fluid">
            <table className="table">
                <tr>
                    <th><p>Name on card</p></th>
                    <th><p>Card No</p></th>
                    <th><p>Delete</p></th>
                </tr>
                <tbody>
                    {selector?.map((e , i)=>
                        <tr>
                        <td>{e.name_on_card}</td>
                        <td>{e.card_number}</td>
                        <td><DeleteForeverIcon sx={{ color: pink[500] }} /></td>
                    </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}
