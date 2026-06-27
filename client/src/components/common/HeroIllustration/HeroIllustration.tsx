import { IllustrationWrap } from "./HeroIllustration.styles";
import mockups from "../../../assets/mockups.svg";

export const HeroIllustration = () => (
  <IllustrationWrap>
    <img src={mockups} alt="Shva Mockups" />
  </IllustrationWrap>
);
