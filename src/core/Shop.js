import React, { useState, useEffect } from "react";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import Card from "./Card";
import { getCategories, getFilteredProducts } from "./apiCore";
import Checkbox from "./Checkbox";
import RadioBox from "./RadioBox";
import { makeStyles } from "@material-ui/core/styles";
import Menu from "./Menu";
import Search from "./Search";
import { prices } from "./fixedPrices";
import Copyright from "./Copyright";

const Shop = () => {
  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] },
  });

  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  const [limit, setLimit] = useState(6);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);
  const [filteredResults, setFilteredResults] = useState([]);

  const init = () => {
    getCategories().then((data) => {
      if (data?.error) {
        setError(data?.error);
      } else {
        setCategories(data);
      }
    });
  };

  const loadFilteredResults = (newFilters) => {
    // console.log(newFilters);
    getFilteredProducts(skip, limit, newFilters).then((data) => {
      if (data?.error) {
        setError(data?.error);
      } else {
        setFilteredResults(data?.data);
        setSize(data?.size);
        setSkip(0);
      }
    });
  };

  const loadMore = () => {
    let toSkip = skip + limit;
    // console.log(newFilters);
    getFilteredProducts(toSkip, limit, myFilters?.filters).then((data) => {
      if (data?.error) {
        setError(data?.error);
      } else {
        setFilteredResults([...filteredResults, ...data?.data]);
        setSize(data?.size);
        setSkip(toSkip);
      }
    });
  };

  const useStyles = makeStyles((theme) => ({
    btn: {
      background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
      borderRadius: 3,
      border: 0,
      color: "white",
      height: 48,
      padding: "0 20px",
      boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    },
  }));

  const classes = useStyles();

  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        // <button onClick={loadMore} className='btn btn-warning mb-5'>
        //   Load more
        // </button>
        <Button onClick={loadMore} variant="contained" className={classes.btn}>
          Load more
        </Button>
      )
    );
  };

  useEffect(() => {
    init();
    loadFilteredResults(skip, limit, myFilters.filters);
  }, []);

  const handleFilters = (filters, filterBy) => {
    // console.log("SHOP", filters, filterBy);
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;

    if (filterBy === "price") {
      let priceValues = handlePrice(filters);
      newFilters.filters[filterBy] = priceValues;
    }
    loadFilteredResults(myFilters?.filters);
    setMyFilters(newFilters);
  };

  const handlePrice = (value) => {
    const data = prices;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value)) {
        array = data[key].array;
      }
    }
    return array;
  };

  return (
    <>
     <div style={{ padding: 25 }}></div>
    <Menu/>
      
      
      
      
      <div className="container  py-3">
        <div className="row mt-3">
          <div className="col-md-12 h2-card">
            <h2
              className="mb-2"
              style={{
                color: "red !important",
              }}
            >
              New Arrivals
            </h2>
            <div className="row">
              {filteredResults.map((product, i) => (
                <div
                  key={i}
                  className="col-6 col-sm-6  col-md-6 col-lg-3 my-2 clor p-1"
                >
                   <Link href={`/product/${product._id}`} >
                  <Card product={product} />
                  </Link>
                </div>
              ))}
            </div>

            <h2 className="mb-2 mt-5">Best Sellers</h2>
            <div className="row">
              {filteredResults.map((product, i) => (
                <div
                  key={i}
                  className="col-6 col-sm-6  col-md-6 col-lg-3 my-2 clor p-1"
                >
                   <Link href={`/product/${product._id}`} >
                  <Card product={product} />
                  </Link>
                </div>
              ))}
            </div>

            <h2 className="mb-2 mt-5">Freqently Bought</h2>
            <div className="row">
              {filteredResults.map((product, i) => (
                <div
                  key={i}
                  className="col-6 col-sm-6  col-md-6 col-lg-3 my-2 clor p-1"
                >
                   <Link href={`/product/${product._id}`} >
                  <Card product={product} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div className=""></div>
        </div>
      </div>

      <Copyright />
      
    </>
  );
};

export default Shop;
