function Greeting() {
    const hour = new Date().getHours();
    let text = "";
    let color = "";
    if (hour >= 6 && hour < 12) {
        text = "Good Morning";
        color = "orange";
    } else if (hour >= 12 && hour < 18) {
        text = "Good Afternoon";
        color = "green";
    } else {
        text = "Good Evening";
        color = "blue";
    }
    return (
        <h1 style={{ color }}>
            {text}
            </h1>);
}

export default Greeting;