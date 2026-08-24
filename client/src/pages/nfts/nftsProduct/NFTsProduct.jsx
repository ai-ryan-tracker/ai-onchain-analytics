import "./NFTsProduct.css";
import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  HandleStatusOfFilterButton,
} from "./nftProductManiger/maniger";
import { VscSettings } from "react-icons/vsc";
import { CiLogout } from "react-icons/ci";
import { TbSortAscending2 } from "react-icons/tb";
import { PiCrownSimple } from "react-icons/pi";
import { LuShapes } from "react-icons/lu";
import { MdVerified } from "react-icons/md";

const PAGE_SIZE = 12;

const NFTs = ({
  NfsData,
  setNfsData,
  vuierState,
  filterButtonHandel,
  setFilterButtonHandel,
}) => {
  const [Data, setData] = useState(NfsData);
  const containerRef = useRef(null);
  const boxRef = useRef(null);
  const sentinelRef = useRef(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [loading, setLoading] = useState(false);
  const [newCardIds, setNewCardIds] = useState(new Set());

  const iconnButtonFilter = {
    "Sort by:": TbSortAscending2,
    "License:": PiCrownSimple,
    "NFTs type:": LuShapes,
  };

  const activeList =
    vuierState === "NFTs" ? Data.NFTs : Data.Collections;

  useEffect(() => {
    if (NfsData.FilterItems.length === 0) {
      setData(NfsData);
    } else {
      const handleFilterContent = () =>
        NfsData.NFTs.filter((obj) =>
          obj.filter.some((item) => NfsData.FilterItems.includes(item))
        );

      setData((prevData) => ({
        ...prevData,
        NFTs: handleFilterContent(),
      }));
    }
    // Reset scroll when filter changes
    setVisibleCount(PAGE_SIZE);
  }, [NfsData.FilterItems]);

  // Reset visible count when tab switches
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [vuierState]);

  // Infinite scroll via IntersectionObserver
  const loadMore = useCallback(() => {
    if (loading) return;
    if (visibleCount >= activeList.length) return;

    setLoading(true);
    setTimeout(() => {
      const nextCount = Math.min(visibleCount + PAGE_SIZE, activeList.length);
      const ids = new Set();
      for (let i = visibleCount; i < nextCount; i++) {
        ids.add(activeList[i]?.id ?? i);
      }
      setNewCardIds(ids);
      setVisibleCount(nextCount);
      setLoading(false);
      setTimeout(() => setNewCardIds(new Set()), 700);
    }, 500);
  }, [loading, visibleCount, activeList]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const obs = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) loadMore(); },
      { threshold: 0.1 }
    );
    obs.observe(sentinel);
    return () => obs.disconnect();
  }, [loadMore]);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      const box = boxRef.current;
      if (!container || !box) return;
      const containerRect = container.getBoundingClientRect();
      const boxHeight = box.offsetHeight;
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const minTop = containerRect.top + scrollTop;
      const maxTop = containerRect.bottom + scrollTop - boxHeight;
      let boxTop = scrollTop - minTop;
      if (boxTop < 0) {
        boxTop = 0;
      } else if (scrollTop > maxTop) {
        boxTop = maxTop - minTop;
      }
      box.style.top = `${boxTop}px`;
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const HandelMenuFilter = () => {
    if (filterButtonHandel.display === "none") {
      setFilterButtonHandel({
        display: "block",
        size: 9,
      });
    } else {
      setFilterButtonHandel({
        display: "none",
        size: 12,
      });
    }
  };

  return (
    <section id="NFTs">
      <div className="container pb-2 pt-3">
        <div className="row">
          <div
            className={`col-lg-3 d-none d-lg-${filterButtonHandel.display} p-0`}
            ref={containerRef}
          >
            <div className="FilterSlider">
              <div className="FilterSliderDeep py-3 px-2" ref={boxRef} id="box">
                <div className="FilterSliderHeed pb-3">
                  <div className="d-flex justify-content-between align-items-center mx-2 F1 ">
                    <div className="d-flex align-items-center gap-2">
                      <VscSettings className="VscSettings" />
                      <span>Filters</span>
                    </div>
                    <div
                      onClick={HandelMenuFilter}
                      style={{ cursor: "pointer" }}
                    >
                      <CiLogout />
                    </div>
                  </div>
                </div>
                <div className="bodyOfFilterSlider mx-3 mt-4">
                  {NfsData.FilterSliderItem.map((item, Findex) => {
                    const FilterIcon = iconnButtonFilter[item.filterTitlel];
                    return (
                      <div key={Findex} className="d-flex mt-4 py-2">
                        <div className="FilterItemComponant">
                          <div className="d-flex align-items-center gap-2 F3">
                            <FilterIcon />
                            {item.filterTitlel}
                          </div>
                          <div className="d-flex flex-wrap FilterItemBody F3">
                            {item.filterItems.map((filterItem, Sindex) => (
                              <span
                                key={Sindex}
                                className={`me-3 py-2 px-3 ${filterItem.filterItemState} mt-3`}
                                onClick={() =>
                                  HandleStatusOfFilterButton(
                                    Findex,
                                    Sindex,
                                    setNfsData
                                  )
                                }
                              >
                                {filterItem.filterItemName}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className={`col-12 col-lg-${filterButtonHandel.size}`}>
            <div className="row mx-3 mx-md-4 pb-2">
              {vuierState === "NFTs" ? (
                <>
                  {Data.NFTs.slice(0, visibleCount)
                    .map((item, index) => (
                      <div
                        key={item.id ?? index}
                        className={`col-12 col-md-6 col-lg-4 pt-4 nftCardWrapper ${newCardIds.has(item.id) ? "nftFadeIn" : ""}`}
                      >
                        <div className="card nft-card">
                          <Link
                            to={`/NFT/${item.postTitle}`}
                            className="CrdTools"
                          >
                            <div className="cardMedia">
                              <img
                                src={item.postImg}
                                className="card-img-top"
                                alt="post Img"
                              />
                              {item.verified && (
                                <div className="cardVerifiedBadge">
                                  <MdVerified /> Verified
                                </div>
                              )}
                              <div className="cardBadge">Featured</div>
                              <div className="cardTime">Ends in 06h 22m</div>
                            </div>
                          </Link>
                          <div className="card-body">
                            <Link to={`/NFT/${item.postTitle}`}>
                              <span className="card-text F3 d-block">
                                {item.postTitle}
                              </span>
                            </Link>
                            <p className="card-desc F4">
                              {item.postdescreption.slice(0, 100)}...
                            </p>
                            <div className="card-tags">
                              {item.filter.map((tag, tIndex) => (
                                <span key={tIndex} className="tagItem F5">
                                  {tag}
                                </span>
                              ))}
                            </div>
                            <div className="card-meta d-flex justify-content-between align-items-center mt-3 gap-3">
                              <Link
                                to={`/user/${item.userInfo.name}`}
                                className="d-flex align-items-center gap-2 userinfo"
                              >
                                <img
                                  src={item.userInfo.img}
                                  alt="user img"
                                  width="32px"
                                />
                                <div>
                                  <span className="F4">{item.userInfo.name}</span>
                                  <span className="F5 userLabel">Creator</span>
                                </div>
                              </Link>
                              <div className="priceBadge text-end">
                                <span className="F5">Edition</span>
                                <span className="F3">1 of 1</span>
                              </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center mt-3 prodictInfo">
                              <div>
                                <span className="F4 d-block">Current Price</span>
                                <span className="F3">{item.postPrice} ETH</span>
                              </div>
                              <div className="text-end">
                                <span className="F4 d-block">Highest Bid</span>
                                <span className="F3">
                                  {item.postHightesBid} wETH
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </>
              ) : (
                <>
                  {Data.Collections.slice(0, visibleCount)
                    .sort(() => Math.random() - 0.5)
                    .map((item, index) => (
                      <div
                        key={item.id ?? index}
                        className={`col-12 col-md-6 col-lg-4 pt-4 nftCardWrapper ${newCardIds.has(item.id) ? "nftFadeIn" : ""}`}
                      >
                        <div className="item p-1">
                          <div>
                            <img
                              src={item.primaryImg}
                              alt="primary Img"
                              width="100%"
                            />
                          </div>
                          <div className="row mt-1 px-2">
                            <div className="col-4 p-1 p-md-2">
                              <img
                                src={item.secondaryImg[0]}
                                alt="secondary Img"
                                width="100%"
                              />
                            </div>
                            <div className="col-4 p-1 p-md-2">
                              <img
                                src={item.secondaryImg[1]}
                                alt="secondary Img"
                                width="100%"
                              />
                            </div>
                            <div className="col-4 p-1 p-md-2">
                              <Link
                                to="/nfts"
                                className="collectionNum w-100 h-100 d-flex justify-content-center align-items-center"
                              >
                                {item.collectionNumper}+
                              </Link>
                            </div>
                          </div>
                          <div className="mt-2 ms-1">
                            <span className="d-block F3">
                              {item.collectionName}
                            </span>
                            <Link
                              to={`/user/${item.userInfo.name}`}
                              className="d-flex align-items-center gap-2 mt-2"
                            >
                              <img
                                src={item.userInfo.img}
                                alt="user img"
                                width="28px"
                              />
                              <span className="F4">{item.userInfo.name}</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                </>
              )}
            </div>
          </div>
        </div>
        {/* Infinite scroll sentinel */}
        <div ref={sentinelRef} className="nftSentinel" />

        {/* Loading spinner */}
        {loading && (
          <div className="nftLoadingSpinner">
            <span className="nftSpinDot" />
            <span className="nftSpinDot" />
            <span className="nftSpinDot" />
          </div>
        )}

        {/* End of list message */}
        {!loading && visibleCount >= activeList.length && activeList.length > 0 && (
          <div className="nftEndMessage">
            You've seen all {activeList.length} NFTs
          </div>
        )}
      </div>
    </section>
  );
};

export default NFTs;
