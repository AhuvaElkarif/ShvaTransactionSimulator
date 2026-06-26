import { LogoWrapper } from "./Logo.styles";
import logo from "../../../assets/shva-logo.svg";

/** Shva brand lockup: a teal swirl mark plus the localized lowercase wordmark. */
export const Logo = () => {

  return (
    <LogoWrapper>
      <img src={logo} alt="Shva Logo" />
    </LogoWrapper>
  );
};
