import React, { useState, useEffect } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";

const Orders = () => {
  // const [orders, setOrders] = useState([]);
  // const [loading, setLoading] = useState(true);

  const orders = useSelector((state) => state.order.orders);
  const loading = useSelector((state) => state.order.loading);

  const dispatch = useDispatch();
  const onFetchOrders = () => dispatch(actions.fetchOrders());
  useEffect(() => {
    onFetchOrders();
  }, []);

  let Orders = <Spinner />;
  if (!loading) {
    {
      Orders = orders.map((order) => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={order.price}
        />
      ));
    }
  }

  return <div>{Orders}</div>;
};

export default Orders;
