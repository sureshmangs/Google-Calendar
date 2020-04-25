import React, { Component } from 'react'

export class Footer extends Component {
    render() {
        return (
            <div>
                <footer className="bg-dark text-center text-white pt-5 pb-5">
                    <p className="mt-5">Made with <i className="fa fa-heart" style={{ color: "#FF5252" }}></i> by <a
                        href="https://github.com/sureshmangs" style={githubLink} target="_blank" rel="noopener noreferrer">Suresh Mangs</a></p>
                    {/* <p style={githubLink}>All rights reserved <a href="https://github.com/sureshmangs" target="_blank" rel="noopener noreferrer" style={githubLink}>SURE7</a></p> */}
                </footer>
            </div>
        )
    }
}

const githubLink = {
    textDecoration: 'none',
    color: '#fff'
}

export default Footer
