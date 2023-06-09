import React, { ChangeEvent, useState } from "react";
import "./login.css";
import { loginService } from "../../services/Services";
import { LoginData } from "../../type";
import LoadingElement from "./LoadingElement";
import { useNavigate } from "react-router-dom";
export default function LoginLayout() {
  const navigation = useNavigate();
  const [sellerID, setSellerID] = useState<any>("");
  const [progress, setProgress] = useState<boolean>(false);
  const [zip, setZip] = useState<any>();
  const handleInput =
    (setState: React.Dispatch<React.SetStateAction<string | number>>) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      setState(e.target.value);
    };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setProgress(!progress);
    e.preventDefault();
    if (!Number(zip) && !sellerID) {
      setProgress(!progress);
      return;
    }

    let data: LoginData = {
      seller_id: sellerID,
      seller_zip_code_prefix: Number(zip),
    };
    const res = await loginService(data);
    if (res?.data) {
      console.log(res.data.seller_id);
      localStorage.setItem("token", `${res.data.seller_id}`);
      setProgress(!progress);
      navigation("/home");
      return;
    }
    setProgress(!progress);
  };
  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h1>LOGIN</h1>
        <div className="login-input-wrap">
          <form onSubmit={handleSubmit} className="form-login">
            <input
              onChange={handleInput(setSellerID)}
              type="text"
              placeholder="Seller ID"
            />
            <input
              onChange={handleInput(setZip)}
              type="password"
              placeholder="zip code prefix"
            />
            {progress ? (
              <LoadingElement />
            ) : (
              <input type="submit" title="Submit" />
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
