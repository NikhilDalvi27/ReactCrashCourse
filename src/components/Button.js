import PropTypes from 'prop-types'


//todo Note for button element for the onClick Event
// we are using the onClick function which is passed as a input Prop

const Button = ({color, text, onClick})=>{
    return  <button
        onClick={onClick}
        style={{backgroundColor: color}} className='btn' >{text}</button>


}

Button.defaultProps={
    color : 'steelblue'
}

Button.propTypes={
    text : PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func
}

export default Button