import { LogoWrapper } from "./Logo.styles";
import logo from "../../../assets/shva-logo.svg";

export const Logo = () => {
  return (
    <LogoWrapper>
      <img src={logo} alt="Shva Logo" />
    </LogoWrapper>
  );
};
