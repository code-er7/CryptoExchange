import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { server } from '..'
import { Button, Container, HStack, Radio, RadioGroup } from '@chakra-ui/react';
import Loder from './Loder';
import ErrorComponent from './ErrorComponent';
import CoinCard from './CoinCard';


const Coins = () => {

  const [coins  , setCoins]= useState([]);
  const [loading , setLoading]= useState(true);
  const [error , setError]= useState(false);
  const [page  , setPage]= useState(1);
  const [currency  , setCurrency]= useState("inr");

  const btns = new Array(133).fill(1);

  const changePage = (pageNo)=>{
    setLoading(true);
    setPage(pageNo);
  }
  const currencySy = currency==="inr"?"₹": currency==="eur" ? "€" : "$";
  useEffect(() => {
     const fetchCoins = async()=>{
        try {
          const {data}=await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`)
          console.log(data);
          setLoading(false);
          setCoins(data);
        } catch (error) {
            setLoading(false);
            setError(true);
        }
     }
     fetchCoins();
  }, [currency , page])
  
  if(error)return <ErrorComponent error = {"Error while fetching coins"}/>
  return (
    <Container maxW={"container.xl"} >
  

    {loading? (<Loder />): (
      <>  
      <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
        <HStack spacing={"4"}>
        {/* "inr"?"": currency==="eur" ? "" : ""; */}
            <Radio value = {"inr"}>INR</Radio>
            <Radio value = {"eur"}>EUR</Radio>
            <Radio value = {"usd"}>USD</Radio>
        </HStack>
      </RadioGroup>
      <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
          {
            coins.map((i)=>{
             return (
              <CoinCard
                 key={i.id}
                 id={i.id}
                 name={i.name}
                 price={i.current_price}
                 symbol={i.symbol}
                 img={i.image}
                 url={i.url}
                 currencySymbol={currencySy}
              />
             )
            })
          }
      </HStack>
      <HStack w={"full"} overflowX={"auto"} p={"8"}>
        {
            btns.map((value , index)=>{
              return (
                 <Button
                 bgColor={"blackAlpha.900"}
                 color={"white"}
                 onClick={()=>changePage(index+1)}
                 >
                    {index+1}
                 </Button>
              )
            })
        }
      </HStack>
      </>
    )}
    </Container>
    
  )
}

export default Coins;