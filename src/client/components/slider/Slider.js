import React, { Component } from "react";
import "./Slider.scss";
import SlideItem from "./SliderItem";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import SliderDetails from "./SliderDetail";

class Slider extends Component {
  _sliderContainer = React.createRef();
  _styleOver = {
    beforeOver: "translate3d(-16.6666666667%,0,0)",
    afterOver: "translate3d(16.6666666667%,0,0)",
    currentOver: "scale3d(1.75,1.75,1)",
    mouseOut: "translate3d(0,0,0)"
  };

  state = {
    listItem: [],
    translateX: 0,
    nbTranslateMax: 0,
    nbTranslateCurrent: 0,
    overCurrentIndex: null,
    nbItemPage: 6
  };

  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      listItem: props.listItem
    };
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(this.props.listItem) !== JSON.stringify(prevProps.listItem)) {
        this.setState({
            ...this.state,
            listItem: this.props.listItem
        })
    }
}

  componentDidMount() {
    this.setState({
      ...this.state,
      nbTranslateMax:
      this._sliderContainer && this._sliderContainer.current && this._sliderContainer.current.scrollWidth ?
        Math.ceil(
          this._sliderContainer.current.scrollWidth /
            this._sliderContainer.current.clientWidth
        ) - 1 : 0
    });
  }

  translate = direction => {
    let current = this.state.nbTranslateCurrent;

    if (
      direction === "right" &&
      this.state.nbTranslateCurrent < this.state.nbTranslateMax
    ) {
      current = this.state.nbTranslateCurrent + 1;
    }

    if (direction === "left" && this.state.nbTranslateCurrent > 0) {
      current = this.state.nbTranslateCurrent - 1;
    }

    this.setState({
      ...this.state,
      translateX: current * -100,
      nbTranslateCurrent: current
    });
  };

  over = index => {
    this.setState({
      ...this.state,
      overCurrentIndex: index
    });
  };

  setTranslate = index => {
    if (this.state.overCurrentIndex !== null) {
      return this.state.overCurrentIndex === index
        ? this._styleOver.currentOver
        : this.state.overCurrentIndex < index
        ? this._styleOver.afterOver
        : this._styleOver.beforeOver;
    } else {
      return this._styleOver.mouseOut;
    }
  };

  isFirstOrLast = () => {
    if (this.state.overCurrentIndex !== null) {
      if (this.state.overCurrentIndex % this.state.nbItemPage === 0)
        return (this.state.translateX + this.state.nbItemPage) / (this.state.nbItemPage >= 10 ? 2 : 1);
      if ((this.state.overCurrentIndex + 1) % this.state.nbItemPage === 0)
        return (this.state.translateX - this.state.nbItemPage) / (this.state.nbItemPage >= 10 ? 2 : 1);
    }
    return this.state.translateX;
  };

  render() {
    let listItemHtml;
    let listTitle;
    if(this.props.h1){
      listTitle = (
        <div><h1>{this.props.h1}</h1></div>
      )
    }
    if (this.state.listItem !== undefined) {
      listItemHtml = (
        <>
          <button
            className={
              "rightButton " +
              (this.state.nbTranslateCurrent < this.state.nbTranslateMax
                ? "show"
                : "")
            }
            onClick={() => this.translate("right")}
          >
            <IoIosArrowForward />
          </button>
          <div
            className={"sliderContainer " +  (this.state.overCurrentIndex !== null ? 'show' : '')}
            ref={this._sliderContainer}
            style={{
              transform: "translate3d(" + this.isFirstOrLast() + "%, 0, 0)"
            }}
          >
            {this.state.listItem.map((item, index) => (
              <SlideItem
                nameList={this.props.nameList}
                over={{ fn: this.over, key: this.state.overCurrentIndex }}
                transformFn={this.setTranslate}
                key={item.id}
                index={index}
                item={item}
              ></SlideItem>
            ))}
          </div>
          <button
            className={
              "leftButton " + (this.state.nbTranslateCurrent > 0 ? "show" : "")
            }
            onClick={() => this.translate("left")}
          >
            <IoIosArrowBack />
          </button>
        </>
      );
    }

    return (
      <div className={"slider " + (this.props.h1 ? "hasTitle" : " ")}>
        {listTitle}
        <div className="wrapSlideButton">
          {listItemHtml}
        </div>
        <SliderDetails listItem={this.state.listItem.map(item => item.id)} nameList={this.props.nameList}></SliderDetails>
      </div>
    );
  }
}

export default Slider;
