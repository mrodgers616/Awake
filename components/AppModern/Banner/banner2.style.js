import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

const BannerWrapper2 = styled.div`
  padding-top: 100px;
  
  overflow: hidden;
  position: relative;
  background: linear-gradient(131deg, #75518c, #9fb1ce);
  background-size: 400% 400%;

  // background-image: -moz-linear-gradient(
  //   41deg,
  //   rgb(100, 43, 115) 0%,
  //   rgb(164,191,217) 100%,
  // );
  // background-image: -webkit-linear-gradient(
  //   41deg,
  //   rgb(100, 43, 115) 0%,
  //   rgb(164,191,217) 100%
  // );
  // background-image: -ms-linear-gradient(
  //   41deg,
  //   rgb(100, 43, 115) 0%,
  //   rgb(164,191,217) 100%
  // );
  @media only screen and (min-width: 1201px) and (max-width: 1440px) {
    min-height: 100vh;
  }
  @media only screen and (max-width: 1099px) {
    min-height: 100%;
  }
  @media only screen and (max-width: 480px) {
    padding-top: 90px;
  }
  > div.container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: calc(802px - 100px);
    @media only screen and (min-width: 1201px) and (max-width: 1440px) {
      min-height: calc(100vh - 100px);
      margin-top: 35px;
      align-items: flex-start;
    }
    @media only screen and (max-width: 1099px) {
      min-height: 100%;
    }
    @media only screen and (max-width: 480px) {
      flex-wrap: wrap;

    }
  }
  .bannerBottomShape {
    position: absolute;
    right: 0;
    bottom: -2px;
    @media only screen and (max-width: 999px) {
      display: none;
    }
  }
`;

export const Block = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
background: linear-gradient(131deg, #75518c, #9fb1ce);
border-radius:30px;
height=100%;
margin-top:80px;
h1 {
    font-size: 46px;
    @media only screen and (max-width: 1156px) {
        font-size: 32px;
    }
}
img {
    height:200px;
    width:300px;
    m:64px;
    @media only screen and (max-width: 1156px) {
        width:25%;
        m:32px;
    }
    @media only screen and (max-width: 734px) {
        display:none;
    }
}

`;
export const BlockClear = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
border-radius:30px;
height=100%;
margin-bottom:80px;
margin-top:80px;
h1 {
    font-size: 46px;
    @media only screen and (max-width: 1156px) {
        font-size: 32px;
    }
}
img{
    height:200px;
    width:200px;
    @media only screen and (max-width: 1156px) {
        width:25%;
        height:25%;
        m:32px;
    }
    @media only screen and (max-width: 734px) {
        display:none;
    }
}
`;

export const BannerContent = styled.div`
  flex-shrink: 0;
  width: 35%;
  @media only screen and (max-width: 480px) {
    width:100%; 
  }
  h1 {
    font-size: 46px;
    line-height: 55px;
    font-weight: 700;
    color: ${themeGet('colors.menu', '#0D233E')};
    margin-bottom: 24px;
    @media only screen and (max-width: 1366px) {
      font-size: 32px;
      line-height: 42px;
      margin-bottom: 20px;
    }
  }

  p {
    color: rgba(255, 255, 255, 0.8);
    
    line-height: 29px;
    @media only screen and (max-width: 734px) {
        font-size: 16px;
      }
  }
`;

export const BannerContentCamp = styled.div`
  width: 75%;
  flex-shrink: 0;
  @media only screen and (max-width: 1199px) {
    flex-shrink: 0;
    width: 100%;
    margin-top: 25px;
  }

  h1 {
    font-size: 46px;
    line-height: 55px;
    font-weight: 700;
    color: ${themeGet('colors.menu', '#0D233E')};
    margin-bottom: 24px;
    @media only screen and (max-width: 1366px) {
      font-size: 46px;
      line-height: 55px;
      margin-bottom: 24px;
      font-weight: 700;
    }
    @media only screen and (max-width: 734px) {
      font-size: 32px;
      width:100%;
      line-height: 55px;
      margin-bottom: 24px;
      font-weight: 700;
    }
  }

  p {
    color: rgba(255, 255, 255, 0.8);
    font-size: 16px;
    line-height: 29px;
  }
`;

export const RatingInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 22px;
  color: ${themeGet('colors.menu', '#0D233E')};

  .rating {
    margin-right: 10px;
    .star {
      color: ${themeGet('colors.white', '#fff')};
    }
    .star-o {
      color: #e8e8e8;
    }
  }

  img {
    margin-left: 9px;
  }
`;

export const BannerImage = styled.div`
  flex-shrink: 1;
  img {
    margin-left: 8%;
    margin-top: 50px;
    width: 20%
    max-width:25%;
  }
  @media only screen and (max-width: 480px) {
    img {
        margin-left:0%;
        margin-top: 50px;
        width: 20%
        max-width:25%;
      }
  }
  
`;

export const ButtonGroup = styled.div`
  margin-top: 35px;

  .reusecore__button {
    text-transform: inherit;
    border-radius: 5px;
    padding-left: 16px;
    padding-right: 16px;

    &.primary {
      background-color: ${themeGet('colors.white', '#fff')};
      color: rgb(15, 33, 55);
      font-size: 16px;
      margin-bottom:12px;
      letter-spacing: -0.1px;
      &:hover {
        box-shadow: #1e2a4a 0px 12px 24px -10px;
      }
    }

    &.text {
      font-size: 16px;
      color: ${themeGet('colors.white', '#fff')};
      letter-spacing: -0.1px;
      font-weight: 500;
      .btn-icon {
        i {
          color: #fff;
        }
        svg {
          width: auto;
          height: 25px;
        }
      }
    }
  }
`;
export const VideoGroup = styled.div`
  display: flex;
  margin-top: 60px;
  @media only screen and (max-width: 768px) {
    margin-top: 45px;
  }
  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
  img {
    margin-right: 10px;
    max-width: 100%;
    object-fit: cover;
    cursor: pointer;
    height: 100%;
    @media only screen and (max-width: 600px) {
      margin-right: 0;
      margin-bottom: 15px;
    }
  }
`;
export const VideoWrapper = styled.div`
  max-width: 100%;
  width: 900px;
  position: relative;
  &:before {
    content: '';
    display: block;
    padding-top: 56.25%;
  }
  iframe {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    mr:100px;
  }
`;


export const ImageWrapper = styled.div`
  display: flex;
  align-items: center;

  img {
    margin: 0 12px;
    @media only screen and (max-width: 667px) {
      margin: 5px 10px;
    }
  }
`;
export default BannerWrapper2;
