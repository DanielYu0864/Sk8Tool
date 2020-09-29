const googleMapApiKey = "AIzaSyDmZhf4Cy3XVS_6hruDDGNfWfd0Uaxfxp4"; // D

const city = document.querySelector('.city-input');
$(function() {

    $('.search').on('click', () => {
        let searchCity = city.value.trim();
        $('.map-display').html('<iframe class ="parkmap" frameborder="0" style="border:0v"></iframe>');
        const mapI = document.querySelector(".parkmap");
        mapI.setAttribute("style", "width:100%; height:40vw");
        mapI.setAttribute("src", `https://www.google.com/maps/embed/v1/search?q=record+skatepark+in+${searchCity}&key=${googleMapApiKey}`);
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
