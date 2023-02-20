import Image from "../assets/images/landing.jpg";
import themeOptions from "../styles/theme/themeOptions";

export const styles = {
    container:{
        backgroundImage: `url(${Image.src})`,
        height: "100%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        position: "fixed",
        width: "100%"
    },
    textBox:{
        marginLeft: 120,
        paddingTop: 25 
    },
    mainHeader:{
        color: themeOptions.palette?.colours.darkBlue,
        fontWeight: "bold"
    },
    subheader:{
        color: themeOptions.palette?.colours.darkBlue
    },
    button:{
        marginTop: 3,
        borderRadius: 20,
        color: "#3A6EA5",
        boxShadow: "0 0 0.01 #3A6EA5",
    }
}