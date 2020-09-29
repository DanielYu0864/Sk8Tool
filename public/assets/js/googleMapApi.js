const googleMapApiKey = "AIzaSyDmZhf4Cy3XVS_6hruDDGNfWfd0Uaxfxp4"; // D

const city = document.querySelector('.city-input');
$(function() {
    $('.search').on('click', () => {
        let searchCity = city.value.trim();

        $('.main-content').html('<iframe class ="parkmap" frameborder="0" style="border:0v"></iframe>');
        const mapI = document.querySelector(".parkmap");
        mapI.setAttribute("style", "width:100%; height:40vw");

        if(switchbtn === true) {
            mapI.setAttribute("src", `https://www.google.com/maps/embed/v1/search?q=record+skatepark+in+${searchCity}&key=${googleMapApiKey}`);
        } else {
            mapI.setAttribute("src", `https://www.google.com/maps/embed/v1/search?q=record+skatesboradshop+in+${searchCity}&key=${googleMapApiKey}`);
        }

        $('.parks-btn').on('click',() =>{
            mapI.setAttribute("src", `https://www.google.com/maps/embed/v1/search?q=record+skatepark+in+${searchCity}&key=${googleMapApiKey}`);
        });

        $('.shops-btn').on('click',() =>{
            mapI.setAttribute("src", `https://www.google.com/maps/embed/v1/search?q=record+skatesboradshop+in+${searchCity}&key=${googleMapApiKey}`);
        });

        $('.weather-btn').on('click', () =>{

        })
    });




    // if (checkParkOrShop = true) {
    //     mapI.setAttribute("src", `https://www.google.com/maps/embed/v1/search?q=record+skatepark+in+${e}&key=${googleMapApiKey}`);
    // } else {
    //     mapI.setAttribute("src", `https://www.google.com/maps/embed/v1/search?q=record+skatesboradshop+in+${e}&key=${googleMapApiKey}`);
    // }

    // $(parkBtn).on("click",() =>{
    //     checkParkOrShop = true;
    //     mapI.setAttribute("src", `https://www.google.com/maps/embed/v1/search?q=record+skatepark+in+${e}&key=${googleMapApiKey}`);
    // });
    // $(shopBtn).on("click",() =>{
    //     checkParkOrShop = false;
    //     mapI.setAttribute("src", `https://www.google.com/maps/embed/v1/search?q=record+skateshop+in+${e}&key=${googleMapApiKey}`);
    // });
});
