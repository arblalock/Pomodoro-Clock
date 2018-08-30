var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}var _ReactDOM = ReactDOM,render = _ReactDOM.render;var _ReactRedux =
ReactRedux,connect = _ReactRedux.connect,Provider = _ReactRedux.Provider;var _Redux =
Redux,createStore = _Redux.createStore,combineReducers = _Redux.combineReducers;

var SESSION = "SESSION";
var BREAK = "BREAK";
var MODE = "MODE";
var COUNTDOWN = "COUNTDOWN";
var RESET = "RESET";

var _changeSession = function _changeSession(incdec) {return (
    { type: SESSION, incdec: incdec });};

var _changeBreak = function _changeBreak(incdec) {return (
    { type: BREAK, incdec: incdec });};

var _changeMode = function _changeMode(sb) {return (
    { type: MODE, sb: sb });};


var _changeCount = function _changeCount(isCounting) {return (
    { type: COUNTDOWN, isCounting: isCounting });};


var _resetAll = function _resetAll() {return (
    { type: RESET });};


var initial_state = { session: 25, break: 5, mode: "Session", counting: false };

var timeReducer = function timeReducer() {var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initial_state;var action = arguments[1];
  var newval = void 0;
  switch (action.type) {
    case SESSION:
      newval = action.incdec == "inc" ? state.session + 1 : state.session - 1;
      return Object.assign({}, state, { session: newval });
    case BREAK:
      newval = action.incdec == "inc" ? state.break + 1 : state.break - 1;
      return Object.assign({}, state, { break: newval });
    case MODE:
      return Object.assign({}, state, { mode: action.sb });
    case COUNTDOWN:
      return Object.assign({}, state, { counting: action.isCounting });
    case RESET:
      return Object.assign({}, state, initial_state);
    default:
      return state;}

};

var timerFormat = function timerFormat(time) {
  var min = Math.floor(time / 60);
  var sec = time - min * 60;
  var minstr = min < 10 ? "0" + min.toString() : min.toString();
  var secstr = sec < 10 ? "0" + sec.toString() : sec.toString();
  return minstr + ":" + secstr;
};

var store = createStore(timeReducer);var

Break = function (_React$Component) {_inherits(Break, _React$Component);
  function Break(props) {_classCallCheck(this, Break);var _this = _possibleConstructorReturn(this, (Break.__proto__ || Object.getPrototypeOf(Break)).call(this,
    props));
    _this.handleClick = _this.handleClick.bind(_this);return _this;
  }_createClass(Break, [{ key: "handleClick", value: function handleClick(

    incdec) {
      if (this.props.counting == false && this.props.break < 60 && this.props.break > 1) {
        this.props.changeBreak(incdec);
      }
    } }, { key: "render", value: function render()
    {var _this2 = this;
      return (
        React.createElement("div", { className: "sb-row" },
          React.createElement("div", { className: "sb-title", id: "break-label" }, "Break Length"),
          React.createElement("div", { className: "sb-number", id: "break-length" }, this.props.break),
          React.createElement("div", null,
            React.createElement("button", { onClick: function onClick() {return _this2.handleClick('inc');}, className: "sb-button", id: "break-increment" }, React.createElement("i", { className: "fas fa-arrow-up" })),
            React.createElement("button", { onClick: function onClick() {return _this2.handleClick('dec');}, className: "sb-button", id: "break-decrement" }, React.createElement("i", { className: "fas fa-arrow-down" })))));



    } }]);return Break;}(React.Component);var


Session = function (_React$Component2) {_inherits(Session, _React$Component2);
  function Session(props) {_classCallCheck(this, Session);var _this3 = _possibleConstructorReturn(this, (Session.__proto__ || Object.getPrototypeOf(Session)).call(this,
    props));
    _this3.handleClick = _this3.handleClick.bind(_this3);return _this3;
  }_createClass(Session, [{ key: "handleClick", value: function handleClick(
    incdec) {
      if (this.props.counting == false && this.props.session > 1 && this.props.session < 60) {
        this.props.changeSession(incdec);
      }
    } }, { key: "render", value: function render()
    {var _this4 = this;
      return (
        React.createElement("div", { className: "sb-row" },
          React.createElement("div", { className: "sb-title", id: "session-label" }, "Session Length"),
          React.createElement("div", { className: "sb-number", id: "session-length" }, this.props.session),
          React.createElement("div", null,
            React.createElement("button", { onClick: function onClick() {return _this4.handleClick('inc');}, className: "sb-button", id: "session-increment" }, React.createElement("i", { className: "fas fa-arrow-up" })),
            React.createElement("button", { onClick: function onClick() {return _this4.handleClick('dec');}, className: "sb-button", id: "session-decrement" }, React.createElement("i", { className: "fas fa-arrow-down" })))));



    } }]);return Session;}(React.Component);var


