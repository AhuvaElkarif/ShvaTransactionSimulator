import { IllustrationWrap } from "./HeroIllustration.styles";
import mockups from "../../../assets/mockups.svg";
/** Decorative brand illustration (phone + floating coins) for the hero panel. */
export const HeroIllustration = () => (
  <IllustrationWrap aria-hidden="true">
    <img src={mockups} alt="Shva Mockups" />
  </IllustrationWrap>
);
