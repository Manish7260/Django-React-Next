import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Footer from "../Footer";
import Header from "../Header";
import { PagesLayout } from "../../styles/global/main.style";
import router from "../../utils/router";
import SocketIo from "socket.io-client";
import SailsIo from "sails.io.js";
import { useSession } from "next-auth/client";

const Layout = ({ children }) => {
    const routers = useRouter();
    const [session, loading] = useSession();

    useEffect(() => {
        socketConnectionHandler();
    }, [session]);

    const socketConnectionHandler = async () => {
        if (!session) return;
        if (SocketIo.sails) window.io = SocketIo;
        else window.io = SailsIo(SocketIo);

        window.io.sails.url = process.env.NEXT_PUBLIC_SOCKET_URL;
        window.io.sails.query = `token=${session.token}`;
        window.io.socket.get("/api/v1/user-subscribe", function (data) {
            // console.log("data", data);
        });
        //io.socket.on("users", onSocketHandler);
        window.io.socket.on("disconnect", function onDisconnect() {
            console.log("This socket lost connection to the Sails server");
        });
    };

    return (
        <PagesLayout>
            {routers.pathname != router.LOGIN && routers.pathname != router.SIGNUP && routers.pathname != router.FORGOTPASS && routers.pathname != router.RESETPASS && <Header />}
            <div>{children}</div>
            {routers.pathname != router.LOGIN && routers.pathname != router.SIGNUP && routers.pathname != router.FORGOTPASS && routers.pathname != router.RESETPASS && <Footer />}
        </PagesLayout>
    );
};

export default Layout;
