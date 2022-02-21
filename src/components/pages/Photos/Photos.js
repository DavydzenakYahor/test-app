import { PHOTOS_ENDPOINT } from "../../../Constans/constantsUrl";
import LayoutComponent from "../../Layout/LayoutComponent";
import { getRequestData } from "../../../Request/requestData";
import { useState,useEffect } from "react";
import { Image } from 'antd';
import ImageComponent from "../Image/ImageList";



const Photos = () => {
    
    const albumId = window.location.pathname.split('/')[2]
    const [image,setImage] = useState([])
    console.log(image)
    const getImage = () => {
        getRequestData(`${PHOTOS_ENDPOINT}?albumId=${albumId}`)
            .then(res => setImage(res.data))
            .catch(err => console.log(err))
    }
    useEffect(() => {
        getImage()
    })

    return(
        <LayoutComponent>
            <Image.PreviewGroup>
                {image.map(item => <ImageComponent key={item.id} url={item.url} />)}
            </Image.PreviewGroup>
        </LayoutComponent>
    )
}

export default Photos;