import { Accordion, AccordionTab } from "primereact/accordion";
import "./Layout.scss";
import { NavLink, Outlet } from "react-router-dom";


function AppHeader() {

    return (
        <header className="nav-header">
            <div className="nav-header-left">
                <NavLink to="/">
                    <img src="/logo.png" alt="logo" className="nav-header-logo" />
                </NavLink>
                <div className="nav-header-text">
                    <h1>World Autonomous</h1>
                    <h1>Global University</h1>
                    <h3>Education for All</h3>
                </div>
            </div>
            <div className="nav-header-links">
            </div>
        </header>
    );
}

function AppFooter() {
    return (
        <footer className="app-footer">
            <p>&copy; 2025 World Autonomous Global University. All rights reserved.</p>
        </footer>
    );
}

function Layout() {

    return (
        <>
            <AppHeader />
            <main className="outlet-container">
                <Outlet />
            </main>
            <AppFooter />
        </>
    );
}

export default Layout;