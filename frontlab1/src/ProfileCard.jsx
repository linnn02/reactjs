function ProfileCard() {
    const cardStyle = {
        width: "300px",
        padding: "20px",
        border: "2px solid white",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        textAlign: "center",
        fontFamily: "Arial"}
        
    const imageStyle = {
        width: "100px",
        height: "100px",
        borderRadius: "50%",
        objectFit: "cover",
        marginBottom: "10px"}
            
    const buttonStyle = {
        padding: "10px 15px",
        borderRadius: "6px",
        border: "none",
        backgroundColor: 'rgb(89, 0, 255)',
        color: "white"}
           
    const hour = new Date().getHours();
    console.log(hour);
    return (
        <div style={cardStyle}>
            <img src="https://media.istockphoto.com/id/1443562748/ru/%D1%84%D0%BE%D1%82%D0%BE/%D0%BC%D0%B8%D0%BB%D0%B0%D1%8F-%D1%80%D1%8B%D0%B6%D0%B0%D1%8F-%D0%BA%D0%BE%D1%88%D0%BA%D0%B0.jpg?s=612x612&w=0&k=20&c=k8RwP4usK_LCpQ1bPn3fNDLk3vtfptH7CEcEMZw_K1A=" alt="Profile" style={imageStyle}/>
            <h2>Name</h2><p>sadaapdaps</p><button style={buttonStyle}>Follow</button></div>)}
                    
export default ProfileCard;                    