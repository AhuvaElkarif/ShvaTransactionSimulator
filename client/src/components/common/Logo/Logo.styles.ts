import styled from 'styled-components';

export const LogoWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;

  img {
    width: clamp(100px, 28vw, 120px);
    height: auto;
    display: block;
  }
`;
