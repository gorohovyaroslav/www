import React, { Component, useState } from "react";
import Slider from "react-slick";
import styled from 'styled-components';
import Text from '../text';

//import backgroundImage from "../../images/avs-video-editor-final/cinema-slider/bckGroupImage.svg";
import backgroundImage from "../../images/avs-video-editor-final/cinema-slider/MaskGroup.png";
import  img1  from "../../images/avs-video-editor-tools/slider-powerful/icon_1.svg";
import  img2 from "../../images/avs-video-editor-tools/slider-powerful/icon_2.svg";
import  img3  from "../../images/avs-video-editor-tools/slider-powerful/icons_3.svg";
import  img4  from "../../images/avs-video-editor-tools/slider-powerful/icons_4.svg";
import  img5  from "../../images/avs-video-editor-tools/slider-powerful/icons_5.svg";

import  Actimg1  from "../../images/avs-video-editor-tools/slider-powerful/icon_ac_1.svg";
import  Actimg2 from "../../images/avs-video-editor-tools/slider-powerful/icon_ac_2.svg";
import  Actimg3  from "../../images/avs-video-editor-tools/slider-powerful/icon_ac_3.svg";
import  Actimg4  from "../../images/avs-video-editor-tools/slider-powerful/icon_ac_4.svg";
import  Actimg5  from "../../images/avs-video-editor-tools/slider-powerful/icon_ac_5.svg";

import Img1 from "../../images/avs-video-editor-tools/slider-powerful/color.webp";
import Img2 from "../../images/avs-video-editor-tools/slider-powerful/green.webp";
import Img3 from "../../images/avs-video-editor-tools/slider-powerful/speed.webp";
import Img4 from "../../images/avs-video-editor-tools/slider-powerful/stab.webp";
import Img5 from "../../images/avs-video-editor-tools/slider-powerful/text.webp";

const CinemaSliderStyle = styled.div`
.slick-slide {
    width: 852px;
}
.slick-slide > div {
    padding-bottom: 75px;
  }
  .scrollLinksWrapper {
    border-spacing: 20px 0px;
    padding: 0;
    display: flex;
    display: -ms-flexbox;
    display: -webkit-flex;
    align-items: center;
    justify-content: center;
  }
.scrollToButton{
padding-top: 115px;
margin-bottom: 25px; 
border-radius: 0;
box-shadow: none;
transition: 0;
display: table-cell;
min-width: 80px;
padding: 20px;
padding-top: 115px;
background-size: 42px;
background-position: 50% 20px;
    background-position-y: 20px;
background-repeat: no-repeat;
cursor: pointer;
height: 50px;
}
.scrollToButton:hover {
    box-shadow: none;
}
.velfb_description {
    text-align: center;
    font-size: 24px;
    max-width: 500px;
    margin: 0 auto;
    padding-top: 70px;
    padding-bottom: 15px;
}
`;

export class CinemaSlider extends Component {  
    state = {
        slideIndex: 0,
        updateCount: 0,
        activeSlide: 0,
      };   
      
      constructor(props){
        super(props);
        this.handleOnMouseOverTrim = this.handleOnMouseOverTrim.bind(this);
        this.handleOnMouseOverCroup = this.handleOnMouseOverCroup.bind(this);
        this.handleOnMouseOverJoin = this.handleOnMouseOverJoin.bind(this);
        this.handleOnMouseOverSplit = this.handleOnMouseOverSplit.bind(this);
        this.handleOnMouseOverSS = this.handleOnMouseOverSS.bind(this);

        this.handleOnMouseOut = this.handleOnMouseOut.bind(this);
        this.state = {
            hoveringTrim: false,
            hoveringCroup: false,
            hoveringJoin: false,
            hoveringSplit: false,
            hoveringSS: false,
        };
    }
    handleOnMouseOverSS(event){
        event.preventDefault();
        this.setState({hoveringSS:true});
      }
    handleOnMouseOverTrim(event){
      event.preventDefault();
      this.setState({hoveringTrim:true});
    }
    handleOnMouseOverCroup(event){
      event.preventDefault();
      this.setState({hoveringCroup:true});
    }
    handleOnMouseOverJoin(event){
      event.preventDefault();
      this.setState({hoveringJoin:true});
    }
    handleOnMouseOverSplit(event){
      event.preventDefault();
      this.setState({hoveringSplit:true});
    }

    handleOnMouseOut(event){
        event.preventDefault();
        this.setState({hoveringTrim:false});
        this.setState({hoveringCroup:false});
        this.setState({hoveringJoin:false});
        this.setState({hoveringSplit:false});
        this.setState({hoveringSS:false});
    }

