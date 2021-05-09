import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useEffect, useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { Wrap } from "./Style";
import Card from "../Card/Cards";
import { useParams } from "react-router-dom";
import { Pagination } from "react-laravel-paginex";
import { Badge } from "reactstrap";
export default function Shop() {
  const [products, setProducts] = useState([]);
  const [productUrl, setProductUrl] = useState(
    "http://localhost:8000/api/products/20?page=1"
  );
  const [productCategoryId, setProductCategoryId] = useState("");
  const [packageCategoryId, setPackageCategoryId] = useState("");

  const [packages, setPackages] = useState([]);
  const [productCat, setProductCat] = useState([]);
  const [packageUrl, setPackageUrl] = useState(
    "http://localhost:8000/api/packages/20?page=1"
  );
  const { id } = useParams();
  //http://localhost:8000/api/products/20?product_category_id=productCategoryId&page=1
  useEffect(() => {
    console.log();
    try {
      fetch(
        `http://localhost:8000/api/products/20?product_category_id=${productCategoryId}&page=1`,
        {
          method: "get",
          headers: {},
        }
      )
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
          // if (json.status == 200) {
          console.log(json.data);
          setProducts(json);
          // }
        });
    } catch (err) {
      console.log(err);
    }

    try {
      fetch(
        `http://localhost:8000/api/packages/20?package_id=${packageCategoryId}&page=1`,
        {
          method: "get",
          headers: {},
        }
      )
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
          // if (json.status == 200) {
          console.log(json);
          setPackages(json);
          // }
        });
    } catch (err) {
      console.log(err);
    }
  }, [productCategoryId, packageCategoryId]);

  const getData = (data) => {
    fetch(
      `http://localhost:8000/api/products/20?product_category_id=${productCategoryId}&page=${data.page}`,
      {
        method: "get",
        headers: {},
      }
    )
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        // if (json.status == 200) {
        console.log(json.data);
        setProductUrl(
          `http://localhost:8000/api/products/20?product_category_id=${productCategoryId}&page=${data.page}`
        );

        setProducts(json);
        window.scrollTo(0, 0);
      });
  };

  useEffect(() => {
    try {
      fetch(`http://localhost:8000/api/productCategories/1000`, {
        method: "get",
        headers: {},
      })
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
          // if (json.status == 200) {
          console.log(json.data);
          setProductCat(json.data);
          // }
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const getData2 = (data) => {
    fetch(`http://localhost:8000/api/packages/20?page=${data.page}`, {
      method: "get",
      headers: {},
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        // if (json.status == 200) {
        console.log(json.data);
        setPackageUrl(
          `http://localhost:8000/api/packages/20?page=${data.page}`
        );

        setPackages(json);
        window.scrollTo(0, 0);
      });
  };

  const ChangeTag = (CatId) => {
    console.log(CatId);
    setProductCategoryId(CatId);
    setProductUrl(
      `http://localhost:8000/api/products/20?product_category_id=${CatId}&page=1`
    );
  };

  const ChangeTag2 = (CatId) => {
    console.log(CatId);
    setPackageCategoryId(CatId);
    setPackageUrl(
      `http://localhost:8000/api/packages/20?package_id=${CatId}&page=1`
    );
  };

  return (
    <Tabs>
      <TabList style={{ display: "flex", justifyContent: "center" }}>
        {id == "product" ? (
          <Tab style={{ fontSize: "2rem" }}>Products</Tab>
        ) : (
          ""
        )}
        <Tab style={{ fontSize: "2rem" }}>Packages</Tab>
        {id == "package" ? (
          <Tab style={{ fontSize: "2rem" }}>Products</Tab>
        ) : (
          ""
        )}
      </TabList>

      <Wrap
        fluid="lg"
        style={{
          height: "100%",
          backgroundImage: "linear-gradient(to bottom right, #f5f5f5, #f5f5f5)",
          padding: "5%",
        }}
      >
        {/* {productCat} */}

        {id == "product" ? (
          <TabPanel id="prod">
            <Row>
              {" "}
              {productCat &&
                productCat[0] &&
                productCat.map((item, index) => (
                  <span style={{ marginLeft: "1%" }}>
                    {index % 2 == 0 ? (
                      <Badge
                        color="primary"
                        pill
                        onClick={() => ChangeTag(item.id)}
                        className="grabbing"
                      >
                        {item.name}
                      </Badge>
                    ) : (
                      ""
                    )}
                    {index % 2 != 0 ? (
                      <Badge
                        color="warning"
                        pill
                        onClick={() => ChangeTag(item.id)}
                        className="grabbing"
                      >
                        {item.name}
                      </Badge>
                    ) : (
                      ""
                    )}
                  </span>
                ))}
            </Row>
            <Row>
              {" "}
              <Card url={productUrl} item="product" key={productUrl} />
            </Row>
            <Pagination
              changePage={getData}
              data={products}
              containerClass={"pagination-container"}
            />
          </TabPanel>
        ) : (
          ""
        )}
        <TabPanel id="pack">
          <Row>
            {" "}
            {productCat &&
              productCat[0] &&
              productCat.map((item, index) => (
                <span style={{ marginLeft: "1%" }}>
                  {index % 2 == 0 ? (
                    <Badge
                      color="primary"
                      pill
                      onClick={() => ChangeTag2(item.id)}
                      className="grabbing"
                    >
                      {item.name}
                    </Badge>
                  ) : (
                    ""
                  )}
                  {index % 2 != 0 ? (
                    <Badge
                      color="warning"
                      pill
                      onClick={() => ChangeTag2(item.id)}
                      className="grabbing"
                    >
                      {item.name}
                    </Badge>
                  ) : (
                    ""
                  )}
                </span>
              ))}
          </Row>

          <Row>
            {" "}
            <Card url={packageUrl} item="package" key={packageUrl} />
          </Row>
          <Pagination
            changePage={getData2}
            data={packages}
            containerClass={"pagination-container"}
          />
        </TabPanel>
        {id == "package" ? (
          <TabPanel id="prod">
            <Row>
              {" "}
              {productCat &&
                productCat[0] &&
                productCat.map((item, index) => (
                  <span style={{ marginLeft: "1%" }}>
                    {index % 2 == 0 ? (
                      <Badge
                        color="primary"
                        pill
                        onClick={() => ChangeTag(item.id)}
                        className="grabbing"
                      >
                        {item.name}
                      </Badge>
                    ) : (
                      ""
                    )}
                    {index % 2 != 0 ? (
                      <Badge
                        color="warning"
                        pill
                        onClick={() => ChangeTag(item.id)}
                        className="grabbing"
                      >
                        {item.name}
                      </Badge>
                    ) : (
                      ""
                    )}
                  </span>
                ))}
            </Row>
            <Row>
              {" "}
              <Card url={productUrl} item="product" key={productUrl} />
            </Row>
            <Pagination
              changePage={getData}
              data={products}
              containerClass={"pagination-container"}
            />
          </TabPanel>
        ) : (
          ""
        )}
      </Wrap>
    </Tabs>
  );
}
