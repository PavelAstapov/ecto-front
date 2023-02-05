import axios from "axios"
import { useEffect, useState } from "react";

function Sitemap(){
  const [sitemap, setSitemap] = useState<any>()

  const getSitemap = async function Test(){
    const response = await axios.get("https://strapi-production-93bb.up.railway.app/sitemap/index.xml");

    return response.data;
  }

  useEffect(() => {
    const menuData = async () => {
      const fetchedData = await getSitemap();

      setSitemap(fetchedData)
    }

    menuData()
  }, [])

  return(
    <>
      {sitemap && (
        <div
          dangerouslySetInnerHTML={{__html: sitemap}}
        />
      )}
    </>
  )
}

export default Sitemap;
