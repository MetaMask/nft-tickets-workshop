const Button = ({ children, handleClick = null }) => {
  return (
    <button onClick={handleClick}>
      {children}
    </button>
  )
}

export default Button