import React from "react";
import MenuLogo from "../assets/menu-logo.png";

const Home = () => {

  return (
    <div>
      
        <div
          className="text-center"
          style={{ background: "#F2F1F0", padding: '30px 20px', borderRadius: 10 }}
        >
          <div>
            <h4>+94334 444 455</h4>
          </div>
          <div className="text-center">
            <h1>Welcome !</h1>
          </div>
          <div className="text-center" style={{ color: "black", fontSize: 18 }}>
            The principal reason we continue to adapt and evolve our business
            model is to ensure that we are meeting our customers’ expectations.
            One example of this has been to use modern technology and the
            introduction of the real time tracking our teams using GPS. This
            ensures our customers get the time they have paid for has been spent
            at our customers’ homes since this is the most common problem within
            our industry
          </div>
        </div>
        <div className="text-center logo-image">
          <img src={MenuLogo} alt={"logo"} />
        </div>
    </div>
  );
};

export default Home;
