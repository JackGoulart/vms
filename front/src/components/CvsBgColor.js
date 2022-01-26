import { orange, blue, red, green} from "@mui/material/colors";

const CVSBgColor = (params) => {
    const value = params.value
 switch (true) {
    case  value <= 3.1:
    
      return { label: params.value,
                style: {
                  borderColor: blue[500],
                  backgroundColor: blue[500]

                }}

    case value <= 5.5:
        return { label: params.value,
                  style: {
                    borderColor : green[900],
                    backgroundColor: green[500]
                  }}
      
    case value <= 8.8:
        return { label: params.value,
                  style: {
                    borderColor: orange[500],
                    backgroundColor: orange[500]
                  }}
      
    case   value >= 9:
        return {  label: params.value,
                  style: {
                    borderColor: red[900],
                    backgroundColor: red[500]
                  }}
      

    default:
      break;
  }
};

export default CVSBgColor