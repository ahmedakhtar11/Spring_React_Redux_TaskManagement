import React from 'react'

const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-dark bg-success mb-4">
        <div className="container">
          <a className="navbar-brand" href="/">
            Task Management Application Spring_React_Redux
            </a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
            <span className="navbar-toggler-icon" />
          </button>
        </div>
      </nav>
    </div>
  )
}

export default Navbar;