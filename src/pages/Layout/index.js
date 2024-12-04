import { request } from "axios";
import { useEffect } from "react";
const Layout = () => {
  useEffect(() => {
    request.get("/user/profile");
  });
  return <div>this is Layout</div>;
};

export default Layout;
