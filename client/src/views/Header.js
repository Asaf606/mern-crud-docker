import React, { Component } from "react";
import { Link } from "react-router-dom";

const styles = {
  bar: {
    background: "#ffffff",
    borderBottom: "1px solid #eaeaea",
    padding: "12px 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "sticky",
    top: 0,
    zIndex: 10,
  },
  brand: {
    fontWeight: 800,
    letterSpacing: "0.5px",
    color: "#0b5ed7",
    textDecoration: "none",
    fontSize: "18px",
  },
  right: { display: "flex", gap: "14px" },
  link: {
    textDecoration: "none",
    color: "#111",
    fontWeight: 600,
    padding: "8px 12px",
    borderRadius: "10px",
  },
  linkHover: {
    background: "#f3f4f6",
  },
};

class Header extends Component {
  state = { hover: null };

  renderLink(to, label, key) {
    const isHover = this.state.hover === key;
    return (
      <Link
        to={to}
        style={{ ...styles.link, ...(isHover ? styles.linkHover : {}) }}
        onMouseEnter={() => this.setState({ hover: key })}
        onMouseLeave={() => this.setState({ hover: null })}
      >
        {label}
      </Link>
    );
  }

  render() {
    return (
      <div style={styles.bar}>
        <a href="/" style={styles.brand}>
          MERN CRUD APP
        </a>

        <div style={styles.right}>
          {this.renderLink("/add-item", "Add Item", "add")}
          {this.renderLink("/", "Home", "home")}
        </div>
      </div>
    );
  }
}

export default Header;
