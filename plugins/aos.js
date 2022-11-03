import AOS from "aos";
import "aos/dist/aos.css";
export default ({ app }) => {
  app.AOS = new AOS.init(
    {
      // duration: 350,
      easing: 'ease-out-back',
      delay: 250,
      once: true
    }
  ); // or any other options you need
};
