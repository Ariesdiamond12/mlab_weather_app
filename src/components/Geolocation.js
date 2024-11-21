// // define the function that finds the users geolocation
// const getUserLocation = async () => {
//   try {
//     // if geolocation is supported by the users browser
//     if (navigator.geolocation) {
//       // get the current users location
//       await navigator.geolocation.getCurrentPosition((position) => {
//         // save the geolocation coordinates in two variables
//         const { latitude, longitude } = position.coords;
//         // update the value of userlocation variable

//         localStorage.setItem(
//           "geolocation",
//           JSON.stringify({ latitude, longitude })
//         );
//         return { latitude, longitude };
//       });
//     }
//   } catch {
//     // if geolocation is not supported by the users browser
//     (err) =>
//       console.error("Geolocation is not supported by this browser.", err);
//   }
// };

// export default getUserLocation;
