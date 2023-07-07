import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { server } from '..'
import { Container, HStack } from '@chakra-ui/react';
import Loder from './Loder';
import ExchangeCard from './ExchangeCard';
import ErrorComponent from './ErrorComponent';

const Exchanges = () => {
  const [exchanges , setExchanges]= useState([]);
  const [loading , setLoading]= useState(true);
  const [error , setError]= useState(false);
  useEffect(() => {
     const fetchExchanges = async()=>{
        try {
          const {data}=await axios.get(`${server}/exchanges`)
          console.log(data);
          setLoading(false);
          setExchanges(data);
        } catch (error) {
            setLoading(false);
            setError(true);
        }
     }
     fetchExchanges();
  }, [])
  if(error)return <ErrorComponent error = {"Error while fetching exchanges"}/>
  return (
    <Container maxW={"container.xl"} >
  

    {loading? (<Loder />): (
      <>  
      <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
          {
            exchanges.map((i)=>{
             return (
              <ExchangeCard
                 key={i.id}
                 name={i.name}
                 img={i.image}
                 rank={i.trust_score_rank}
                 url={i.url}
              />
             )
            })
          }
      </HStack>
      </>
    )}
    </Container>
    
  )
}

export default Exchanges;