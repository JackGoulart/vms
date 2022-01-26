import { ResponsiveBullet } from '@nivo/bullet'
import { v4 as uuidv4 } from 'uuid';


const  BulletCell = ({data}) => {
  
 return (
        <ResponsiveBullet
        key={uuidv4()}
        data={
           [ {"ranges": [
                1,2,3,4,5,6,7,8,9,10
               ],
               "measures": [
                 1
               ],
               "markers": [
                data
               ]}]
        }
        minValue={1}
        maxValue={9}
        margin={{ top:10, right: 4, bottom: 25, left: 5 }}
        spacing={40}
        titleAlign="start"
        titleOffsetX={-70}
        measureSize={0.45}
        markerSize={2}
        rangeColors="orange_red"
        markerColors="nivo"
       
    /> 
   
)}

export default BulletCell