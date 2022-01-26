import { ResponsivePie } from '@nivo/pie'



const PieCell = ({data}) => {
    console.log(data)
    return(<ResponsivePie
        data={
           [{"id": "confiabilidade",
            "label": "Confiabilidade",
            "value": data["confiability"],
            "color":0},
            {
                "id": "risco",
                "label": "Risco",
                "value": data["risk"],
                "color":1
               
              }]
        }
        margin={{ top: 10, right: 50, bottom: 5, left: 10 }}
        innerRadius={0.6}
        padAngle={0.7}
        cornerRadius={2}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        colors={['#27ae60', '#c0392b']}
        colorBy="index"
        arcLinkLabelsSkipAngle={5}
        arcLinkLabelsTextColor="white"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
            from: 'color',
            modifiers: [
                [
                    'brighter',
                10
                ]
            ]
        }}
        valueFormat={value =>
            `${Number(value).toLocaleString()}%`
        }
        tooltip={({ datum: { id, value } }) => (
            <div
                style={{
                    padding: 2,
                    background: '#222222',
                }}
            >
                <br />
                <strong>
                  {id} : {value}%
                </strong>
            </div>
        )}
        theme={{
            tooltip: {
                container: {
                    background: '#333',
                },
            },
        }}
       
    />)
    }


export default PieCell;