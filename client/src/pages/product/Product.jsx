import "./Product.css";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { MdVerified } from "react-icons/md";

const Product = ({ Data, productName }) => {
  const navigate = useNavigate();

  const [productInfromation, setProductInfromation] = useState("");

  // Wallet States
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [walletName, setWalletName] = useState("");
  const [connecting, setConnecting] = useState(false);
  const [searchWallet, setSearchWallet] = useState("");
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [pendingOfferRequest, setPendingOfferRequest] = useState(false);
  const [offerAmount, setOfferAmount] = useState("");
  const [offerMessage, setOfferMessage] = useState("");
  const [offerFeedback, setOfferFeedback] = useState("");

  const wallets = [
    {
      name: "MetaMask",
      description: "Ethereum Wallet",
      icon: "https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg",
      type: "metamask",
    },
    {
      name: "Phantom",
      description: "Solana Wallet",
      icon: "https://cryptologos.cc/logos/phantom-wallet-logo.png",
      type: "phantom",
    },
    {
      name: "Rabby",
      description: "DeFi Wallet",
      icon: "https://rabby.io/assets/images/logo-128.png",
      type: "rabby",
    },
    {
      name: "Trust Wallet",
      description: "Mobile Wallet",
      icon: "https://trustwallet.com/assets/images/media/assets/TWT.png",
      type: "trustwallet",
    },
    {
      name: "Coinbase Wallet",
      description: "Web3 Wallet",
      icon: "https://avatars.githubusercontent.com/u/1885080?s=280&v=4",
      type: "coinbase",
    },
    {
      name: "Keplr",
      description: "Cosmos Wallet",
      icon: "https://play-lh.googleusercontent.com/0LxQ6dT0n8vX7zjG4zW0L0l9f0kL6m5W4I1A9QjW2sGQjP7M7gL7gA",
      type: "keplr",
    },
    {
      name: "TronLink",
      description: "TRON Wallet",
      icon: "https://seeklogo.com/images/T/tron-logo-26A5F6D90F-seeklogo.com.png",
      type: "tronlink",
    },
  ];

  const connectWallet = async (walletType) => {
    try {
      setConnecting(true);

      // Ethereum Wallets
      if (
        walletType === "metamask" ||
        walletType === "rabby" ||
        walletType === "trustwallet" ||
        walletType === "coinbase"
      ) {
        if (!window.ethereum) {
          alert("Ethereum wallet not found");
          return;
        }

        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        setWalletAddress(accounts[0]);
        setWalletName(walletType);
        setShowWalletModal(false);
        if (pendingOfferRequest) {
          setShowOfferModal(true);
          setPendingOfferRequest(false);
        }

        return;
      }

      // Phantom
      if (walletType === "phantom") {
        const provider = window.phantom?.solana;

        if (!provider?.isPhantom) {
          window.open("https://phantom.app/", "_blank");
          return;
        }

        const response = await provider.connect();

        setWalletAddress(response.publicKey.toString());
        setWalletName("Phantom");
        setShowWalletModal(false);
        if (pendingOfferRequest) {
          setShowOfferModal(true);
          setPendingOfferRequest(false);
        }

        return;
      }

      // Keplr
      if (walletType === "keplr") {
        if (!window.keplr) {
          window.open("https://www.keplr.app/", "_blank");
          return;
        }

        await window.keplr.enable("cosmoshub-4");

        const offlineSigner = window.getOfflineSigner("cosmoshub-4");
        const accounts = await offlineSigner.getAccounts();

        setWalletAddress(accounts[0].address);
        setWalletName("Keplr");
        setShowWalletModal(false);
        if (pendingOfferRequest) {
          setShowOfferModal(true);
          setPendingOfferRequest(false);
        }

        return;
      }

      // TronLink
      if (walletType === "tronlink") {
        if (!window.tronWeb || !window.tronWeb.defaultAddress.base58) {
          alert("TronLink not installed");
          return;
        }

        setWalletAddress(window.tronWeb.defaultAddress.base58);
        setWalletName("TronLink");
        setShowWalletModal(false);
        if (pendingOfferRequest) {
          setShowOfferModal(true);
          setPendingOfferRequest(false);
        }

        return;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setConnecting(false);
    }
  };

  const handleMakeOffer = () => {
    if (!walletAddress) {
      setPendingOfferRequest(true);
      setShowWalletModal(true);
      return;
    }

    setOfferAmount(productInfromation?.postPrice || "");
    setOfferMessage("");
    setOfferFeedback("");
    setShowOfferModal(true);
  };

  const submitOffer = () => {
    if (!offerAmount || Number(offerAmount) <= 0) {
      setOfferFeedback("Enter a valid offer amount.");
      return;
    }

    setOfferFeedback("Offer submitted successfully!");
    console.log("Offer submitted:", {
      nft: productInfromation.postTitle,
      amount: offerAmount,
      message: offerMessage,
      wallet: walletName,
    });
    setTimeout(() => {
      setShowOfferModal(false);
      setOfferFeedback("");
    }, 1400);
  };

  const GetUserArt = () => {
    const userData = Data.creators.filter(
      (item) => item.userName === productInfromation?.userInfo?.name
    );

    return userData[0]?.NFTs?.length > 1 ? true : false;
  };

  useEffect(() => {
    if (
      Data.NFTsMarket.NFTs.filter((item) => item.postTitle === productName)
        .length
    ) {
      const productData = Data.NFTsMarket.NFTs.filter(
        (item) => item.postTitle === productName
      );

      setProductInfromation(productData[0]);
    } else {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    const carousel = window.$("#owlProduct, #owlCreator");

    carousel.owlCarousel({
      items: 3,
      itemsDesktop: [1000, 3],
      itemsDesktopSmall: [900, 2],
      itemsTablet: [600, 1],
      itemsMobile: false,
      navigation: true,
      autoPlay: 5000,
      navigationText: [
        '<i class="bi bi-arrow-left-short"></i>',
        '<i class="bi bi-arrow-right-short"></i>',
      ],
    });

    return () => {
      carousel.trigger("destroy.owl.carousel");
    };
  }, [GetUserArt()]);

  return (
    <>
      <Helmet>
        <title>SoftGalaxy Product | {productName} Account</title>
        <meta name="description" content="SoftGalaxy | Account" />
      </Helmet>

      <section id="product">
        <div className="container mt-4 mb-5 mt-md-5 pt-lg-3">
          <div className="row d-flex align-items-center productData mx-2 py-3 pb-4 pb-md-3 px-md-2">
            <div className="col-12 col-lg-6 productImg">
              <img
                src={productInfromation.postImg}
                alt="product Img"
                width={"100%"}
              />

              <div className="productDetailsBelowImage mt-4">
                <div className="blockchainDetails mb-4">
                  <h6 className="detailsTitle mb-3">Blockchain Details</h6>
                  <div className="detailRow d-flex justify-content-between py-2">
                    <span className="detailLabel">Contract Address</span>
                    <span className="detailValue">0x8a4C...7d2B</span>
                  </div>
                  <div className="detailRow d-flex justify-content-between py-2">
                    <span className="detailLabel">Token ID</span>
                    <span className="detailValue">#4247</span>
                  </div>
                  <div className="detailRow d-flex justify-content-between py-2">
                    <span className="detailLabel">Token Standard</span>
                    <span className="detailValue">ERC-721</span>
                  </div>
                  <div className="detailRow d-flex justify-content-between py-2">
                    <span className="detailLabel">Network</span>
                    <span className="detailValue">Ethereum</span>
                  </div>
                </div>

                <div className="ownershipInfo">
                  <h6 className="detailsTitle mb-3">Ownership</h6>
                  <div className="detailRow d-flex justify-content-between py-2">
                    <span className="detailLabel">Current Owner</span>
                    <span className="detailValue">0x2f8A...9C3E</span>
                  </div>
                  <div className="detailRow d-flex justify-content-between py-2">
                    <span className="detailLabel">Owned Since</span>
                    <span className="detailValue">Jan 15, 2026</span>
                  </div>
                  <div className="detailRow d-flex justify-content-between py-2">
                    <span className="detailLabel">Times Sold</span>
                    <span className="detailValue">3 times</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-6 mt-3 mt-lg-0 productInfo">
              {productInfromation.verified && (
                <span className="productVerifiedFloat">
                  <MdVerified /> Verified
                </span>
              )}
              <div className="productTitleRow d-flex flex-wrap align-items-center gap-2">
                <span className="postName">{productInfromation.postTitle}</span>
              </div>

              <span className="postDescription d-block mt-2">
                {productInfromation.postdescreption}
              </span>

              <hr className="my-4" />

              <div className="productStats d-flex gap-4 mb-4">
                <div className="statItem">
                  <span className="statLabel">Rarity Score</span>
                  <span className="statValue">92/100</span>
                </div>
                <div className="statItem">
                  <span className="statLabel">Floor Price</span>
                  <span className="statValue">1.5 ETH</span>
                </div>
                <div className="statItem">
                  <span className="statLabel">Last Sale</span>
                  <span className="statValue">2.8 ETH</span>
                </div>
              </div>

              <hr className="my-4" />

              <Link
                to={`/user/${productInfromation?.userInfo?.name}`}
                className="d-flex align-items-center gap-3 px-2 userInfo"
              >
                <img
                  src={productInfromation?.userInfo?.img}
                  alt="user Img"
                  className="mt-1"
                />

                <div>
                  <span className="createrTitle">Creator</span>

                  <span className="d-block userName">
                    {productInfromation?.userInfo?.name}
                  </span>
                </div>
              </Link>

              <div className="collectionInfo mt-4 p-3 bg-secondary bg-opacity-10 rounded">
                <span className="collectionLabel">Collection</span>
                <span className="d-block collectionName mt-2">Cosmic Artifacts</span>
                <span className="d-block collectionItems mt-2">Total Items: 5,000</span>
              </div>

              <div className="price mt-4">
                <span className="priceTitle">Current Price</span>

                <div>
                  <span className="ethValue">
                    {productInfromation.postPrice} ETH
                  </span>

                  <span className="ms-2 usdValue">
                    (~${(productInfromation.postPrice * 2807).toFixed(2)} USD)
                  </span>
                </div>
              </div>

              <div className="row buttonSection d-flex justify-content-center mt-4 mt-md-5">
                <div
                  className="col-11 col-md-5 btnOutLine d-flex justify-content-center py-2 mx-2"
                  onClick={handleMakeOffer}
                  style={{ cursor: "pointer" }}
                >
                  <span>Make Offer</span>
                </div>

                <div
                  className="col-11 col-md-5 btnPold d-flex justify-content-center py-2 mx-2 mt-2 mt-md-0"
                  onClick={() => setShowWalletModal(true)}
                  style={{ cursor: "pointer" }}
                >
                  <span>Buy Now</span>
                </div>
              </div>

              {walletAddress && (
                <div className="connectedWallet mt-4 d-flex align-items-center gap-2">
                  <span className="badge bg-success">
                    {walletName}
                  </span>

                  <span className="text-light">
                    {walletAddress.slice(0, 6)}...
                    {walletAddress.slice(walletAddress.length - 4)}
                  </span>
                </div>
              )}

              <hr className="my-4" />

              <div className="detailsSection mt-4">
                <h6 className="detailsTitle mb-3">Traits</h6>
                <div className="traitsGrid">
                  <div className="traitItem">
                    <span className="traitLabel">Background</span>
                    <span className="traitValue">Nebula Blue</span>
                  </div>
                  <div className="traitItem">
                    <span className="traitLabel">Rarity</span>
                    <span className="traitValue">Rare</span>
                  </div>
                  <div className="traitItem">
                    <span className="traitLabel">Eyes</span>
                    <span className="traitValue">Glowing Orbs</span>
                  </div>
                  <div className="traitItem">
                    <span className="traitLabel">Effect</span>
                    <span className="traitValue">Cosmic Aura</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="productHistory" className="mt-5">
        <div className="container mb-5">
          <div className="row mx-2">
            <div className="col-12 p-4 historyCard">
              <h6 className="historyTitle mb-4">Trading History</h6>
              <div className="tradingHistoryTable">
                <div className="tradingRow tradingHeader d-none d-md-flex">
                  <span>Event</span>
                  <span>Price</span>
                  <span>From</span>
                  <span>To</span>
                  <span>Date</span>
                </div>
                <div className="tradingRow">
                  <span className="tradingCell">Sale</span>
                  <span className="tradingCell">2.8 ETH</span>
                  <span className="tradingCell">0x7f2A...5B8D</span>
                  <span className="tradingCell">0x2f8A...9C3E</span>
                  <span className="tradingCell">Jun 10, 2026</span>
                </div>
                <div className="tradingRow">
                  <span className="tradingCell">Sale</span>
                  <span className="tradingCell">1.95 ETH</span>
                  <span className="tradingCell">0x4c1D...3A7F</span>
                  <span className="tradingCell">0x7f2A...5B8D</span>
                  <span className="tradingCell">May 20, 2026</span>
                </div>
                <div className="tradingRow">
                  <span className="tradingCell">Mint</span>
                  <span className="tradingCell">0.5 ETH</span>
                  <span className="tradingCell">Contract</span>
                  <span className="tradingCell">0x4c1D...3A7F</span>
                  <span className="tradingCell">Mar 01, 2026</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Modal
        show={showWalletModal}
        onHide={() => setShowWalletModal(false)}
        centered
        dialogClassName="walletModalDialog"
      >
        <Modal.Header closeButton className="walletModalHeader">
          <Modal.Title>Enjoy</Modal.Title>
        </Modal.Header>

        <Modal.Body className="walletModalBody">
          <div className="walletSearch mb-4">
            <i className="bi bi-search"></i>

            <input
              type="text"
              placeholder="Search news or wallets..."
              value={searchWallet}
              onChange={(e) => setSearchWallet(e.target.value)}
            />
          </div>
          <div className="walletSubTitle mb-4">
            SoftGalaxy News: launch updates, trending drops, and collector highlights.
          </div>
          <div className="newsModalCard mb-4 p-3 rounded bg-secondary bg-opacity-10">
            <h5>Enjoy the latest news</h5>
            <p>
              SoftGalaxy is live with new curated drops, special creator stories, and premium collector insights.
            </p>
            <ul className="mb-0 ps-3">
              <li>New limited-edition drop arriving today.</li>
              <li>Featured creator spotlight: Nova Aria.</li>
              <li>Trading volume surges in the Cosmic Pets collection.</li>
            </ul>
          </div>
          {wallets
            .filter((wallet) =>
              wallet.name
                .toLowerCase()
                .includes(searchWallet.toLowerCase())
            )
            .map((wallet, index) => (
              <div
                key={index}
                className="walletCard"
                onClick={() => connectWallet(wallet.type)}
              >
                <div className="walletLeft">
                  <img
                    src={wallet.icon}
                    alt={wallet.name}
                  />

                  <div>
                    <span>{wallet.name}</span>
                    <small>{wallet.description}</small>
                  </div>
                </div>
                {connecting ? (
                  <div
                    className="spinner-border spinner-border-sm text-light"
                    role="status"
                  />
                ) : (
                  <i className="bi bi-chevron-right"></i>
                )}
              </div>
            ))}
          <div className="walletFooter">
            New to wallets?
            <a href="#"> Learn more about wallets</a>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={showOfferModal}
        onHide={() => setShowOfferModal(false)}
        centered
        dialogClassName="walletModalDialog"
      >
        <Modal.Header closeButton className="walletModalHeader">
          <Modal.Title>Make an Offer</Modal.Title>
        </Modal.Header>
        <Modal.Body className="walletModalBody">
          <div className="walletSearch mb-3">
            <input
              type="number"
              min="0"
              step="0.01"
              placeholder="Offer amount in ETH"
              value={offerAmount}
              onChange={(e) => setOfferAmount(e.target.value)}
            />
          </div>
          <div className="walletSearch mb-3">
            <input
              type="text"
              placeholder="Message to seller (optional)"
              value={offerMessage}
              onChange={(e) => setOfferMessage(e.target.value)}
            />
          </div>
          {offerFeedback && (
            <div className="text-success mb-3">{offerFeedback}</div>
          )}
          <div className="d-grid gap-2">
            <button
              className="unlockBtn"
              onClick={submitOffer}
            >
              Submit Offer
            </button>
          </div>
        </Modal.Body>
      </Modal>

    </>
  );
};

export default Product;