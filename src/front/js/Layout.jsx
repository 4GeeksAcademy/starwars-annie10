import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/ScrollToTop.jsx";
import { BackendURL } from "./component/BackendURL.jsx";

import { Home } from "./pages/Home.jsx";
import { Demo } from "./pages/Demo.jsx";
import { Single } from "./pages/Single.jsx";
import injectContext from "./store/appContext";

import { Navbar } from "./component/Navbar.jsx";
import { Footer } from "./component/Footer.jsx";
import { Contact } from "./pages/Contact.jsx";
import { AddContact } from "./pages/AddContact.jsx";
import { EditContact } from "./pages/EditContact.jsx";
import { CardsItems } from "./pages/CardsItems.jsx";
//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<CardsItems />} path="/characters" />
                        <Route element={<CardsItems />} path="/planets" />
                        <Route element={<CardsItems />} path="/starships" />
                        <Route element={<Contact />} path="/contact" />
                        <Route element={<EditContact />} path="/editcontact" />
                        <Route element={<AddContact />} path="/addcontact" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
