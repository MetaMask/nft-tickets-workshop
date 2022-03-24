const Link = ({ link, name, children }) => {
  return (
    <a href={link} rel="noopener noreferrer" target="_blank" title={`Link to ${name}`}>
      {children}
    </a>
  )
}

export default Link