Timer = function (_React$Component3) {_inherits(Timer, _React$Component3);
  function Timer(props) {_classCallCheck(this, Timer);var _this5 = _possibleConstructorReturn(this, (Timer.__proto__ || Object.getPrototypeOf(Timer)).call(this,
    props));
    _this5.timer = null;
    _this5.state = { sec: _this5.props.session * 60, session: _this5.props.session, break: _this5.props.break, changingM: false };
    _this5.decTime = _this5.decTime.bind(_this5);
    _this5.toggleTimer = _this5.toggleTimer.bind(_this5);
    _this5.stopTimer = _this5.stopTimer.bind(_this5);
    _this5.resetTimer = _this5.resetTimer.bind(_this5);
    _this5.switchMode = _this5.switchMode.bind(_this5);
    _this5.aud = React.createRef();return _this5;
  }_createClass(Timer, [{ key: "componentDidUpdate", value: function componentDidUpdate(

    prevProps) {
      if (this.props.mode == "Session") {
        if (prevProps.session != this.props.session) {
          this.setState({ sec: this.props.session * 60 });
        }
      } else if (prevProps.break != this.props.break) {
        this.setState({ sec: this.props.break * 60 });
      }
      if (this.state.sec < 0 && this.state.changingM == false) {
        this.aud.current.play();
        this.setState({ changingM: true });
        this.stopTimer();
      }
      if (this.state.changingM == true && this.props.counting == false) {
        this.switchMode();
      }
    } }, { key: "decTime", value: function decTime()

    {
      this.setState({ sec: this.state.sec - 1 });
      //this.setState({sec: this.state.sec -60})
    } }, { key: "toggleTimer", value: function toggleTimer()

    {var _this6 = this;
      if (this.props.counting) {
        this.stopTimer();
      } else {
        this.props.changeCount(true);
        this.timer = setInterval(function () {return _this6.decTime();}, 1000);
      }
    } }, { key: "componentWillUnmount", value: function componentWillUnmount()
    {
      this.stopTimer();
    } }, { key: "stopTimer", value: function stopTimer()

    {
      clearInterval(this.timer);
      this.props.changeCount(false);
    } }, { key: "resetTimer", value: function resetTimer()

    {
      this.aud.current.pause();
      this.aud.current.currentTime = 0;
      this.stopTimer();
      this.props.changeCount(false);
      this.props.resetAll();
      this.setState({ sec: this.props.session * 60 });
    } }, { key: "switchMode", value: function switchMode()

    {
      var newM = this.props.mode == "Session" ? "Break" : "Session";
      this.props.changeMode(newM);
      var newSec = newM == "Session" ? "session" : "break";
      this.setState({ sec: this.props[newSec] * 60 });
      this.toggleTimer();
      this.setState({ changingM: false });
    } }, { key: "render", value: function render()

    {
      return (
        React.createElement("div", { className: "time-cont" },
          React.createElement("div", { className: "timer-head", id: "timer-label" }, this.props.mode),
          React.createElement("div", { className: "timer-num", id: "time-left" }, timerFormat(this.state.sec)),
          React.createElement("div", { className: "btn-row" },
            React.createElement("button", { onClick: this.toggleTimer, className: "sb-button", id: "start_stop" }, React.createElement("i", { className: "fas fa-play" }), " ", React.createElement("i", { className: "fas fa-pause" })),
            React.createElement("button", { onClick: this.resetTimer, className: "sb-button", id: "reset" }, React.createElement("i", { className: "fas fa-redo-alt" })),
            React.createElement("audio", { ref: this.aud, src: "https://goo.gl/65cBl1", id: "beep" }))));



    } }]);return Timer;}(React.Component);


var MapStateToProps = function MapStateToProps(state) {
  return state;

};

var MapSesToProps = function MapSesToProps(dispatch) {return (
    { changeSession: function changeSession(incdec) {return dispatch(_changeSession(incdec));} });};

var MapBreakToProps = function MapBreakToProps(dispatch) {return (
    { changeBreak: function changeBreak(incdec) {return dispatch(_changeBreak(incdec));} });};

var MapActionsToProps = function MapActionsToProps(dispatch) {return (
    { changeMode: function changeMode(sb) {return dispatch(_changeMode(sb));},
      changeCount: function changeCount(isCounting) {return dispatch(_changeCount(isCounting));},
      resetAll: function resetAll() {return dispatch(_resetAll());} });};



Break = connect(MapStateToProps, MapBreakToProps)(Break);
Session = connect(MapStateToProps, MapSesToProps)(Session);
Timer = connect(MapStateToProps, MapActionsToProps)(Timer);

var OCont = function OCont() {return (
    React.createElement("div", { className: "cont" },
      React.createElement("div", { className: "sb-cont" },
        React.createElement(Break, null),
        React.createElement(Session, null)),

      React.createElement(Timer, null)));};var



AppWrapper = function (_React$Component4) {_inherits(AppWrapper, _React$Component4);function AppWrapper() {_classCallCheck(this, AppWrapper);return _possibleConstructorReturn(this, (AppWrapper.__proto__ || Object.getPrototypeOf(AppWrapper)).apply(this, arguments));}_createClass(AppWrapper, [{ key: "render", value: function render()
    {
      return (
        React.createElement(Provider, { store: store },
          React.createElement(OCont, null)));


    } }]);return AppWrapper;}(React.Component);


render(React.createElement(AppWrapper, null), document.getElementById('app'));