import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { server } from '..'
import { Container, HStack } from '@chakra-ui/react';
import Loder from './Loder';
import ExchangeCard from './ExchangeCard';

const Exchanges = () => {
  const [exchanges , setExchanges]= useState([]);
  const [loading , setLoading]= useState(true);
  useEffect(() => {
     const fetchExchanges = async()=>{
      const {data}=await axios.get(`${server}/exchanges`)
      console.log(data);
      setLoading(false);
      setExchanges(data);
     }
     fetchExchanges();
  }, [])

  return (
    <Container maxW={"container.xl"} >
  

    {loading? (<Loder />): (
      <>  
      <HStack wrap={"wrap"}>
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