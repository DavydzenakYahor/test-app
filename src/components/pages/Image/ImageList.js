import { Image } from 'antd';



function ImageComponent({url}) {
  return (
    <Image className='image' 
      width={200}
      src={url}
    />
  );
}

export default ImageComponent;