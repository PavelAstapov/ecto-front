import axios from "axios"
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";

function Sitemap(){
  return(
    <>

    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const { data } = await axios.get("https://strapi-production-93bb.up.railway.app/sitemap/index.xml");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    ${data.split('.xsl"?>').pop()}
  `


  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemap)
  res.end()

  return {
    props: {}
  }
}

export default Sitemap;
