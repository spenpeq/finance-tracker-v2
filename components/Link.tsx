import React, { useEffect, useState } from "react";
import { usePlaidLink } from "react-plaid-link";

interface LinkProps {
  linkToken: string | null;
}
const Link: React.FC<LinkProps> = (props: LinkProps) => {
  const [accessToken, setAccessToken] = useState(null);
  const [itemID, setItemID] = useState(null);

  const onSuccess = React.useCallback((public_token, metadata) => {
    // send public_token to server
    const response = fetch("/api/set_access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ public_token }),
    })
      .then((res) => res.json())
      .then((data) => {
        setAccessToken(data.accessToken);
        setItemID(data.itemID);
      });
  }, []);

  const config: Parameters<typeof usePlaidLink>[0] = {
    token: props.linkToken!,
    // receivedRedirectUri: window.location.href,
    onSuccess,
  };

  const { open, ready } = usePlaidLink(config);

  return (
    <>
      <button
        onClick={() => open()}
        disabled={!ready}
        className="p-10 text-cyan-900 border-2 border-cyan-500 mt-10 bg-slate-300"
      >
        Link account
      </button>
      {accessToken && <p className="text-white">{accessToken}</p>}
      {itemID && <p className="text-white">{itemID}</p>}
    </>
  );
};
export default Link;