    render() {
      const { isActive } = this.props;

        const settings = {    
            centerMode: true,
            fade: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            beforeChange: (current, next) => this.setState({ activeSlide: next }), 
          };
    
        const images = [    
            { img: Img1,
              imgText: "Use the Color correction to give your movie a cinematic look. Fix up any white balancing issues and color mismatches between consecutive scenes." }, 
            { img: Img2,
                imgText: "Use the Chroma Key to change your background and create fantastic effects." },   
            { img: Img3,
                imgText: "Make your video look professional and fix the effects of camera shake." },    
            { img: Img4,
                imgText: "Use Slow Mo or make your videos up to ten times faster. Create amazing slow motion videos in HD and 4K and see how easy it can be." },
            { img: Img5,
                imgText: "Use the AVS Video Editor to edit the color, size and animation of your text and titles." },         
          ];   

    const imgSlides = () =>  
    images.map(num => ( 
        <div>
        <div className="velfb_description">
          <Text>{num.imgText}</Text> 
        </div>
        <div style={{paddingTop:`${num.img === Img3 ? '25px': ''}`}}></div>
      <div className="imgpad"> 
          <img className="imgdetails" src= {num.img} width="100%"/>    
      </div>  
      </div> 
    )); 

  return (
    <div className="video_vel_features">
        <div className="video_vel_narrow">
        <h2>5 professional cinematic tools</h2>
            <div className="vel_features_block">
    <CinemaSliderStyle>
    <div className="container">  
       <div className="scrollLinksWrapper" style={{padding: 0, display: "flex"}} >
          <div onMouseEnter={this.handleOnMouseOverTrim} onMouseLeave={this.handleOnMouseOut} className="scrollSlideTrim">
            {this.state.hoveringTrim || this.state.activeSlide === 0 ?
              <div onClick={() => this.slider.slickGoTo(0)} style={{ backgroundImage: `url(${Actimg1})`, backgroundSize:`auto` }} className="scrollToButton"> 
              <Text  align="center">Color Tunnig</Text>
              </div> 
                : <div onClick={() => this.slider.slickGoTo(0)} style={{ backgroundImage: `url(${img1})`, backgroundSize:`auto`}} className="scrollToButton"> 
                  <Text align="center">Color Tunnig</Text> 
                   </div>}
          </div>

          <div onMouseEnter={this.handleOnMouseOverCroup} onMouseLeave={this.handleOnMouseOut} className="scrollSlideCrop">
            {this.state.hoveringCroup || this.state.activeSlide === 1 ?
              <div onClick={() => this.slider.slickGoTo(1)} style={{ backgroundImage: `url(${Actimg2})`, backgroundSize:`auto`}} className="scrollToButton">
                 <Text align="center">Green Screen</Text> 
              </div>   
            : <div onClick={() => this.slider.slickGoTo(1)} style={{ backgroundImage: `url(${img2})`, backgroundSize:`auto`}} className="scrollToButton">       
                                  <Text align="center">Green Screen</Text> 
            </div>}
          </div>

          <div onMouseEnter={this.handleOnMouseOverSplit} onMouseLeave={this.handleOnMouseOut} className="scrollSlideSplit">
            {this.state.hoveringSplit || this.state.activeSlide === 2 ?
              <div onClick={() => this.slider.slickGoTo(2)} style={{ backgroundImage: `url(${Actimg3})`, backgroundSize:`auto`}} className="scrollToButton">
                                                    <Text align="center">Stabilization</Text> 

              </div>
            :   <div onClick={() => this.slider.slickGoTo(2)} style={{ backgroundImage: `url(${img3})`, backgroundSize:`auto`}} className="scrollToButton">
                                                  <Text align="center">Stabilization</Text> 

                </div>}
            </div>    

          <div onMouseEnter={this.handleOnMouseOverJoin} onMouseLeave={this.handleOnMouseOut} className="scrollSlideJoin">
            {this.state.hoveringJoin || this.state.activeSlide === 3 ?            
              <div onClick={() => this.slider.slickGoTo(3)} style={{ backgroundImage: `url(${Actimg4})`, backgroundSize:`auto`}} className="scrollToButton">
                  <Text align="center">Speed Control</Text> 
              </div>
            : <div onClick={() => this.slider.slickGoTo(3)} style={{ backgroundImage: `url(${img4})`, backgroundSize:`auto`}} className="scrollToButton">
                <Text align="center">Speed Control</Text> 
              </div>}
          </div>
          <div onMouseEnter={this.handleOnMouseOverSS} onMouseLeave={this.handleOnMouseOut} className="scrollSlideSS">
            {this.state.hoveringSS || this.state.activeSlide === 4 ?            
              <div onClick={() => this.slider.slickGoTo(4)} style={{ backgroundImage: `url(${Actimg5})`, backgroundSize:`auto`}} className="scrollToButton">
                  <Text align="center">Text</Text> 
              </div>
            : <div onClick={() => this.slider.slickGoTo(4)} style={{ backgroundImage: `url(${img5})`, backgroundSize:`auto`}} className="scrollToButton">
                <Text align="center">Text</Text> 
              </div>}
          </div>    
          </div>
      <Slider ref={slider => (this.slider = slider)} {...settings}>
         {imgSlides()}
         <ul class="slick-dots" style=""><li class="landing-feature1" aria-hidden="true"><button type="button" data-role="none">1</button></li><li aria-hidden="true" class="landing-feature2"><button type="button" data-role="none">2</button></li><li aria-hidden="true" class="landing-feature3"><button type="button" data-role="none">3</button></li><li aria-hidden="true" class="landing-feature4"><button type="button" data-role="none">4</button></li><li aria-hidden="false" class="landing-feature5 slick-active"><button type="button" data-role="none">5</button></li></ul>
        </Slider>      
    </div>
    </CinemaSliderStyle>  
    </div> 
    </div>
    </div>
  );  
}  
}  
export default CinemaSlider;